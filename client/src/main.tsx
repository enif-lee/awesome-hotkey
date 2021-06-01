import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {BrowserRouter} from "react-router-dom";
import {createInstance, MatomoProvider} from "@datapunt/matomo-tracker-react";

const instance = createInstance({
    urlBase: 'https://awesome-hotkey.matomo.cloud/',
    siteId: 1,
    // userId: '', // optional, default value: `undefined`.
    trackerUrl: 'https://awesome-hotkey.matomo.cloud/matomo.php', // optional, default value: `${urlBase}matomo.php`
    srcUrl: 'https://cdn.matomo.cloud/awesome-hotkey.matomo.cloud/matomo.js', // optional, default value: `${urlBase}matomo.js`
    disabled: false, // optional, false by default. Makes all tracking calls no-ops if set to true.
    heartBeat: { // optional, enabled by default
        active: true, // optional, default value: true
        seconds: 15 // optional, default value: `15
    },
    linkTracking: true, // optional, default value: true
    configurations: { // optional, default value: {}
        // any valid matomo configuration, all below are optional
        // disableCookies: true,
        // setSecureCookie: true,
        // setRequestMethod: 'POST'
    }
})

ReactDOM.render(
    <BrowserRouter>
        <MatomoProvider value={instance}>
            <App/>
        </MatomoProvider>
    </BrowserRouter>,
    document.getElementById('root')
)