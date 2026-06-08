import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';

import {
  AppNotification,
  MenuItem,
  Order,
  Reservation,
  Restaurant,
  notifications as seedNotifications,
  orders as seedOrders,
  reservations as seedReservations,
  restaurants as seedRestaurants,
} from '@/constants/table-side-data';
import {
  buildNotification,
  createOrder,
  createReservation,
  loginUser,
  registerUser,
} from '@/services/table-side-api';

type User = {
  id: string;
  name: string;
  email: string;
  membership: string;
};

type Weather = {
  city: string;
  label: string;
  detail: string;
};

type TableSideContextValue = {
  user: User | null;
  restaurants: Restaurant[];
  reservations: Reservation[];
  orders: Order[];
  notifications: AppNotification[];
  weather: Weather;
  unreadCount: number;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  reserveTable: (restaurantId: string, date: string, time: string, guests: number) => Promise<void>;
  placeOrder: (reservationId: string, selectedItems: MenuItem[]) => Promise<void>;
  markNotificationsRead: () => void;
};

const TableSideContext = createContext<TableSideContextValue | null>(null);

export function TableSideProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'user-1',
    name: 'Altin Morina',
    email: 'altin@example.com',
    membership: 'Gold member',
  });
  const [reservations, setReservations] = useState(seedReservations);
  const [orders, setOrders] = useState(seedOrders);
  const [notifications, setNotifications] = useState(seedNotifications);

  const value = useMemo<TableSideContextValue>(
    () => ({
      user,
      restaurants: seedRestaurants,
      reservations,
      orders,
      notifications,
      weather: {
        city: 'Prishtina',
        label: '22 C',
        detail: 'Clear evening for outdoor tables',
      },
      unreadCount: notifications.filter((item) => item.unread).length,
      signIn: async (email, password) => {
        const nextUser = await loginUser({ email, password });
        setUser(nextUser);
        setNotifications((current) => [
          buildNotification('Signed in', `Welcome back, ${nextUser.name}.`),
          ...current,
        ]);
      },
      signUp: async (name, email, password) => {
        const nextUser = await registerUser({ name, email, password });
        setUser(nextUser);
        setNotifications((current) => [
          buildNotification('Account created', 'Your TableSide profile is ready.'),
          ...current,
        ]);
      },
      signOut: () => {
        setUser(null);
      },
      reserveTable: async (restaurantId, date, time, guests) => {
        const reservation = await createReservation({ restaurantId, date, time, guests });
        setReservations((current) => [reservation, ...current]);
        setNotifications((current) => [
          buildNotification('Reservation confirmed', `${reservation.restaurantName} saved your ${time} table.`),
          ...current,
        ]);
      },
      placeOrder: async (reservationId, selectedItems) => {
        if (selectedItems.length === 0) {
          return;
        }

        const order = await createOrder(reservationId, selectedItems);
        setOrders((current) => [order, ...current]);
        setNotifications((current) => [
          buildNotification('Kitchen received it', `${selectedItems.length} menu item(s) added to your table.`),
          ...current,
        ]);
      },
      markNotificationsRead: () => {
        setNotifications((current) => current.map((item) => ({ ...item, unread: false })));
      },
    }),
    [notifications, orders, reservations, user],
  );

  return <TableSideContext.Provider value={value}>{children}</TableSideContext.Provider>;
}

export function useTableSide() {
  const context = useContext(TableSideContext);

  if (!context) {
    throw new Error('useTableSide must be used inside TableSideProvider');
  }

  return context;
}
