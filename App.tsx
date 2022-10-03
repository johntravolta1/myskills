import React, { useEffect } from 'react'
import { Home } from './src/pages/Home'
import {StatusBar} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import codePush from "react-native-code-push";
import * as Sentry from "@sentry/react-native";


Sentry.init({
  dsn: "https://6dd7476ba73a48c6b95ed80a10c78e69@o1249513.ingest.sentry.io/4503917582876672",
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

function App() {

  useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE
  });

    // throw new Error('Não foi possível abrir a aplicação. Tente mais tarde!')

    SplashScreen.hide()
  } ,[])
  
  return (
    <>
      <StatusBar barStyle='light-content'></StatusBar>
      <Home/>
    </>
  
  )
}

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME
})(App)