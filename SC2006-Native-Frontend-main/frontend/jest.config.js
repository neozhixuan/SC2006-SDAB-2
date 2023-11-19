module.exports = {
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-community|react-navigation|@react-navigation/.*|@react-native-picker|@react-native-picker/picker|react-native-gesture-handler|react-native-firebase/app))',
  ],
};
