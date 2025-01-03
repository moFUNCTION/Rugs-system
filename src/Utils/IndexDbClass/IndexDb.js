export class IndexedDB {
  constructor(dbName, version = 1) {
    this.dbName = dbName;
    this.version = version;
  }

  // Open or create the database
  openDatabase(storeConfigs) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        storeConfigs.forEach(({ storeName, options, indexes }) => {
          if (!db.objectStoreNames.contains(storeName)) {
            const objectStore = db.createObjectStore(
              storeName,
              options || { keyPath: "id", autoIncrement: true }
            );
            if (indexes) {
              indexes.forEach(({ name, keyPath, options }) =>
                objectStore.createIndex(name, keyPath, options)
              );
            }
          }
        });
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Add or update an item in a store
  save(storeName, item) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.put(item);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }

  // Fetch all items from a store
  getAll(storeName) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }

  // Fetch a single item by key
  get(storeName, key) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.get(key);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }

  // Delete an item by key
  delete(storeName, key) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.delete(key);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }

  // Clear all items in a store
  clear(storeName) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(storeName, "readwrite");
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }

  // Count all items in a store
  count(storeName) {
    return new Promise((resolve, reject) => {
      this.openDatabase().then((db) => {
        const transaction = db.transaction(storeName, "readonly");
        const store = transaction.objectStore(storeName);
        const request = store.count();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    });
  }
}
