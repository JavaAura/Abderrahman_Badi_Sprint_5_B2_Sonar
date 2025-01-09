import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db: IDBDatabase | null = null;
  private readonly dbName = 'MusicStreamDB';
  private readonly dbVersion = 1;

  constructor() {}

  async initialize(): Promise<void> {
    if (this.db) {
      return;
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = request.result;

        if (!db.objectStoreNames.contains('tracks')) {
          db.createObjectStore('tracks', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('playlists')) {
          db.createObjectStore('playlists', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('files')) {
          db.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
        }
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = (event) => {
        console.error('Error opening IndexedDB:', event);
        reject(request.error);
      };
    });
  }

  private getTransaction(storeName: string, mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) {
      throw new Error('IndexedDB is not initialized');
    }
    return this.db.transaction(storeName, mode).objectStore(storeName);
  }
}
