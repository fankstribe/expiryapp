export default {
    setItem: jest.fn(() => {
        return new Promise((resolve) => {
            resolve(null);
        });
    }),
    getItem: jest.fn(() => {
        return new Promise((resolve) => {
            resolve(null);
        });
    }),
    removeItem: jest.fn(() => {
        return new Promise((resolve) => {
            resolve(null);
        });
    }),
    clear: jest.fn(() => {
        return new Promise((resolve) => {
            resolve(null);
        });
    }),
    getAllKeys: jest.fn(() => {
        return new Promise((resolve) => {
            resolve([]);
        });
    }),
    // Aggiungi altre funzioni che il tuo codice potrebbe chiamare, se necessario
};
