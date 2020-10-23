package com.btpresent;

import com.facebook.react.ReactPackage;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.NativeModule;

import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

class BluetoothPackage implements ReactPackage{


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext context)
    {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext context)
    {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new BluetoothModule(context));

        return modules;
    }
}