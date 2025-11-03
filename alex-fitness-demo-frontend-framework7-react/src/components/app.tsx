import { App, f7, f7ready, View } from 'framework7-react';
import { getDevice } from 'framework7/lite-bundle';
import React from 'react';
import cordovaApp from '../js/cordova-app';
import routes from '../js/routes';
import store from '../js/store';

const DemoApp: React.FC = () => {
  const device = getDevice();
  // Framework7 Parameters
  const f7params = {
    name: 'Alex Fitness Demo', // App name
    theme: 'auto', // Automatic theme detection
    colors: {
      primary: '#323233',
    },
    darkMode: true,

    store: store,
    routes: routes,

    // Input settings
    input: {
      scrollIntoViewOnFocus: device.cordova,
      scrollIntoViewCentered: device.cordova,
    },
    // Cordova Statusbar settings
    statusbar: {
      iosOverlaysWebView: true,
      androidOverlaysWebView: false,
    },
  };

  f7ready(() => {
    // Init cordova APIs (see cordova-app.js)
    if (f7.device.cordova) {
      cordovaApp.init(f7);
    }

    // Call F7 APIs here
  });

  return (
    <App {...f7params}>
      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />
    </App>
  );
};
export default DemoApp;
