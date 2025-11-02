import {renderHook, act} from "expo-router/testing-library";
import {useExpiries} from "@/src/hooks/useExpiries";
import {ExpiryStatus} from "@/src/types";

describe('useExpiries', () => {
    it('aggiunge una nuova scadenza', () => {
        const { result } = renderHook(() => useExpiries());

        act(() => {
            result.current.addExpiry({
                name: 'Bollette',
                amount: 50,
                dueDate: '2025-11-10',
            })
        })
        expect(result.current.expiries).toHaveLength(1);
        expect(result.current.expiries[0]).toMatchObject({
            name: 'Bollette',
            status: ExpiryStatus.Upcoming
        });
    })
})
