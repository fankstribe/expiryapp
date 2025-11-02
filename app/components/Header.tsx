import {Text, View} from 'react-native'
import React from 'react'
import {Ionicons} from "@expo/vector-icons";

const Header = () => {
    return (
        <View className="bg-white/80 border-b border-slate-200">
            <View className="flex-row items-center px-4 py-4">
                <Ionicons name="calendar-outline" size={32} style={{color: "#0ea5e9"}}/>
                <Text className="font-poppins-bold text-2xl ml-3 text-sky-500">Expiry</Text>
            </View>
        </View>
    )
}
export default Header

