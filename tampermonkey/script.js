// ==UserScript==
// @name         Inject Zoggl
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Inject Zoggl, a Vite React app, into Zoho time tracker page using an iframe for isolation with URL monitoring and a styled control button to minimize/expand the iframe
// @author       Eiji
// @match      https://people.kissolutions.tech/kissolutions/zp*
// @grant        none
// @connect      raw.githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';

    let iframe = null;
    let controlButton = null;
    let iframeVisible = true;

    // Function to create an iframe for the React app
    function createIframe() {
        iframe = document.createElement('iframe');
        iframe.id = 'zoggl-iframe';
        iframe.style.position = 'fixed';
        iframe.style.top = '10%';
        iframe.style.left = '5%';
        iframe.style.width = '80%';
        iframe.style.height = '80%';
        iframe.style.zIndex = '1000'; // Ensure it is on top of other elements
        iframe.style.backgroundColor = 'white'; // Optional: set background color
        document.body.appendChild(iframe);

        // Write a basic HTML structure inside the iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write('<!DOCTYPE html><html><head><title>Zoggl App</title></head><body><div id="zoggl-root"></div></body></html>');
        iframeDoc.close();

        console.log('Iframe created');
        return iframe;
    }

    // Function to remove the iframe
    function removeIframe() {
        if (iframe) {
            iframe.remove();
            iframe = null;
            console.log('Iframe removed');
        }
    }

    // Function to inject the JavaScript bundle content into the iframe
    function injectScriptContent(content) {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        const script = iframeDoc.createElement('script');
        script.textContent = content;
        iframeDoc.head.appendChild(script);
        console.log('Script content injected into iframe');
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

    // Function to handle URL changes
    function handleUrlChange() {
        if (window.location.href === 'https://people.kissolutions.tech/kissolutions/zp#timetracker/timelogs/listview') {
            if (!iframe) {
                iframe = createIframe();
                const scriptUrl = 'https://raw.githubusercontent.com/eiji-kis/zoggl/main/dist/assets/zoggl_min.js';
                console.log('Fetching and injecting script:', scriptUrl);
                fetchAndInjectScript(scriptUrl);
            }
            if (controlButton) controlButton.style.display = 'block';
        } else {
            removeIframe();
            if (controlButton) controlButton.style.display = 'none';
        }
    }

    // Function to create the control button
    function createControlButton() {
        controlButton = document.createElement('button');
        controlButton.id = 'zoggl-control-button';
        controlButton.style.position = 'fixed';
        controlButton.style.top = '8px';
        controlButton.style.left = '100px';
        controlButton.style.zIndex = '1001';
        controlButton.style.padding = '10px 20px';
        controlButton.style.fontSize = '16px';
        controlButton.style.color = '#fff';
        controlButton.style.backgroundColor = '#3bbd9b';
        controlButton.style.border = 'none';
        controlButton.style.borderRadius = '5px';
        controlButton.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        controlButton.style.cursor = 'pointer';
        controlButton.style.transition = 'background-color 0.3s ease';
        controlButton.textContent = 'Minimize Zoggl';

        controlButton.addEventListener('click', toggleIframeVisibility);
        controlButton.addEventListener('mouseover', () => {
            controlButton.style.backgroundColor = '#2f9a7e';
        });
        controlButton.addEventListener('mouseout', () => {
            controlButton.style.backgroundColor = '#3bbd9b';
        });

        document.body.appendChild(controlButton);
        console.log('Control button created');
    }

    // Function to toggle the iframe visibility
    function toggleIframeVisibility() {
        if (iframeVisible) {
            iframe.style.display = 'none';
            controlButton.textContent = 'Show Zoggl';
        } else {
            iframe.style.display = 'block';
            controlButton.textContent = 'Hide Zoggl';
        }
        iframeVisible = !iframeVisible;
    }

    // Monitor URL changes
    let oldHref = document.location.href;
    const body = document.querySelector('body');
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(() => {
            if (oldHref !== document.location.href) {
                oldHref = document.location.href;
                console.log('URL changed:', oldHref);
                handleUrlChange();
            }
        });
    });

    observer.observe(body, { childList: true, subtree: true });

    // Initial check
    window.addEventListener('load', () => {
        console.log('Page fully loaded');
        handleUrlChange();
        if (window.location.href === 'https://people.kissolutions.tech/kissolutions/zp#timetracker/timelogs/listview') {
            createControlButton();
        }
    });

    // Additional log to verify the script is running
    console.log('Tampermonkey script executed');
})();
