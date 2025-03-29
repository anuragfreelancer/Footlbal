import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
 
import { color } from '../constant';

// Define dropdown item type
interface DropdownItem {
  label: string;
  value: string;
}

// Define props for the component
interface CustomDropdownProps {
  data: DropdownItem[];
  placeholder?: string;
  onSelect: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ data, placeholder = 'Select', onSelect }) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
   return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && styles.focusedDropdown]}
        data={data}
        labelField="label"
        valueField="value"
        placeholderStyle={{color:color.grey}}
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item);
          onSelect(item);
        }}
        // renderRightIcon={() => (
        //   <Icon  size={20} source={icon.downwhite}/>
        // )}
        itemTextStyle={styles.itemText}
        selectedTextStyle={styles.selectedText}
        containerStyle={styles.dropdownContainer}
    
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: '#F7F8F8', // Dark background
    borderRadius: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#F7F8F8', // Light gray border
    elevation: 0, // Remove shadow for Android
    shadowOpacity: 0, // Remove shadow for iOS
  },
  focusedDropdown: {},
  dropdownContainer: {
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 15,
    paddingVertical: 11,
    elevation: 0, // Remove shadow for Android
    shadowOpacity: 0, // Remove shadow for iOS
  },
  itemText: {
    fontSize: 15,
    color: 'black', // Selected text color
    lineHeight: 18,
  },
  selectedText: {
    fontSize: 15,
    color: 'rgba(173, 164, 165, 1)', // Selected text color
    lineHeight: 18,
  },
});

export default CustomDropdown;
