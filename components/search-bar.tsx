import React, { useState } from "react";
import { Alert, StyleSheet, TextInput } from "react-native";

export default function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSubmit = () => {
    // Action à effectuer lors de la soumission (ex: recherche, validation, etc.)
    // Handle TMDB API search
    Alert.alert("Texte soumis :", search);
  };

  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search here..."
      value={search}
      onChangeText={setSearch}
      onSubmitEditing={handleSubmit}
    />
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#ECEDEE",
    color: "#11181C",
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
