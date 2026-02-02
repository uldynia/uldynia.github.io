import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { games } from "../config/games";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const [fontsLoaded] = useFonts({
    "GoogleSans-Regular": require("../assets/fonts/GoogleSans_17pt-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Collect all assets to preload
        const imageAssets: any[] = [];

        games.forEach(game => {
          // Preload icon
          if (game.icon) imageAssets.push(game.icon);

          // Preload carousel images
          if (game.carouselImages) {
            game.carouselImages.forEach(img => {
              if (typeof img === 'string') {
                imageAssets.push(img);
              } else if (img && typeof img === 'object' && 'source' in img) {
                imageAssets.push(img.source);
              } else {
                imageAssets.push(img);
              }
            });
          }
        });

        // Preload additional common assets if any
        imageAssets.push(require('../assets/images/skills.png'));

        const cacheImages = imageAssets.map(image => {
          if (typeof image === 'string') {
            return Image.prefetch(image);
          } else {
            return Asset.fromModule(image).downloadAsync();
          }
        });

        await Promise.all(cacheImages);
      } catch (e) {
        console.warn("Error preloading assets:", e);
      } finally {
        setAppReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (fontsLoaded && appReady) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, appReady]);

  if (!fontsLoaded || !appReady) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

