/**
 * Authentication Service
 *
 * Handles login, signup, logout, and session management.
 * Currently uses localStorage - designed for easy swap to real API calls.
 *
 * To integrate with a real backend:
 * 1. Replace each function body with fetch/axios calls
 * 2. Store tokens from API response instead of user object
 * 3. Add token refresh logic if needed
 */

const STORAGE_KEYS = {
  USERS: "food_app_users",
  CURRENT_USER: "food_app_current_user",
};

/**
 * Seed a demo user for testing (only if no users exist)
 * Demo credentials: demo@foodapp.com / demo123
 */
function seedDemoUserIfNeeded() {
  const users = getUsersRaw();
  if (users.length === 0) {
    const demoUser = {
      id: "demo-user-1",
      email: "demo@foodapp.com",
      password: "demo123",
      name: "Demo User",
    };
    saveUsers([demoUser]);
  }
}

/**
 * Get all registered users from storage (mock DB)
 * @returns {Array} List of user objects
 */
function getUsersRaw() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function getUsers() {
  seedDemoUserIfNeeded();
  return getUsersRaw();
}

/**
 * Save users to storage
 * @param {Array} users - Users array
 */
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

/**
 * Generate a simple unique ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

/**
 * Login with email and password
 * @param {Object} credentials - { email, password }
 * @returns {Object} User object (without password)
 * @throws {Error} If credentials are invalid
 *
 * API replacement: POST /api/auth/login
 */
export function login(credentials) {
  const { email, password } = credentials;
  const users = getUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const userSession = { id: user.id, email: user.email, name: user.name };
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userSession));

  return userSession;
}

/**
 * Sign up a new user
 * @param {Object} userData - { email, password, name }
 * @returns {Object} Created user (without password)
 * @throws {Error} If email already exists
 *
 * API replacement: POST /api/auth/signup
 */
export function signup(userData) {
  const { email, password, name } = userData;
  const users = getUsers();

  const exists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) {
    throw new Error("An account with this email already exists");
  }

  const newUser = {
    id: generateId(),
    email: email.trim(),
    password,
    name: name.trim(),
  };
  users.push(newUser);
  saveUsers(users);

  const userSession = { id: newUser.id, email: newUser.email, name: newUser.name };
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userSession));

  return userSession;
}

/**
 * Log out the current user
 *
 * API replacement: POST /api/auth/logout (to invalidate token server-side)
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

/**
 * Get the currently logged-in user
 * @returns {Object|null} User object or null
 *
 * API replacement: GET /api/auth/me or validate stored token
 */
export function getCurrentUser() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  return getCurrentUser() !== null;
}
