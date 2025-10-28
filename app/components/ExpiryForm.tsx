import {View, Text, TextInput, TouchableOpacity} from 'react-native'
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {_formatDate} from "@/src/utils/_format-date";

interface ExpiryFormProps {
    onAdd: (data: { name: string; amount: string, dueDate: string }) => void;
}

// @ts-ignore
const InputField = ({ label, value, onChangeText, placeholder, keyboardType, maxLength } : any) => {
    const [focused, setFocused] = useState(false)
    return(
        <View>
            <Text className="text-sm font-poppins-medium text-slate-600 mb-1">{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#94a3b8"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                keyboardType={keyboardType}
                maxLength={maxLength}
                className={`font-sans bg-slate-50 rounded-md text-slate-800 border px-3 py-2
                    ${focused ? "border-2 border-sky-500" : "border-slate-300"}
                `}
            />
        </View>
    )
}


// @ts-ignore
const ExpiryForm = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [errors, setErrors] = useState<string>("");

    const handleSubmit = () => {
        if (!name || !amount || !dueDate) {
            setErrors("Tutti i campi sono obbligatori.");
            return;
        }

        const [day, month, year] = dueDate.split("/");
        const isoDate = `${year}-${month}-${day}`;

        if (isNaN(new Date(isoDate).getTime())) {
            setErrors("Data non valida. Usa il formato GG/MM/AAAA");
            return;
        }

        onAdd({ name, amount, dueDate: isoDate });

        setName("");
        setAmount("");
        setDueDate("");
        setErrors("");
    }

    return (
        <View className="bg-white p-6 rounded-lg border border-slate-200">
            <Text className="text-xl font-poppins-semibold mb-4 text-sky-600">Aggiungi Scadenza</Text>
            <InputField
                label="Nome Rata"
                value={name}
                onChangeText={(text: string) => {
                    setName(text);
                    setErrors("");
                }}
                placeholder="Es. Mutuo Casa"
            />
            <View className="mt-4">
                <InputField
                    label="Importo (€)"
                    value={amount}
                    onChangeText={(text: string) => {
                        setAmount(text);
                        setErrors("");
                    }}
                    keyboardType="numeric"
                    placeholder="Es. 500.00"
                />
            </View>
            <View className="mt-4">
                <InputField
                    label="Data di Scadenza"
                    value={dueDate}
                    onChangeText={(text: string) => {
                        setDueDate(_formatDate(text))
                        setErrors("");
                    }}
                    placeholder="DD/MM/YYYY"
                    keyboardType="numeric"
                    maxLength={10}
                />
            </View>
            {errors ? (
                <Text className="text-red-500 text-sm mt-4">{errors}</Text>
            ) : null}

            <TouchableOpacity
                onPress={handleSubmit}
                className="flex flex-row items-center justify-center bg-sky-500 py-3 px-4 mt-6 mb-4 rounded-md shadow-md"
            >
                <Ionicons name="add-outline" size={20} style={{color: "white", marginRight: 8, marginBottom: 3}} />
                <Text className="text-white font-poppins-bold">Aggiungi Scadenza</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ExpiryForm
