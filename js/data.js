// ===========================================================
// data.js — the list of products (our "database")
// Every other script reads this list. To add a product,
// copy one block below and change the values.
// ===========================================================

var products = [
  { id: 1, name: "Pulse Watch",   category: "Smart watches",  price: 329, badge: "Best seller",
    tagline: "Your invite inbox, on your wrist.",   image: "images/watch-teal.svg",
    features: ["Receive hologram-meet invites", "Voice and gesture messages", "See who is available", "Health tracking while in VR"] },

  { id: 2, name: "Orbit Watch",   category: "Smart watches",  price: 399, badge: "New",
    tagline: "Slim, bright, always in sync.",       image: "images/watch-dark.svg",
    features: ["AR dial", "Beam-over shortcuts", "GPS and route sharing", "Haptic nudge when a friend arrives"] },

  { id: 3, name: "Halo Glasses",  category: "Smart glasses",  price: 299, badge: "New",
    tagline: "See them. Be there.",                 image: "images/glasses-cyan.svg",
    features: ["Immersive 3D presence", "Friends appear life-size in your room", "Capture and share moments", "Light and comfortable"] },

  { id: 4, name: "Nova Shades",   category: "Smart glasses",  price: 349, badge: "Popular",
    tagline: "Hologram-ready, street-ready.",       image: "images/glasses-dark.svg",
    features: ["Smart lenses", "Spatial audio", "Gaze-based reactions", "Beam to a friend's place in one blink"] },

  { id: 5, name: "Aura Ring",     category: "Smart rings",    price: 179, badge: "New",
    tagline: "A small ring. A stronger bond.",      image: "images/ring-silver.svg",
    features: ["Send touch and gesture signals", "Feel a real-time heartbeat", "Connect instantly in virtual spaces", "Discreet and elegant"] },

  { id: 6, name: "Ember Ring",    category: "Smart rings",    price: 219, badge: "Limited",
    tagline: "Haptic taps from your people.",       image: "images/ring-mint.svg",
    features: ["Gesture control for virtual objects", "7-day battery", "Water-proof", "Pairs with any Ureality device"] },

  { id: 7, name: "Echo Necklace", category: "Necklaces",      price: 159, badge: "Popular",
    tagline: "Feel their presence.",                image: "images/necklace-teal.svg",
    features: ["Haptic feedback when they think of you", "Share emotions as light pulses", "Stay connected all day", "Elegant design"] },

  { id: 8, name: "Lume Pendant",  category: "Necklaces",      price: 189, badge: "Best value",
    tagline: "A tiny star you wear.",               image: "images/necklace-dark.svg",
    features: ["Glow-sync with a close friend", "Vibration patterns as secret codes", "Shows who is online", "Pairs with any Ureality device"] }
];
