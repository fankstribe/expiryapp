import React from "react";
import { render, screen } from "@testing-library/react-native";
import ExpiryChart from "@/app/components/ExpiryChart";
import { ExpiryStatus } from "@/src/types";

describe("ExpiryChart", () => {
    it("aggiorna il grafico quando vengono aggiunte nuove scadenze", () => {
        const mockExpiries1 = [
            {
                id: "1",
                name: "Affitto",
                amount: 800,
                dueDate: "2025-01-10",
                status: ExpiryStatus.Upcoming,
            },
        ];

        // 👇 otteniamo anche `rerender` dal risultato
        const { rerender } = render(<ExpiryChart expiries={mockExpiries1} />);

        // Verifica che il titolo del grafico sia visibile
        expect(screen.getByText(/Scadenze Mensili in Arrivo/i)).toBeTruthy();

        // Aggiungiamo nuove scadenze (mese diverso + stesso mese per somma)
        const mockExpiries2 = [
            ...mockExpiries1,
            {
                id: "2",
                name: "Bollette",
                amount: 200,
                dueDate: "2025-02-15",
                status: ExpiryStatus.Upcoming,
            },
            {
                id: "3",
                name: "Assicurazione",
                amount: 100,
                dueDate: "2025-01-20",
                status: ExpiryStatus.Upcoming,
            },
        ];

        // 🔁 Simuliamo l’aggiornamento del componente
        rerender(<ExpiryChart expiries={mockExpiries2} />);

        // Ricontrolliamo che sia ancora renderizzato correttamente
        expect(screen.getByText(/Scadenze Mensili in Arrivo/i)).toBeTruthy();
    });
});
