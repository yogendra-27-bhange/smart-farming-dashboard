// This is a mock authentication module.
// In a real application, you would integrate with Firebase Auth or another auth provider.

export interface User {
  id: string;
  email: string;
  name?: string;
}

// Mock user database
const users: User[] = [
  { id: '1', email: 'farmer@example.com', name: 'John Farmer' },
];

export async function login(email: string, password?: string): Promise<User | null> {
  // Mock login: password is not checked for simplicity
  const user = users.find(u => u.email === email);
  if (user) {
    // In a real app, you'd set a session cookie or token here.
    // For mock purposes, we'll just return the user.
    if (typeof window !== 'undefined') {
      localStorage.setItem('agriview_user', JSON.stringify(user));
    }
    return user;
  }
  return null;
}

export async function signup(name: string, email: string, password?: string): Promise<User | null> {
  if (users.some(u => u.email === email)) {
    throw new Error('User already exists');
  }
  const newUser: User = { id: String(users.length + 1), email, name };
  users.push(newUser);
  // For mock purposes, log in the user after signup
  if (typeof window !== 'undefined') {
    localStorage.setItem('agriview_user', JSON.stringify(newUser));
  }
  return newUser;
}

export async function logout(): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('agriview_user');
  }
}

export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('agriview_user');
    return userStr ? JSON.parse(userStr) : null;
  }
  return null;
}
