import {Expiry, ExpiryStatus} from "@/src/types";
import {useCallback, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getStatus = (dueDate: string, isPaid: boolean): ExpiryStatus => {
    if (isPaid) {
        return ExpiryStatus.Paid;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return ExpiryStatus.Overdue;
    if (diffDays <= 7) return ExpiryStatus.DueSoon;
    return ExpiryStatus.Upcoming;
};

export const useExpiries = () => {
    const [expiries, setExpiries] = useState<Expiry[]>([]);

    const updateStatus = useCallback((items: Expiry[]): Expiry[] => {
        return items
            .map((item) => ({
                ...item,
                status: getStatus(item.dueDate, item.status === ExpiryStatus.Paid),
            }))
            .sort(
                (a, b) =>
                    new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
            );
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem("expiries");
                if (stored) {
                    const parsed: Expiry[] = JSON.parse(stored);
                    setExpiries(updateStatus(parsed));
                }
            } catch (error) {
                console.error("Failed to load expiries", error);
            }
        })();
    }, [updateStatus]);

    useEffect(() => {
        (async () => {
            try {
                await AsyncStorage.setItem("expiries", JSON.stringify(expiries));
            } catch (error) {
                console.error("Failed to save expiries", error);
            }
        })();
    }, [expiries]);

    const addExpiry = (newExpiry: Omit<Expiry, "id" | "status">) => {
        const expiryWithId: Expiry = {
            ...newExpiry,
            id: Math.random().toString(36).substring(2, 9),
            status: ExpiryStatus.Upcoming,
        };
        setExpiries((prev) => updateStatus([...prev, expiryWithId]));
    };

    const deleteExpiry = (id: string) => {
        setExpiries((prev) => prev.filter((e) => e.id !== id));
    }

    const togglePaidStatus = (id: string) => {
        setExpiries((prev) => {
            const newExpiries = prev.map((e) => {
                if (e.id === id) {
                    const isNowPad = e.status !== ExpiryStatus.Paid;
                    return {
                        ...e,
                        status: isNowPad
                            ? ExpiryStatus.Paid
                            : getStatus(e.dueDate, false)
                    };
                }
                return e;
            });
            return updateStatus(newExpiries);
        });
    }

    return { expiries, addExpiry, deleteExpiry, togglePaidStatus };
}
