# Kleinstark

## This project is build using following tech stack

&nbsp;

|      Title       |     Value      | version |
| :--------------: | :------------: | :-----: |
|     Language     |   Typescript   |  4.4.4  |
| Mobile Framework |  React Native  | 0.66.4  |
|   UI Framework   |     React      | 17.0.2  |
| Network Request  | Apollo Graphql |  4.4.4  |
| Package Manager  |      yarn      | 1.22.14 |

&nbsp;

## To run project in your local machine clone the source code from here and do following

### Known issues + possible solutions when working with an Apple Silicon Mac:

https://github.com/CocoaPods/CocoaPods/issues/10723#issuecomment-864408657  
https://github.com/CocoaPods/CocoaPods/issues/10723#issuecomment-891350896

&nbsp;

```
yarn install
cd ios && pod install
yarn android
yarn ios
```

- To build the project in ios use the Xcode

- To build the project in android either use Android Studio or enter following in command

```
cd android
./gradlew assemblerelease
```

## To make android studio run on mac add following in the ~/.zshrc

```
export ANDROID_HOME=/Users/$USER/Library/Android/sdk
export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools

export ANDROID_SDK=$HOME/Library/Android/sdk
export PATH=$ANDROID_SDK/emulator:$PATH
export PATH=$ANDROID_SDK/tools:$PATH
export PATH=$ANDROID_SDK/tools/bin:$PATH
export PATH=$ANDROID_SDK/platform-tools:$PATH
export ANDROID_SDK_ROOT=$ANDROID_SDK
export ANDROID_AVD_HOME=$HOME/.android/and
alias emulator='$ANDROID_SDK/emulator/emulator'
```

## Environment variable

Env file is set using the react-native-dotenv.
You should create .env file using .env.template and fill out all needed variables (local use).
Moreover, do the same in the environments folder for .env.local, .env.dev and .env.prod.
While building the .env file will be overwritten by the according variables of the regarding env file.
The structure should be:
-src
-environments
--.env.local
--.env.dev
--.env.prod
-.env
