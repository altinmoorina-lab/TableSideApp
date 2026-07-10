export type LocalUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  passwordHash?: string;
  role: 'user' | 'admin';
};

const globalUsers = globalThis as typeof globalThis & {
  techhubLocalUsers?: LocalUser[];
};

globalUsers.techhubLocalUsers ??= [
  {
    id: 'user-1',
    name: 'Altin Morina',
    email: 'altin@example.com',
    password: 'password123',
    role: 'user',
  },
  {
    id: 'admin-1',
    name: 'TechHub Admin',
    email: 'admin@techhub.com',
    password: 'admin123',
    role: 'admin',
  },
];

export function getLocalUsers() {
  return globalUsers.techhubLocalUsers!;
}

export function addLocalUser(user: LocalUser) {
  const users = getLocalUsers();
  const existingIndex = users.findIndex((item) => item.email === user.email);
  if (existingIndex >= 0) {
    users[existingIndex] = user;
    return user;
  }

  users.push(user);
  return user;
}
