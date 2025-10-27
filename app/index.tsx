import { Text, View } from "react-native";
import "./global.css"
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import ExpiryForm from "@/app/components/ExpiryForm";

export default function MainScreen() {

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-slate-100 text-slate-800">
        <Header />
        <View className="flex-1 p-4">
            <View className="flex flex-col gap-8">
                <ExpiryForm />
            </View>
        </View>
    </SafeAreaView>
  );
}
