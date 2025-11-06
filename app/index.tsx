import {Animated, View} from "react-native";
import "./global.css"
import {SafeAreaView} from "react-native-safe-area-context";
import Header from "./components/Header";
import ExpiryForm from "./components/ExpiryForm";
import ExpiryList from "./components/ExpiryList";
import { useExpiries } from "@/hooks/useExpiries";
import ExpiryChart from "./components/ExpiryChart";
import {useEffect} from "react";
import * as Notifications from 'expo-notifications';

const ScrollView = Animated.ScrollView;

export default function MainScreen() {
    const { expiries, addExpiry, deleteExpiry, togglePaidStatus } = useExpiries()

    useEffect(() => {
       Notifications.setNotificationHandler({
           handleNotification: async () => ({
               shouldShowAlert: true,
               shouldPlaySound: true,
               shouldSetBadge: false,
               shouldShowBanner: true,
               shouldShowList: true
           })
       })
    }, []);

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
