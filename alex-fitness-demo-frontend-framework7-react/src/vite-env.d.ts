/// <reference types="vite/client" />

declare const process: {
    env: {
        NODE_ENV: "development" | "production";
        TARGET: "web" | "cordova";
    };
};
