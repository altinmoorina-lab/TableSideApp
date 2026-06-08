const http = require('http');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const PORT = Number(process.env.PORT || 4000);
const DB_PATH = join(__dirname, 'db.json');

function readDb() {
  return JSON.parse(readFileSync(DB_PATH, 'utf8'));
}

function writeDb(db) {
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function send(res, status, body) {
  res.writeHead(status, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      resolve(body ? JSON.parse(body) : {});
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    send(res, 200, { ok: true });
    return;
  }

  const db = readDb();
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/api/dashboard') {
    send(res, 200, {
      restaurants: db.restaurants,
      reservations: db.reservations,
      orders: db.orders,
      notifications: db.notifications,
      weather: {
        city: 'Prishtina',
        label: '22 C',
        detail: 'Clear evening for outdoor tables',
      },
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/login') {
    const payload = await readBody(req);
    const user = db.users.find((item) => item.email === payload.email);

    if (!user || user.password !== payload.password) {
      send(res, 401, { message: 'Invalid email or password' });
      return;
    }

    const { password, ...safeUser } = user;
    send(res, 200, safeUser);
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/register') {
    const payload = await readBody(req);
    const user = {
      id: `user-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      membership: 'Gold member',
    };

    db.users.push(user);
    writeDb(db);

    const { password, ...safeUser } = user;
    send(res, 201, safeUser);
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/reservations') {
    const payload = await readBody(req);
    const restaurant = db.restaurants.find((item) => item.id === payload.restaurantId) ?? db.restaurants[0];
    const reservation = {
      id: `res-${Date.now()}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      date: payload.date,
      time: payload.time,
      guests: payload.guests,
      status: 'Confirmed',
    };

    db.reservations.unshift(reservation);
    db.notifications.unshift({
      id: `notif-${Date.now()}`,
      title: 'Reservation confirmed',
      body: `${restaurant.name} saved your ${payload.time} table.`,
      time: 'Now',
      unread: true,
    });
    writeDb(db);
    send(res, 201, reservation);
    return;
  }

  send(res, 404, { message: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`TableSide API running on http://localhost:${PORT}`);
});
