# 🍽️ Nearby Restaurant Picker

Discover nearby restaurants around your current location — and let fate decide what to eat next.

🌐 **Live App:** [sky-eat-what.vercel.app](https://sky-eat-what.vercel.app)

---

## 🚀 Features

* 📍 Automatically detect your location
* 🔍 Search restaurants by typing any address
* 🎲 Random picker (optionally from favorites only)
* ❤️ Save your favorite restaurants (stored in localStorage)
* ⏰ Filter by currently open restaurants
* 📏 Adjustable search distance (in km)
* 🗺️ Deep linking to native map apps (Google Maps, Apple Maps, Waze)
* 🌙 Dark mode support
* ⚡ Fast performance with SvelteKit SSR
* 💯 Fully free and based on OpenStreetMap data

---

## 🧱 Tech Stack

* [SvelteKit](https://kit.svelte.dev/) (SSR enabled)
* [TailwindCSS](https://tailwindcss.com/)
* [Overpass API](https://overpass-api.de/) – fetch nearby food/restaurant nodes
* [Nominatim](https://nominatim.org/) – reverse and address geocoding
* [opening\_hours.js](https://github.com/opening-hours/opening_hours.js/) – determine open/closed status
* [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) – for persisting favorites

---

## 🛠️ Getting Started

```bash
git clone https://github.com/your-username/nearby-restaurant-picker.git
cd nearby-restaurant-picker
pnpm install
pnpm dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧹 Project Structure

```
src/
├── lib/
│   ├── api/               # API helpers (Overpass, Nominatim)
│   ├── components/        # Reusable UI components
│   ├── stores/            # Writable/shared Svelte stores
│   └── utils.ts           # Utility functions (distance calc, sorting, etc.)
├── routes/
│   └── +page.svelte       # Main route with logic & layout
└── app.html               # HTML template
```

---

## 🤝 Contributing

This project is open to contributions! Fork and submit a pull request or open an issue.

---

## 🪪 License

[MIT License](LICENSE)

---

Made with ❤️ using Svelte + OpenStreetMap.
