if (typeof structuredClone === 'undefined') {
    global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

if (typeof TextDecoderStream === 'undefined') {
    global.TextDecoderStream = function () {
        return {};
    };
}

global.__ExpoImportMetaRegistry = {};

if (typeof window === 'undefined') {
    global.window = {};
}

jest.mock('@react-native-async-storage/async-storage', () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'));

jest.mock('expo-linking', () => ({
    createURL: jest.fn(path => `exp://127.0.0.1:8081/${path}`),
}));

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'),
)
