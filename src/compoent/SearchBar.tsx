import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import imageIndex from "../assets/imageIndex";

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (text: string) => void;
  value?:string
 }

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search", onSearchChange ,value}) => {
  return (
    <View style={styles.searchBar}>
      <Image source={imageIndex.search} style={styles.icon} resizeMode="cover" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="rgba(48, 45, 45, 1)"
        onChangeText={onSearchChange}
        value={value}
      />
      <Image source={imageIndex.filter} style={styles.icon} resizeMode="cover"  />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
    marginBottom: 20,
    marginTop: 30,
    paddingVertical: 5,
    borderWidth: 0.2,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "black",
    marginLeft: 15,
  },
});

export default SearchBar;
