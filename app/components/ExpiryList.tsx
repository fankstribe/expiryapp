import {View, Text, FlatList} from 'react-native'
import React from 'react'
import {Expiry} from "@/src/types";
import ExpiryItem from "@/app/components/ExpiryItem";

interface ExpiryListProps {
    expiries: Expiry[];
    onDelete: (id: string) => void;
    onTogglePaid: (id: string) => void;
}

const ExpiryList: React.FC<ExpiryListProps> = ({
    expiries,
    onDelete,
    onTogglePaid,
    }) => {
    return (
        <View className="bg-white p-6 rounded-lg border border-slate-200">
            <Text className="text-xl font-poppins-semibold mb-4 text-sky-600">Le Tue Scadenze</Text>
            {expiries.length > 0 ? (
                <FlatList
                    data={expiries}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ExpiryItem
                            expiry={item}
                            onDelete={onDelete}
                            onTogglePaid={onTogglePaid}
                        />
                    )}
                    ItemSeparatorComponent={() => <View className="h-2" />}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
            ) : (
                <View className="py-8 items-center">
                    <Text className="sans text-slate-500">Nessuna scadenza ancora aggiunta.</Text>
                    <Text className="sans text-sm text-slate-400">
                        Usa il modulo per iniziare.
                    </Text>
                </View>
            )}
        </View>
    )
}
export default ExpiryList
