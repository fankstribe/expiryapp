import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
    Poppins_700Bold,
    Poppins_500Medium,
    Poppins_400Regular,
    useFonts,
    Poppins_600SemiBold
} from "@expo-google-fonts/poppins";
import {useCallback} from "react";
import {View} from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [fontsLoaded, fontError] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);
    if (!fontsLoaded && !fontError) {
        return null;
    }

  return(
      <View className="flex-1" onLayout={onLayoutRootView}>
          <Stack screenOptions={{ headerShown: false }} />;
      </View>
    )
}
