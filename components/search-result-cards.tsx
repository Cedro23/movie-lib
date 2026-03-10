import { Movie } from "@/api/tmdb/types";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20; // 2 cards par ligne avec une marge

export default function SearchResultCards({
  resultList,
}: {
  resultList: Movie[];
}) {
  return (
    <>
      {resultList.map((item: Movie) => (
        <View style={styles.card} key={item.id.toString()}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.poster}
          />
          <Text style={styles.title}>{item.original_title}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 10,
  },
  card: {
    width: CARD_WIDTH,
    margin: 5,
  },
  poster: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  title: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
