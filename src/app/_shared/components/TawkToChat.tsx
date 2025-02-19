"use client";

import { useEffect } from 'react';

// Declare global types for Tawk.to integration
declare global {
  interface Window {
    Tawk_API?: any; // Declare Tawk API interface
    Tawk_LoadStart?: any; // Declare Tawk load start time
  }
}

export default function TawkToChat() {
  useEffect(() => {
    // Initialize Tawk API object if not exists
    window.Tawk_API = window.Tawk_API || {};
    // Set load start timestamp
    window.Tawk_LoadStart = new Date();

    // Configure widget styling and behavior when loaded
    window.Tawk_API.onLoad = function(){
      // Maximize chat window on load
    //   window.Tawk_API.maximize();
      // Apply custom styling configuration
      window.Tawk_API.customStyle({
        zIndex: 1000, // Set z-index for widget
        visibility: {
          desktop: {
            position: 'br', // Position bottom right on desktop
            xOffset: '20px', // Horizontal offset from edge
            yOffset: '20px' // Vertical offset from edge
          },
          mobile: {
            position: 'br', // Position bottom right on mobile
            xOffset: '10px', // Horizontal offset from edge
            yOffset: '70px' // Vertical offset from edge
          }
        },
        popup: {
          width: '350px', // Set chat window width
          height: '520px' // Set chat window height
        }   
      });
    };
    
    // Inject Tawk.to script into page
    (function(){
      // Create new script element
      var s1 = document.createElement("script");
      // Get first script tag as reference
      var s0 = document.getElementsByTagName("script")[0];
      
      // Insert script if reference exists
      if (s0 && s0.parentNode) {
        s1.async = true; // Load asynchronously
        s1.src = 'https://embed.tawk.to/67b5963c70154f190a9e6f6f/1ikel5nll'; // Tawk embed URL
        s1.charset = 'UTF-8'; // Set character encoding
        s1.setAttribute('crossorigin', '*'); // Allow cross-origin
        s0.parentNode.insertBefore(s1, s0); // Insert before first script
      }
    })();
  }, []); // Empty dependency array - run once on mount

  return null; // No visible UI elements
} 