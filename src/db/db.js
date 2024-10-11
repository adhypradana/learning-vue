import { openDB } from 'idb';

// Define the IndexedDB database
const DB_NAME = 'SignUpData';
const STORE_NAME = 'users';

// Initialize the database
const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    // Create the object store (table) if it doesn't exist
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('name', 'name', { unique: false });
      store.createIndex('email', 'email', { unique: true });
      store.createIndex('phone', 'phone', { unique: false });
    }
  },
});

// Function to add a user to the IndexedDB
export async function addUser(user) {
  const db = await dbPromise;
  return db.add(STORE_NAME, user);
}

// Function to get all users from the IndexedDB
export async function getUsers() {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
}