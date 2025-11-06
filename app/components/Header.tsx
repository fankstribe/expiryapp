import {Image, Text, View} from 'react-native'
import React from 'react'
import {NotificationManager} from "./NotificationManager";
import * as Notifications from "expo-notifications"

const Header = () => {
    return (
        <View className="bg-white/80 border-b border-slate-200">
            <View className="flex-row items-center justify-between px-4 py-4">
                <View className="flex-row items-center">
                    <Image
                        source={require('../../assets/images/icon.png')}
                        style={{ width: 32, height: 32 }}
                        resizeMode="contain"
                    />
                    <Text className="font-poppins-bold text-2xl ml-3 text-sky-500">EXPIRY</Text>
                </View>
                <NotificationManager />
            </View>
        </View>
    )
}
export default Header

