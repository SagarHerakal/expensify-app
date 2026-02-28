# Expensify App 💸

A fully scaffolded React Native (Expo) app functioning as a modern, UI-forward clone of Splitwise. This app offers a sleek, dark-mode-first aesthetic for tracking group expenses and settling up with friends.

---

## 📸 Overview

This project is built using **Expo SDK 54** and focuses purely on high-quality React Native UI architecture. It includes state management, declarative data-fetching hooks (ready for a backend), robust navigation, and a scalable folder structure.

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) (via [Expo](https://expo.dev/))
- **Language**: TypeScript
- **Navigation**: [React Navigation v6](https://reactnavigation.org/) (Bottom Tabs + Native Stack)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Hook Layer**: [TanStack/React Query](https://tanstack.com/query/latest)
- **UI Components & Theming**: [React Native Paper](https://callstack.github.io/react-native-paper/)
- **Animations**: [React Native Reanimated v3](https://docs.swmansion.com/react-native-reanimated/)
- **Forms**: React Hook Form + Zod

## 🚀 Features (Scaffolded UI)

The app consists of 7 core screens mapped to specific feature flows:

1. **Auth Flow**
   - **Login**: Email/Password + Google Sign-In button mock
   - **Register**: Account creation form
2. **Dashboard / Home**
   - Net Balance Summary Card (with "You are owed" / "You owe" splits)
   - Active Groups horizontal quick-view
   - Recent Activity feed
3. **Groups Flow**
   - **Groups List**: Vertical list of groups with inline balance states
   - **Group Detail**: Deep dive into a group's expenses, displaying per-member exact split ratios
   - **Add Expense**: Beautiful numerical form to add a new expense, pick a category (food, travel, etc.), and choose split methods (equal, percentage, exact)
4. **Friends List**
   - Vertical breakdown of all friends with pending balances and quick "Settle" actions
5. **Profile & Settings**
   - Stats summary (total groups, expenses, spend) and mock settings list

## 📁 Project Structure

```text
expensify-app/
├── App.tsx                          # Root entry point & Context Providers
└── app/
    ├── types/                       # Shared TS interfaces (User, Group, Expense)
    ├── theme/                       # Design system (Colors, Typography, Paper Theme)
    ├── data/                        # mockData.ts (Used while backend is pending)
    ├── stores/                      # Zustand Stores (auth, group, expense)
    ├── navigation/                  # React Navigation Setup (Auth, Tabs, Stack)
    └── screens/
        ├── auth/                    # LoginScreen, RegisterScreen
        ├── home/                    # HomeScreen
        ├── groups/                  # GroupsScreen, GroupDetailScreen
        ├── expenses/                # AddExpenseScreen
        ├── friends/                 # FriendsScreen
        └── profile/                 # ProfileScreen
```

## 💻 Running Locally

### 1. Install Dependencies
Make sure you have Node installed, then run:
```bash
npm install
```

### 2. Start the Metro Bundler
Start Expo with the cache cleared to ensure Babel plugins load correctly:
```bash
npx expo start --clear
```

### 3. Open the App
- **Physical Device**: Download **Expo Go** on your iOS or Android device and scan the QR code that appears in your terminal.
- **Emulator**: Press `a` in the terminal to launch the Android Emulator, or `i` for the iOS Simulator.

> Note: If you are connecting from a different network than your PC, use `npx expo start --tunnel`.

## 🎨 Theming Notes

The app uses a custom dark-mode specific theme built on top of React Native Paper's `MD3DarkTheme`.
- **Primary Brand**: Vibrant Green (`#1DB954`)
- **Background**: Near Black (`#0F1117`)

You can edit these values scaling globally inside `/app/theme/theme.ts`.
