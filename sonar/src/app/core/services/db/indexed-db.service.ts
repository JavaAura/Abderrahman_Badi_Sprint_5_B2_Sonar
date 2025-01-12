import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'MusicStreamDB';
  private readonly dbVersion = 1;

  constructor() { }

  async initialize(): Promise<void> {
    if (this.db) {
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = request.result;

        if (!db.objectStoreNames.contains('tracks')) {
          db.createObjectStore('tracks', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('playlists')) {
          db.createObjectStore('playlists', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('files')) {
          const store = db.createObjectStore('files', { keyPath: 'id' });
          store.createIndex('trackId', 'trackId');
          store.createIndex('active', 'active');
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log("IndexedDB initialized")
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error opening IndexedDB:', event);
        reject(request.error);
      };
    });
  }

  public getTransaction(storeName: string, mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) {
      throw new Error('IndexedDB is not initialized');
    }
    return this.db.transaction(storeName, mode).objectStore(storeName);
  }
}
