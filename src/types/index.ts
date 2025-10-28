type InputFieldProps = {
    label: string;
    value: string;
    oncChangeText: (text: string) => void;
    placeholder: string;
}

export enum ExpiryStatus {
    Upcoming = 'In Arrivo',
    DueSoon = 'In Scadenza',
    Overdue = 'Scaduta',
    Paid = 'Pagata',
}

export interface Expiry {
    id: string;
    name: string;
    amount: number;
    dueDate: string;
    status: ExpiryStatus;
}
