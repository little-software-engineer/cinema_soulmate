# 🎬 Cinema Soulmate

**Cinema Soulmate** is a modern, responsive web application designed for movie enthusiasts to discover films based on their current "vibe." Unlike generic movie lists, it allows users to mix multiple genres, search for specific titles, and instantly check where to stream their next favorite film.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TMDb](https://img.shields.io/badge/TMDB_API-01d277?style=for-the-badge&logo=themoviedatabase&logoColor=white)

---

## 🚀 Features

- **Multi-Genre "Mood" Mixer:** Select and combine multiple genre tags to find hyper-specific movie recommendations (e.g., Horror + Comedy).
- **Instant Search:** Real-time search functionality with **Debouncing** to optimize API performance and user experience.
- **Cinematic Trailers:** Integrated YouTube player within the app to watch official trailers without leaving the site.
- **Streaming Availability:** Real-time data on where to watch movies (Netflix, Disney+, etc.) powered by the Watch Providers API.
- **Favorites System:** Persistent "My Favorites" list using `LocalStorage`, allowing users to save movies across browser sessions.
- **Fully Responsive:** Fluid grid layout optimized for mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

- **Frontend:** React.js (Hooks, Functional Components)
- **Tooling:** Vite (Build tool), Axios (API Requests)
- **Data Source:** [The Movie Database (TMDb) API](https://developer.themoviedb.org/docs/getting-started)
- **Styling:** Custom CSS3 (Flexbox, CSS Grid)

---

## 🧠 Technical Challenges & Learnings

### 1. Optimizing API Calls with Debouncing

To prevent unnecessary API requests while a user is typing in the search bar, I implemented a **debounce function**. This ensures the app waits 500ms after the user stops typing before fetching data, significantly reducing server load.

### 2. Complex State Management

Managing a "multi-select" filter required handling an array of genre IDs. I developed a toggle logic that adds or removes IDs dynamically, ensuring the UI stays in sync with the API query parameters.

### 3. Asynchronous Data Orchestration

For the "Details" modal, I utilized `Promise.all` to fetch trailer data and streaming providers simultaneously. This reduced the loading time for the user compared to sequential API requests.

---

## 💻 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- A TMDb API Key

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/cinema-soulmate.git](https://github.com/your-username/cinema-soulmate.git)
   ```
2. Install dependencies:
   This project uses Vite for a fast development experience and Axios for API orchestration.

```bash
npm install
```

3. Environment Configuration
   The app requires an API Key from The Movie Database (TMDb). 1. Create a .env file in the root directory:
   1. Create a .env file in the root directory:
   ```bash
    touch .env
   ```
   2. Add your API key to the .env file using the Vite naming convention:
      ```bash
      VITE_TMDB_API_KEY=your_actual_api_key_here
      ```
   3) Run the Project
      Launch the development server:
   ```bash
   npm run dev
   ```
   The app will be running at http://localhost:5173.

Developed by little-software-engineer
