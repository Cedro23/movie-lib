import { Movie } from "@/api/tmdb/types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function SearchResultList({
  resultList,
}: {
  resultList: Movie[];
}) {
  return (
    <>
      {resultList.map((movie: Movie) => (
        <View style={styles.item} key={movie.id.toString()}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.poster}
          />
          <View style={styles.info}>
            <Text style={styles.title}>{movie.original_title}</Text>
            <Text style={styles.overview}>
              {movie.overview.substring(0, 100)}...
            </Text>
            <View style={styles.year_info}>
              <Text style={styles.year}>
                Year: {movie.release_date.substring(0, 4)}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 5,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  overview: {
    fontSize: 14,
    color: "#b9b9b9",
  },
  year_info: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  year: {
    color: "#eaeaea",
    fontWeight: "bold",
  },
});
