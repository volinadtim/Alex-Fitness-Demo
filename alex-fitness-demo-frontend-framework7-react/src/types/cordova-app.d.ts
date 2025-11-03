declare module "../js/cordova-app" {
    const cordovaApp: {
        initialize: () => void;
        // Add other methods you use from cordova-app
        [key: string]: any;
    };
    export default cordovaApp;
}
