import {Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {Expiry, ExpiryStatus} from "@/src/types";
import {Ionicons} from "@expo/vector-icons";

interface ExpiryItemProps {
    expiry: Expiry;
    onDelete: (id: string) => void;
    onTogglePaid: (id: string) => void;
}

const statusStyles: Record<ExpiryStatus, string> = {
    [ExpiryStatus.Paid]: "bg-green-100 text-green-700 border-green-200",
    [ExpiryStatus.Overdue]: "bg-red-100 text-red-700 border-red-200",
    [ExpiryStatus.DueSoon]: "bg-yellow-100 text-yellow-700 border-yellow-200",
    [ExpiryStatus.Upcoming]: "bg-sky-100 text-sky-700 border-sky-200",
}

const StatusBadge: React.FC<{ status: ExpiryStatus }> = ({ status }) => {
    const textColor =
        status === ExpiryStatus.Paid
            ? 'text-green-700'
            : status === ExpiryStatus.Overdue
            ? 'text-red-700'
            : status === ExpiryStatus.DueSoon
            ? 'text-yellow-700'
            : 'text-sky-700';

    return (
        <View className={`px-3 py-1 rounded-full self-start ${statusStyles[status]}`}>
            <Text className={`text-[10px] font-poppins-semibold ${textColor}`}>{status}</Text>
        </View>
    );
}

const ExpiryItem: React.FC<ExpiryItemProps> = ({ expiry, onDelete, onTogglePaid }) => {
    const dateObj = new Date(expiry.dueDate);
    const formattedDate =
        !isNaN(dateObj.getTime())
            ? dateObj.toLocaleDateString("it-IT", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                })
            : 'Data non valida';

    const formattedAmount = new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR",
    }).format(Number(expiry.amount));

    const isPaid = expiry.status === ExpiryStatus.Paid;

    return (
        <View className="bg-slate-50 p-4 rounded-md flex-row items-center justify-between border border-slate-200 mb-3">
            <TouchableOpacity className="flex-1" onPress={() => onTogglePaid(expiry.id)}>
                <Text className={`font-poppins-semibold text-base ${isPaid ? "line-through text-slate-400" : "text-slate-800"}`}>
                    {expiry.name}
                </Text>
                <Text className="sans text-xs text-slate-600">{formattedDate}</Text>
                <View className="mt-2">
                    <StatusBadge status={expiry.status} />
                </View>
            </TouchableOpacity>
            <View className="flex-row items-center gap-3 ml-3">
                <Text className={`font-poppins-bold text-lg ${isPaid ? "text-slate-400" : "text-slate-900"}`}>
                    {formattedAmount}
                </Text>
                <TouchableOpacity onPress={() => onDelete(expiry.id)} className="p-2">
                    <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ExpiryItem
