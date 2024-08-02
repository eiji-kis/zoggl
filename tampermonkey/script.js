// ==UserScript==
// @name         Inject Zoggl
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Inject Zoggl, a Vite React app, into Zoho time tracker page
// @author       Eiji
// @match        https://people.kissolutions.tech/kissolutions/zp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to create a root div for the React app
    function createRootDiv() {
        const rootDiv = document.createElement('div');
        rootDiv.id = 'zoggl-root';
        rootDiv.style.position = 'fixed';
        rootDiv.style.top = '0';
        rootDiv.style.left = '0';
        rootDiv.style.width = '30%';
        rootDiv.style.height = '100%';
        rootDiv.style.zIndex = '1000'; // Ensure it is on top of other elements
        rootDiv.style.backgroundColor = 'white'; // Optional: set background color
        document.body.appendChild(rootDiv);
    }

    // Function to inject the JavaScript bundle
    function injectScript(url) {
        var script = document.createElement('script');
        script.src = url;
        script.type = 'text/javascript';
        document.head.appendChild(script);
    }

    // Wait for the DOM to be fully loaded before injecting the script
    window.addEventListener('load', () => {
        createRootDiv();
        injectScript('https://raw.githubusercontent.com/eiji-kis/zoggl/main/dist/assets/zoggl_min.js');
    });
})();
