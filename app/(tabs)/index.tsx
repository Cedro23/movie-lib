import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";

import { AuthService } from "@/api/tmdb/auth/authService";
import MainScrollView from "@/components/main-scroll-view";
import { useEffect } from "react";

export default function SearchScreen() {
  async function validateKey() {
    await AuthService.validateApiKey().then((res) => {
      if (!res.success) {
        console.error("Couldn't validate API key.");
      }
    });
  }

  useEffect(() => {
    validateKey();
  }, []);

  return (
    <>
      <ThemedView
        style={styles.titleContainer}
        lightColor="#7baa16"
        darkColor="#165baa"
      >
        <ThemedText type="title">Lists</ThemedText>
      </ThemedView>
      <MainScrollView></MainScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
