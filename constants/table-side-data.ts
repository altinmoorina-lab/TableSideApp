export type Restaurant = {
  id: string;
  name: string;
  area: string;
  cuisine: string;
  rating: number;
  price: string;
  nextSlot: string;
  image: string;
  mood: string;
  seatsOpen: number;
};

export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  popular: boolean;
};

export type Reservation = {
  id: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  status: 'Confirmed' | 'Pending' | 'Completed';
};

export type OrderItem = {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  reservationId: string;
  status: 'Preparing' | 'Served' | 'Paid';
  items: OrderItem[];
};

export type AppNotification = {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
};

export const restaurants: Restaurant[] = [
  {
    id: 'aurora',
    name: 'Aurora Kitchen',
    area: 'Old Town',
    cuisine: 'Modern European',
    rating: 4.9,
    price: '$$$',
    nextSlot: '19:30',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    mood: 'Warm lights, tasting menus, date-night energy.',
    seatsOpen: 3,
  },
  {
    id: 'luna',
    name: 'Luna Lounge',
    area: 'Rooftop',
    cuisine: 'Fusion plates',
    rating: 4.8,
    price: '$$',
    nextSlot: '20:15',
    image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=900&q=80',
    mood: 'Skyline tables, mocktails, shareable plates.',
    seatsOpen: 6,
  },
  {
    id: 'harbor',
    name: 'Harbor Table',
    area: 'Waterfront',
    cuisine: 'Seafood',
    rating: 4.7,
    price: '$$$',
    nextSlot: '21:00',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
    mood: 'Private rooms and calm waterfront views.',
    seatsOpen: 2,
  },
];

export const menuItems: MenuItem[] = [
  { id: 'truffle-pasta', name: 'Truffle tagliatelle', category: 'Main', price: 14.5, popular: true },
  { id: 'burrata', name: 'Burrata garden plate', category: 'Starter', price: 8.9, popular: true },
  { id: 'salmon', name: 'Citrus salmon', category: 'Main', price: 16.2, popular: false },
  { id: 'lava-cake', name: 'Amber lava cake', category: 'Dessert', price: 6.5, popular: true },
];

export const reservations: Reservation[] = [
  {
    id: 'res-1001',
    restaurantId: 'harbor',
    restaurantName: 'Harbor Table',
    date: '2026-06-08',
    time: '20:00',
    guests: 2,
    status: 'Confirmed',
  },
  {
    id: 'res-1002',
    restaurantId: 'aurora',
    restaurantName: 'Aurora Kitchen',
    date: '2026-06-12',
    time: '19:30',
    guests: 4,
    status: 'Pending',
  },
];

export const orders: Order[] = [
  {
    id: 'ord-3001',
    reservationId: 'res-1001',
    status: 'Preparing',
    items: [
      { menuItemId: 'truffle-pasta', name: 'Truffle tagliatelle', quantity: 2, price: 14.5 },
      { menuItemId: 'burrata', name: 'Burrata garden plate', quantity: 1, price: 8.9 },
    ],
  },
];

export const notifications: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Reservation confirmed',
    body: 'Harbor Table saved your 20:00 table.',
    time: 'Now',
    unread: true,
  },
  {
    id: 'notif-2',
    title: 'Weather tip',
    body: 'Outdoor seating looks comfortable tonight.',
    time: '12m',
    unread: true,
  },
  {
    id: 'notif-3',
    title: 'Order update',
    body: 'Your pre-order is being prepared.',
    time: '25m',
    unread: false,
  },
];
