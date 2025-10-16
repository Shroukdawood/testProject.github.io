# RN Store — 3 Pages Coding Challenge

## What this is
A minimal React Native + TypeScript app implementing the coding challenge:
- Login (DummyJSON)
- All Products list
- Specific Category list (chosen category shown below)
- Auto-lock after 10s inactivity / on background
- Unlock via biometrics + password fallback
- React Query caching persisted into MMKV for instant offline restores
- Superadmin can "Delete" a product (simulated via DELETE /products/{id})

## Chosen values
- Specific Category screen uses category: **smartphones**
- Superadmin username: **superadmin** (log in with username `superadmin` and any password to enable delete UI)

## Tech stack / notable libs
- React Native (CLI or Expo-managed — examples below target bare RN)
- TypeScript
- React Navigation
- Redux Toolkit (auth slice)
- @tanstack/react-query
- @tanstack/react-query-persist-client (MMKV persister)
- react-native-mmkv (MMKV storage)
- axios
- react-native-biometrics (biometrics)
- optional: @react-native-async-storage/async-storage (not used, MMKV used instead)

## Quick setup (bare React Native)
1. `git clone <repo>`
2. `yarn` or `npm install`
3. install native libs:
   - `npx pod-install ios`
   - follow react-native-biometrics and react-native-mmkv installation instructions for iOS/Android
4. Run:
   - iOS: `npx react-native run-ios`
   - Android: `npx react-native run-android`

> If using Expo, swap react-native-biometrics for `expo-local-authentication` and adapt MMKV to `expo-mmkv` or use `expo-secure-store`. The code below is written for bare RN with react-native-mmkv and react-native-biometrics.

## How it works (high level)
- On login: POST `/auth/login` to DummyJSON, store token & username in MMKV and Redux auth slice.
- On cold start: if token exists, app asks biometric unlock. After successful unlock, app calls `/auth/me` to validate token and load session.
- React Query is configured with a MMKV persister — queries are rehydrated on cold start so lists render instantly offline.
- Auto-lock: `useAutoLock` tracks touch events and AppState. Idle or background -> sets locked state after 10s. Unlock via biometrics or password fallback (the password is the one used to login and is validated by re-calling `/auth/login`).
- Superadmin: if username === `superadmin`, Delete button shown; on delete call `DELETE /products/{id}` and update React Query cache to remove item.

## Trade-offs & if I had more time
- I focused on correctness & clear architecture rather than pixel-perfect UI.
- I used `react-native-biometrics` for biometric unlock; in Expo you'd replace with `expo-local-authentication`.
- Tests: would add unit tests for hooks and reducers (Jest + RTL), and E2E tests (Detox).
- More time: refine accessibility, add animations to Lock overlay, better error UI (toasts, retry UI), and more robust persistence/rehydration edge handling.

