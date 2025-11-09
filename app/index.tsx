import { Animated, View } from "react-native";
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
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.HIGH,
                sound: "default",
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#0ea5e9",
            });

            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldPlaySound: true,
                    shouldSetBadge: false,
                    shouldShowBanner: true,
                    shouldShowList: true,
                }),
            });
        };

        setupNotifications();
    }, []);

    const scheduleExpiryNotification = async (expiry: { title: string; date: string }) => {
        const dueDate = new Date(expiry.date);
        dueDate.setHours(9, 0, 0, 0);

        if (dueDate.getTime() <= Date.now()) return;

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "📅 Scadenza oggi!",
                body: `Il pagamento "${expiry.title}" scade oggi (${dueDate.toLocaleDateString()})`,
                sound: true,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date: dueDate
            }
        });
    }

    const handleAddExpiry = (expiry: any) => {
        addExpiry(expiry);
        scheduleExpiryNotification(expiry);
    }

    return (
        <SafeAreaView className="flex-1 bg-slate-100 text-slate-800">
            <Header />
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="flex flex-col gap-6">
                    <ExpiryForm onAdd={handleAddExpiry} />
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

