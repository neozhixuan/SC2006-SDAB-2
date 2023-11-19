# SC2006-Native-Frontend

## System Specifications
- 21 > JRE Version >= 17
- Android API 34, Extension Level 3 Platform
- Node Package Manager

## System Setup
1. `npm uninstall -g react-native-cli`
2. `npm uninstall -g react-native`
3. `npm install -g react-native-cli`
4. `npm install -g react-native`

## Android Studio Setup
Install all necessary SDKs from https://reactnative.dev/docs/environment-setup

## JRE Setup for JRE 21
1. `cd frontend`
2. `cd android`
3. Open `gradle.properties` and add your old JDK version path `org.gradle.java.home=C:\\Program Files\\Java\\jdk-17.0.1`
4. `./gradlew clean`
5. `cd ..`

## Run the android app
1. Start the Google Pixel Emulator
2. `cd frontend`
3. `npm i`
4. `npx react-native start`
5. Press `a` to run android simulator (wait 15s)
