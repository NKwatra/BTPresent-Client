import React, {useState} from 'react';
import {
  FlatList,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

const UniversityItem = ({
  name,
  id,
  updateSelectedItem,
  setDropdownOpen,
  setText,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        updateSelectedItem(id);
        setDropdownOpen(false);
        setText(name);
      }}>
      <Text style={styles.listItem}>{name}</Text>
    </TouchableOpacity>
  );
};

const LineSeperator = () => {
  return <View style={styles.seperator} />;
};

const SearchableDropdown = ({items, updateSelectedItem}) => {
  const [searchText, updateSearchText] = useState('');

  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (searchText !== '') {
    items = items.filter((item) =>
      item.name.toLowerCase().startsWith(searchText.toLowerCase()),
    );
  }

  return (
    <View>
      <TextInput
        onFocus={() => setDropdownOpen(true)}
        value={searchText}
        onChangeText={(newText) => updateSearchText(newText)}
        style={styles.input}
      />
      {dropdownOpen ? (
        <FlatList
          style={styles.list}
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <UniversityItem
              {...item}
              setDropdownOpen={setDropdownOpen}
              updateSelectedItem={updateSelectedItem}
              setText={updateSearchText}
            />
          )}
          ItemSeparatorComponent={() => <LineSeperator />}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 16,
    color: '#A2BFBD',
    fontSize: 11,
    fontFamily: 'Montserrat-Medium',
  },
  seperator: {
    height: 2,
    backgroundColor: '#A2BFBD',
    width: Dimensions.get('window').width - 80,
    marginHorizontal: 16,
  },
  input: {
    borderColor: '#A2BFBD',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: '#A2BFBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  list: {
    backgroundColor: '#56706D',
    elevation: 10,
    borderRadius: 15,
    maxHeight: 200,
  },
});

export default SearchableDropdown;
