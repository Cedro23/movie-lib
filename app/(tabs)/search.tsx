import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

import { Movie } from "@/api/tmdb/types";
import MainScrollView from "@/components/main-scroll-view";
import SearchBar from "@/components/search-bar";
import SearchResultList from "@/components/search-result-list";
import { useState } from "react";

export default function SearchScreen() {
  const [result, setResult] = useState<Movie[]>([]);
  const callbackFunction = (searchResult: Movie[]) => {
    setResult(searchResult.sort((a, b) => b.popularity - a.popularity));
  };

  return (
    <>
      <ThemedView
        style={styles.titleContainer}
        lightColor="#7baa16"
        darkColor="#165baa"
      >
        <ThemedText type="title">Search a movie!</ThemedText>
        <SearchBar callbackFunction={callbackFunction}></SearchBar>
      </ThemedView>
      <MainScrollView>
        <SearchResultList resultList={result}></SearchResultList>
      </MainScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    // backgroundColor: "#165baa",
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});
