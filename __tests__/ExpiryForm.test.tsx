import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import ExpiryForm from '../app/components/ExpiryForm';
import { ExpiryStatus } from '@/src/types';

describe('ExpiryForm', () => {
    it('renders all input fields and button', () => {
        const mockOnAdd = jest.fn();
        render(<ExpiryForm onAdd={mockOnAdd} />);

        expect(screen.getByPlaceholderText('Es. Mutuo Casa')).toBeTruthy();
        expect(screen.getByPlaceholderText('Es. 500.00')).toBeTruthy();
        expect(screen.getByPlaceholderText('DD/MM/YYYY')).toBeTruthy();
        expect(screen.getByTestId('submit-button')).toBeTruthy();
        fireEvent.press(screen.getByTestId('submit-button'));
    });

    it('shows error when submitting empty fields', () => {
        const mockOnAdd = jest.fn();
        render(<ExpiryForm onAdd={mockOnAdd} />);
        expect(screen.getByTestId('submit-button')).toBeTruthy();
        fireEvent.press(screen.getByTestId('submit-button'));

        expect(screen.getByText('Tutti i campi sono obbligatori.')).toBeTruthy();
        expect(mockOnAdd).not.toHaveBeenCalled();
    });

    it('calls onAdd with correct data', () => {
        const mockOnAdd = jest.fn();
        render(<ExpiryForm onAdd={mockOnAdd} />);

        fireEvent.changeText(screen.getByPlaceholderText('Es. Mutuo Casa'), 'Affitto');
        fireEvent.changeText(screen.getByPlaceholderText('Es. 500.00'), '600');
        fireEvent.changeText(screen.getByPlaceholderText('DD/MM/YYYY'), '31/10/2025');

        expect(screen.getByTestId('submit-button')).toBeTruthy();
        fireEvent.press(screen.getByTestId('submit-button'));

        expect(mockOnAdd).toHaveBeenCalledWith({
            name: 'Affitto',
            amount: '600',
            dueDate: '2025-10-31',
        });
    });
});
