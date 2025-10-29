import {Animated, View} from "react-native";
import "./global.css"
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "@/app/components/Header";
import ExpiryForm from "@/app/components/ExpiryForm";
import ExpiryList from "@/app/components/ExpiryList";
import { useExpiries } from "@/src/hooks/useExpiries";
import ScrollView = Animated.ScrollView;
import ExpiryChart from "@/app/components/ExpiryChart";

export default function MainScreen() {
    const { expiries, addExpiry, deleteExpiry, togglePaidStatus } = useExpiries()

    return (
        <SafeAreaView className="flex-1 bg-slate-100 text-slate-800">
            <Header />
            <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
                <View className="flex flex-col gap-6">
                    <ExpiryForm onAdd={addExpiry} />
                    <ExpiryChart expiries={expiries} />
                    <ExpiryList
                        expiries={expiries}
                        onDelete={deleteExpiry}
                        onTogglePaid={togglePaidStatus}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
  );
}
