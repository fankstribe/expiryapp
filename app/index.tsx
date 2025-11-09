import { Animated, Button, View, Platform } from "react-native";
import "./global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "./components/Header";
import ExpiryForm from "./components/ExpiryForm";
import ExpiryList from "./components/ExpiryList";
import { useExpiries } from "@/hooks/useExpiries";
import ExpiryChart from "./components/ExpiryChart";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

const ScrollView = Animated.ScrollView;

export default function MainScreen() {
    const { expiries, addExpiry, deleteExpiry, togglePaidStatus } = useExpiries();

    useEffect(() => {
        const setupNotifications = async () => {
            // ✅ Richiedi i permessi
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                console.warn("Permessi per le notifiche non concessi");
                return;
            }

            // ✅ Imposta il canale su Android
            if (Platform.OS === "android") {
                await Notifications.setNotificationChannelAsync("default", {
                    name: "Default Channel",
                    importance: Notifications.AndroidImportance.HIGH,
                    sound: "default",
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: "#0ea5e9",
                });
            }

            // ✅ Gestione del comportamento delle notifiche
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                    shouldShowAlert: true,
                    shouldShowBanner: true, // richiesto da Expo 51+
                    shouldShowList: true,   // richiesto da Expo 51+
                }),
            });
        };

        setupNotifications();
    }, []);

    // 🔔 TEST 1 — Notifica dopo 5 secondi
    const scheduleTestNotificationInterval = async () => {
        console.log("✅ Programmo notifica fra 5 secondi...");
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "⏰ Test Notifica (5s)",
                body: "Questa è una notifica di test dopo 5 secondi.",
                sound: "default",
            },
            trigger: {
                seconds: 5,
                channelId: "default",
            },
        });
    };

    // 📅 TEST 2 — Notifica dopo 30 secondi
    const scheduleTestNotificationDate = async () => {
        console.log("✅ Programmo notifica fra 30 secondi...");
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "📅 Test Notifica Programmata",
                body: "Questa è una notifica programmata per tra 30 secondi!",
                sound: "default",
            },
            trigger: {
                seconds: 30,
                channelId: "default",
            },
        });
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-100 text-slate-800">
            <Header />
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex flex-col gap-6">
                    <ExpiryForm onAdd={addExpiry} />
                    <ExpiryChart expiries={expiries} />
                    <ExpiryList
                        expiries={expiries}
                        onDelete={deleteExpiry}
                        onTogglePaid={togglePaidStatus}
                    />

                    {/* 🔔 Sezione test notifiche */}
                    <View className="mt-8 gap-4">
                        <Button
                            title="🔔 Test Notifica (5s)"
                            onPress={scheduleTestNotificationInterval}
                        />
                        <Button
                            title="📅 Test Notifica (fra 30s)"
                            onPress={scheduleTestNotificationDate}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
