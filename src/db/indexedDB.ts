import { openDB } from 'idb';
export const getDB = () => openDB('pot-awlq-db', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('projects')) {
      db.createObjectStore('projects', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('skills')) {
      db.createObjectStore('skills', { keyPath: 'id' });
    }
  },
});
