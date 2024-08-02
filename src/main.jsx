import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Check if the root element is inside a shadow root
const rootElement = document.getElementById('zoggl-root');

if (rootElement && rootElement.shadowRoot) {
  // If using shadow root, use shadowRoot
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement.shadowRoot.getElementById('zoggl-root')
  );
} else {
  // Normal rendering
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    rootElement
  );
}