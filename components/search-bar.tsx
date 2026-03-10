import { SearchService } from "@/api/tmdb/search/searchService";
import { SearchMovieRequest } from "@/api/tmdb/search/searchTypes";
import { Movie } from "@/api/tmdb/types";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEvent,
} from "react-native";

export default function SearchBar({
  callbackFunction,
}: {
  callbackFunction: (searchResult: Movie[]) => void;
}) {
  const [search, setSearch] = useState("");

  const triggerCallback = async (e: TextInputSubmitEditingEvent) => {
    e.preventDefault();

    const params: SearchMovieRequest = {
      query: search,
      include_adult: false,
      page: 1,
      language: "en-US",
    };
    await SearchService.searchMovie(params).then((response) =>
      callbackFunction(response?.results),
    );
  };

  return (
    <TextInput
      style={styles.searchBar}
      placeholder="Search here..."
      value={search}
      onChangeText={setSearch}
      onSubmitEditing={(e) => triggerCallback(e)}
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
