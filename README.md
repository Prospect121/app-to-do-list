# App To Do List - Ionic Angular App with Cordova

This project is an application built with Ionic and Angular, using Cordova for native integrations on mobile devices.

## Prerequisites

Make sure you have the following installed on your machine:

1. [Node.js](https://nodejs.org/) (versión LTS recomendada)
2. [Angular CLI](https://angular.dev/installation)
3. [Ionic CLI](https://ionicframework.com/docs/cli)
   ```bash
   npm install -g @ionic/cli
   npm install -g cordova
   ```

## Ejecución Local

```bash
npm install
ionic serve --open
```

## Generar APK

```bash
ionic build
ionic cordova platform add android
ionic cordova run android
Or open Android Studio, navigate to the resource in the project: platforms -> android
 Generate APK in Android Studio -> build -> Build App Bundle(s) / APK(s) -> Build APK(s)
```
