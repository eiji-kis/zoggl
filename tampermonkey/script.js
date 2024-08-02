// ==UserScript==
// @name         Inject Zoggl
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Inject Zoggl, a Vite React app, into Zoho time tracker page
// @author       Eiji
// @match        https://people.kissolutions.tech/kissolutions/zp
// @grant        none
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';

    // Function to create a root div for the React app
    function createRootDiv() {
        const rootDiv = document.createElement('div');
        rootDiv.id = 'zoggl-root';
        rootDiv.style.position = 'fixed';
        rootDiv.style.top = '0';
        rootDiv.style.left = '30%';
        rootDiv.style.width = '30%';
        rootDiv.style.height = '100%';
        rootDiv.style.zIndex = '1000'; // Ensure it is on top of other elements
        rootDiv.style.backgroundColor = 'white'; // Optional: set background color
        document.body.appendChild(rootDiv);
        console.log('Root div created');
    }

    // Function to inject the JavaScript bundle content
    function injectScriptContent(content) {
        var script = document.createElement('script');
        script.textContent = content;
        document.head.appendChild(script);
        console.log('Script content injected');
    }

    // Function to fetch and inject the JavaScript bundle
    async function fetchAndInjectScript(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Network response was not ok. Status: ${response.status}, Status Text: ${response.statusText}`);
            const scriptContent = await response.text();
            injectScriptContent(scriptContent);
        } catch (error) {
            console.error(`Error fetching script from ${url}:`, error);
        }
    }

    // Wait for the DOM to be fully loaded before injecting the script
    window.addEventListener('load', () => {
        console.log('Page fully loaded');
        createRootDiv();
        const scriptUrl = 'https://raw.githubusercontent.com/eiji-kis/zoggl/main/dist/assets/zoggl_min.js';
        console.log('Fetching and injecting script:', scriptUrl);
        fetchAndInjectScript(scriptUrl);
    });

    // Additional log to verify the script is running
    console.log('Tampermonkey script executed');
})();
