import {
  AppNotification,
  MenuItem,
  Order,
  Reservation,
  Restaurant,
  menuItems,
  notifications,
  orders,
  reservations,
  restaurants,
} from '@/constants/table-side-data';

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = LoginPayload & {
  name: string;
};

type CreateReservationPayload = {
  restaurantId: string;
  date: string;
  time: string;
  guests: number;
};

const wait = (ms = 220) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loginUser({ email }: LoginPayload) {
  await wait();
  return {
    id: 'user-1',
    name: email.includes('@') ? email.split('@')[0] : 'Altin',
    email,
    membership: 'Gold member',
  };
}

export async function registerUser({ name, email }: RegisterPayload) {
  await wait();
  return {
    id: 'user-1',
    name,
    email,
    membership: 'Gold member',
  };
}

export async function fetchDashboard() {
  await wait();
  return {
    restaurants,
    reservations,
    orders,
    notifications,
    weather: {
      city: 'Prishtina',
      label: '22 C',
      detail: 'Clear evening for outdoor tables',
    },
  };
}

export async function fetchRestaurants(): Promise<Restaurant[]> {
  await wait();
  return restaurants;
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  await wait();
  return menuItems;
}

export async function createReservation(payload: CreateReservationPayload): Promise<Reservation> {
  await wait();
  const restaurant = restaurants.find((item) => item.id === payload.restaurantId) ?? restaurants[0];

  return {
    id: `res-${Date.now()}`,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    date: payload.date,
    time: payload.time,
    guests: payload.guests,
    status: 'Confirmed',
  };
}

export async function createOrder(reservationId: string, selectedItems: MenuItem[]): Promise<Order> {
  await wait();

  return {
    id: `ord-${Date.now()}`,
    reservationId,
    status: 'Preparing',
    items: selectedItems.map((item) => ({
      menuItemId: item.id,
      name: item.name,
      quantity: 1,
      price: item.price,
    })),
  };
}

export function buildNotification(title: string, body: string): AppNotification {
  return {
    id: `notif-${Date.now()}`,
    title,
    body,
    time: 'Now',
    unread: true,
  };
}
