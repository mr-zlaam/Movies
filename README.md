# Movies Cinema Ticket Booking & Discovery App

A pixel-perfect, high-fidelity cinema movie discovery and ticket booking mobile application built with **Expo**, **React Native**, **NativeWind (TailwindCSS)**, and the **TMDB (The Movie Database) API**.

---

## Features

- **Upcoming & Top Movies**: Real-time integration with TMDB API for fetching upcoming releases and top-rated movies.
- **Genre Search & Filtering**: Live search bar with instant query feedback and category grid breakdown.
- **Hero Movie Details (`375 x 466px`)**: Pixel-perfect hero banner with release date badge, genre tags, and overview.
- **Full-Screen Trailer Player**: Immediate auto-play YouTube trailer player with auto-closing on video completion and responsive landscape support.
- **Interactive Cinema Seat Selection**: Custom SVG seat grid supporting Regular, VIP, and Selected seat tiers with zoom controls and legend.
- **Custom Confirmation Modal**: High-fidelity booking confirmation dialog with summary card and total price calculation.
- **Custom Pill Bottom Tab Bar**: Dark floating pill tab bar (`rounded-t-[36px]`) with 1:1 Figma vector icons.

---

## Caching Strategy

The app implements a multi-layer caching strategy for smooth, offline-friendly UI performance and minimal TMDB API usage:

1. **Persistent Disk Image Caching (`expo-image`)**:
   - Movie poster images, backdrop banners, and category thumbnails utilize `cachePolicy="disk"`.
   - Downloaded image assets are cached locally on the device disk storage.
   - Re-opening movie details or scrolling through lists loads images instantly from disk cache without refetching over the network.

2. **In-Memory Session Caching (`useMovieSearch` & `useUpcomingMovies`)**:
   - Active search query results and movie category mappings are stored in in-memory state hooks during the app session.
   - Prevents redundant HTTP requests when toggling between search state and category views.

3. **Virtualized List Render Caching**:
   - `FlatList` component uses stable `useCallback` render references with `removeClippedSubviews={true}` and `windowSize={5}`.
   - Prevents re-computation of off-screen movie card components during high-speed scrolling.

---

## Architectural & Engineering Decisions

### 1. Strict 200 Lines of Code (LOC) Per-File Cap

- **Rationale**: To enforce strict modularity and maintainability, no code file in `app/`, `components/`, `hooks/`, or `lib/` exceeds **200 lines of code**.
- **Implementation**: Complex views are decomposed into focused, single-responsibility sub-components (e.g. `SeatGrid.tsx` + `SeatRow.tsx` + `SeatIcon.tsx`, `WatchScreen.tsx` + `WatchSearchResults.tsx`).

### 2. Touch Interaction Refactor (`TouchableOpacity`)

- **Rationale**: Solved runtime crash issues (`active:` pseudo-class listener collisions) caused by NativeWind active state handlers nested inside `ScrollView` and gesture containers.
- **Implementation**: Standardized press handling across `DateSelector`, `HallCard`, `SeatRow`, and tab bar items using React Native `TouchableOpacity` and `Pressable` style functions.

### 3. Route Layouts & Navigation Context

- **Rationale**: Prevented Expo Router context lookup errors (`Couldn't find a navigation context`).
- **Implementation**: Created dedicated nested route layouts (`app/booking/_layout.tsx` and `app/movie/_layout.tsx`) wrapping route groups with standard `<Stack screenOptions={{ headerShown: false }} />` providers.

### 4. `VirtualizedList` Performance Optimization

- **Rationale**: Eliminated list lag and React Native `VirtualizedList: You have a large list that is slow to update` warnings when rendering long movie feeds.
- **Implementation**: Configured `FlatList` with `initialNumToRender={5}`, `maxToRenderPerBatch={5}`, `windowSize={5}`, `removeClippedSubviews={true}`, and memoized item renderers using `useCallback`.

### 5. Figma Pixel Parity

- **Movie Cards**: `w-full` / dynamic flex width, `h-[180px]`, `rounded-[10px]`.
- **Category Cards**: `163px` width equivalent in 2-column flex grid, `h-[100px]`, `rounded-[10px]`.
- **CTA Buttons**: `w-[243px]`, `h-[50px]`, `rounded-[10px]`.
- **Bottom Tab Bar**: `h-[75px]`, `rounded-t-[36px]`, dark background (`#2E2739`) extending through bottom safe-area insets with zero gaps.

---

## Tech Stack & Dependencies

- **Framework**: [Expo SDK 54](https://expo.dev) / [React Native 0.81](https://reactnative.dev)
- **Routing**: [Expo Router v6](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: [NativeWind v4](https://www.nativewind.dev/) (TailwindCSS for React Native)
- **Icons & Typography**: `@expo/vector-icons`, `@expo-google-fonts/poppins`
- **Video & Graphics**: `react-native-youtube-iframe`, `react-native-svg`, `expo-image`, `expo-linear-gradient`
- **Package Manager**: [Bun](https://bun.sh)

---

## Getting Started

### 1. Prerequisites

- Node.js (v18+)
- Bun (`npm install -g bun`)
- Expo Go app on iOS/Android device or Xcode/Android Studio simulator.

### 2. Environment Configuration

Copy `.env.example` to `.env` and insert your TMDB API credentials:

```bash
cp .env.example .env
```

`.env` content:

```env
EXPO_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
EXPO_PUBLIC_TMDB_READ_TOKEN=your_tmdb_read_access_token_here
```

### 3. Installation

```bash
bun install
```

### 4. Running the Project

```bash
# Start development server
bun start

# Run on Android
bun android

# Run on iOS
bun ios

# Run TypeScript & Lint checks
bun run type:check
```

---
