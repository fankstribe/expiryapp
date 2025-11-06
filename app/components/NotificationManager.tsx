import {useEffect, useState} from "react";
import * as Notifications from 'expo-notifications';
import {Ionicons} from "@expo/vector-icons";
import {TouchableOpacity, View, Text, Modal} from "react-native";

interface NotificationManagerProps {
    permission: Notifications.PermissionStatus | null;
    requestPermission: () => void;
}

const NotificationManager = () => {
    const [permissionStatus, setPermissionStatus] = useState<Notifications.PermissionStatus | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Notifications.getPermissionsAsync();
            setPermissionStatus(status);
        })();
    }, []);

    const requestPermissions = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        setPermissionStatus(status);
    };

    const openHelpModal = () => setIsHelpModalOpen(true);
    const closeHelpModal = () => setIsHelpModalOpen(false);

    let iconName: keyof typeof Ionicons.glyphMap;
    let text: string;
    let action: (() => void) | undefined;
    let disabled = false;
    let iconColor: string;

    switch (permissionStatus) {
        case 'granted':
            iconName = "notifications-outline";
            text = 'Notifiche abilitate';
            iconColor = "#22c55e";
            disabled = true;
            break;
        case 'denied':
            iconName = "notifications-off-outline";
            text = 'Notifiche bloccate';
            iconColor = "#ef4444";
            action = openHelpModal;
            break;
        default:
            iconName = "notifications-outline";
            text = 'Abilita notifiche';
            iconColor = "#0ea5e9";
            action = requestPermissions;
            break;
    }

    return (
        <View className="flex items-center mt-4">
            <TouchableOpacity
                onPress={action}
                disabled={disabled}
                className="flex-row items-center bg-white/80 border border-slate-200 px-4 py-2 rounded-xl active:opacity-70"
            >
                <Ionicons name={iconName} size={28} color={iconColor} />
                <Text className="ml-2 text-slate-700 font-poppins-medium">{text}</Text>
            </TouchableOpacity>
            <Modal visible={isHelpModalOpen} transparent animationType="slide">
                <View className="flex-1 bg-black/50 justify-center items-center">
                    <View className="bg-white rounded-2xl p-6 w-80">
                        <Text className="text-lg font-poppins-bold mb-3 text-center text-sky-600">
                            Come riattivare le notifiche
                        </Text>
                        <Text className="text-slate-600 text-center mb-4">
                            Vai nelle impostazioni del tuo dispositivo e abilita le notifiche per questa app.
                        </Text>
                        <TouchableOpacity
                            onPress={closeHelpModal}
                            className="bg-sky-500 py-2 rounded-xl mt-2"
                        >
                            <Text className="text-white text-center font-poppins-medium">Ho capito</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default NotificationManager;
