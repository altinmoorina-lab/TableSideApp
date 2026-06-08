# TableSide - Mobile Development Project

## Project Scope

TableSide is a mobile restaurant reservation application built with Expo SDK 54 and React Native. The app lets a user sign in, browse restaurants, reserve a table, pre-order menu items, and receive notifications about reservations and orders.

## Functional Requirements Coverage

- User Authentication: login and register screens update the app session.
- Feature Set:
  - Booking System: create table reservations with restaurant, date, time, and guest count.
  - Menu / Orders: select dishes and send an order to the kitchen.
  - Notifications / Dashboard: live reservation, order, and alert updates.
  - Restaurant Discovery: browse restaurant cards with photos, ratings, open tables, and cuisine.
- API Integration: the app contains a backend-style service layer and a local Node REST API in `backend/server.js`.
- Responsive UI/UX: all main screens are mobile-first, scrollable, and built with Expo Router tabs.
- Notifications: in-app notification list with unread/read state.

## Technical Architecture

- Mobile app: Expo SDK 54, Expo Router, React Native, TypeScript.
- State layer: `context/table-side-context.tsx`.
- Service layer: `services/table-side-api.ts`.
- Local database seed: `constants/table-side-data.ts`.
- Optional local REST backend: `backend/server.js` with `backend/db.json`.

## Main Modules

1. Auth Module
   - Login
   - Register
   - Session state

2. Reservation Module
   - Restaurant selection
   - Guest counter
   - Time slot selection
   - Reservation history

3. Orders Module
   - Menu selection
   - Checkout total
   - Send order to kitchen
   - Order history

4. Dashboard / Notifications Module
   - Upcoming reservation
   - Order count
   - Unread alerts
   - Weather/API demo card

## How To Run

```bash
npm run web
```

Optional backend:

```bash
npm run backend
```

The backend runs on `http://localhost:4000` and exposes:

- `GET /api/dashboard`
- `POST /api/login`
- `POST /api/register`
- `POST /api/reservations`

## Testing Notes

- Run `npm run lint` before submission.
- Demo flow:
  1. Open Home.
  2. Browse Explore.
  3. Create a reservation in Bookings.
  4. Place an order in Orders.
  5. Open Profile and show notifications/account data.
