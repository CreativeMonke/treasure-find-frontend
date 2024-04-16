import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import "./i18n.js"
import { Provider } from "react-redux";
import { store } from "./app/store.js"
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <Provider store={store}>
        <App />
        <Analytics />
        <SpeedInsights />
    </Provider>
);
