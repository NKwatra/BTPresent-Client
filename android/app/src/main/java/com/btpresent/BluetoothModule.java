package com.btpresent;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.modules.core.PermissionListener;
import com.facebook.react.modules.core.PermissionAwareActivity;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableNativeArray;

import android.widget.Toast;
import java.util.HashSet;
import java.net.NetworkInterface;
import java.util.Collections;
import java.util.List;
import android.os.Build;
import android.content.BroadcastReceiver;
import androidx.core.content.ContextCompat;
import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import androidx.annotation.NonNull;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.content.Context;
import android.bluetooth.BluetoothDevice;
import android.content.IntentFilter;

/* 
    Module to perform bluetooth operations using native android APIs.
*/

public class BluetoothModule extends ReactContextBaseJavaModule implements PermissionListener, LifecycleEventListener{
    private static ReactApplicationContext reactContext;
    private BluetoothAdapter bluetoothAdapter;
    private Promise mPromise;
    private HashSet<String> mAvailableAddress;
    public static final int LOCATION_REQUEST_CODE = 100;
    public static final int BLUETOOTH_REQUEST_CODE_TEACHER = 101;
    public static final int BLUETOOTH_REQUEST_CODE_STUDENT = 102;


    /*
        Method to fetch device MAC address
    */
    @ReactMethod
    public void getMacAddress(Promise promise)
    {
        try 
        {
            List <NetworkInterface> all = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface nif: all) {
                if (!nif.getName().equalsIgnoreCase("wlan0")) continue;
    
                byte[] macBytes = nif.getHardwareAddress();
                if (macBytes == null) {
                    promise.resolve("");
                }
    
                StringBuilder res1 = new StringBuilder();
                for (byte b: macBytes) {
                    res1.append(String.format("%02X:", b));
                }
    
                if (res1.length() > 0) {
                    res1.deleteCharAt(res1.length() - 1);
                }
                promise.resolve(res1.toString());
            }
        } catch (Exception ex) {}
        promise.resolve("02:00:00:00:00:00");
    }

    /* 
        Create a listener for listening to activity results
    */
    ActivityEventListener activityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent)
        {
            if(requestCode == BLUETOOTH_REQUEST_CODE_TEACHER)
            {
                if(resultCode == Activity.RESULT_OK)
                {
                    Toast.makeText(getReactApplicationContext(), "Bluetooth turned on", Toast.LENGTH_LONG).show();
                    startScan();
                }else
                {
                    Toast.makeText(getReactApplicationContext(), "Failed to start bluetooth, please try again", Toast.LENGTH_LONG).show();
                    mPromise.reject("Bluetooth not started");
                }
            }else if(requestCode == BLUETOOTH_REQUEST_CODE_STUDENT)
            {
                if(resultCode == Activity.RESULT_OK)
                {
                    Toast.makeText(getReactApplicationContext(), "Bluetooth turned on", Toast.LENGTH_LONG).show();
                }else
                {
                    Toast.makeText(getReactApplicationContext(), "Failed to start bluetooth, please try again", Toast.LENGTH_LONG).show();
                    mPromise.reject("Bluetooth not started");
                }  
            }
        }
    };

    /* 
        Broadcast receiver to capture discoverable bluetooth devices
    */

    private final BroadcastReceiver receiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if(BluetoothDevice.ACTION_FOUND.equals(action))
            {
                // store newly discoverd device address
                BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
                String address = device.getAddress();
                mAvailableAddress.add(address);
            }else if(BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action))
            { 
                // pass discovered address to javascript 
                WritableNativeArray array = new WritableNativeArray();
                for(String entry : mAvailableAddress)
                    array.pushString(entry);
                Toast.makeText(getReactApplicationContext(), "Extracting student names...", Toast.LENGTH_LONG).show();    
                mPromise.resolve(array);
            }
        }
    };

    BluetoothModule(ReactApplicationContext context)
    {
        super(context);
        reactContext = context;
        reactContext.addActivityEventListener(activityEventListener);
        reactContext.addLifecycleEventListener(this);
        IntentFilter filter = new IntentFilter();
        mAvailableAddress = new HashSet<>();
        filter.addAction(BluetoothDevice.ACTION_FOUND);
        filter.addAction(BluetoothAdapter.ACTION_DISCOVERY_FINISHED);
        reactContext.registerReceiver(receiver, filter);
    }

    @Override
    public String getName()
    {
        return "BluetoothModule";
    }

    /* 
        Function to start scanning for discoverable bluetooth devices
    */
    @ReactMethod
    public void startDeviceScan(Promise promise)
    {
        mPromise = promise;
        if(Build.VERSION.SDK_INT >= 23){
            if(!(ContextCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED))
            {
                PermissionAwareActivity activity  = (PermissionAwareActivity)getCurrentActivity();
                activity.requestPermissions(new String[] {Manifest.permission.ACCESS_FINE_LOCATION}, LOCATION_REQUEST_CODE, this);
            }else
                turnOnBluetooth();
        }else
            turnOnBluetooth();
    }


    public void startScan()
    {
        boolean started = bluetoothAdapter.startDiscovery();
        Toast.makeText(getReactApplicationContext(), "Scanning nearby devices... ", Toast.LENGTH_LONG).show();
    }

    @Override
    public boolean onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        switch (requestCode)
        {
            case LOCATION_REQUEST_CODE :
                if(grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED)
                    turnOnBluetooth();
                else
                    {
                        Toast.makeText(getReactApplicationContext(), "Need access to location to run app", Toast.LENGTH_LONG).show();
                        mPromise.reject("Location not provided");
                    }
        }

        return true;
    }

    @Override
    public void onHostDestroy()
    {
        reactContext.unregisterReceiver(receiver);
    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostResume(){

    }

    private void turnOnBluetooth()
    {
        Activity currentActivity = getCurrentActivity();
        final BluetoothManager bluetoothManager = (BluetoothManager)currentActivity.getSystemService(Context.BLUETOOTH_SERVICE);
        bluetoothAdapter = bluetoothManager.getAdapter();

        if(bluetoothAdapter == null)
        {
            Toast.makeText(getReactApplicationContext(), "Bluetooth is not supported on device", Toast.LENGTH_LONG).show();
            mPromise.reject("Bluetooth not supported exception");
        }
        else if(!bluetoothAdapter.isEnabled())
        {
            Intent intent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            currentActivity.startActivityForResult(intent, BLUETOOTH_REQUEST_CODE_TEACHER);
        }else{
            startScan();
        }
    }


    /*
        Method to ask permission to turn on bluetooth
    */
    @ReactMethod
    public void askBluetoothPermission()
    {
        Activity currentActivity = getCurrentActivity();
        final BluetoothManager bluetoothManager = (BluetoothManager)currentActivity.getSystemService(Context.BLUETOOTH_SERVICE);
        bluetoothAdapter = bluetoothManager.getAdapter();

        if(bluetoothAdapter == null)
        {
            Toast.makeText(getReactApplicationContext(), "Bluetooth is not supported on device", Toast.LENGTH_LONG).show();
        }
        else if(!bluetoothAdapter.isEnabled())
        {
            Intent intent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            currentActivity.startActivityForResult(intent, BLUETOOTH_REQUEST_CODE_STUDENT);
        }else
        {
            Toast.makeText(getReactApplicationContext(), "Bluetooth is already on", Toast.LENGTH_LONG).show();
        }
    }
}