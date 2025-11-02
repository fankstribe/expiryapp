module.exports = {
    preset: "jest-expo",
    testEnvironment: "node",
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|expo-router|react-native-reanimated|nativewind|expo-modules-core|react-native-chart-kit|react-native-vector-icons|@unimodules|react-native-worklets|react-native-css-interop|expo-linking|expo-constants|expo-asset|expo-font)/)",
    ],
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    setupFiles: [
        "./node_modules/react-native-reanimated/lib/module/jestUtils.js",
        "./jest/setup.js",
    ],
    globals: {
        __DEV__: true
    }
};


