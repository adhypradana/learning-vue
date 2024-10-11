import { openDB } from 'idb';

// Define the IndexedDB database
const DB_NAME = 'SignUpData';
const STORE_NAME = 'users';

// Initialize the database
const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('name', 'name', { unique: false });
      store.createIndex('email', 'email', { unique: true }); // Ensure email is unique
      store.createIndex('phone', 'phone', { unique: false });
    }
  },
});

// Function to add a user to the IndexedDB
export async function addUser(user) {
  try {
    const db = await dbPromise;
    return await db.add(STORE_NAME, user); // Returns the key of the new object
  } catch (error) {
    console.error('Failed to add user:', error);
    throw error; // Re-throw to handle it higher up if needed
  }
}

// Function to get all users from the IndexedDB
export async function getUsers() {
  try {
    const db = await dbPromise;
    return await db.getAll(STORE_NAME); // Returns an array of all user objects
  } catch (error) {
    console.error('Failed to retrieve users:', error);
    throw error;
  }
}