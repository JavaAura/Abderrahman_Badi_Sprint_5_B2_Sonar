import { Injectable } from '@angular/core';
import { IndexedDbService } from '../../../core/services/db/indexed-db.service';
import { Track } from '../state/track.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private readonly storeName = 'tracks';

  constructor(private db: IndexedDbService) { }


  async addTrack(track: Track): Promise<Track> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      const store = this.db.getTransaction(this.storeName, 'readwrite');
      const request = store.add(track);

      request.onsuccess = () => resolve(track);
      request.onerror = (event) => {
        console.error('Error creating track:', request.error);
        reject(request.error);
      };
    });
  }

  async getTrackById(id: string): Promise<Track | null> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      const store = this.db.getTransaction(this.storeName, 'readonly');
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = (event) => {
        console.error('Error retrieving track:', request.error);
        reject(request.error);
      };
    });
  }

  async getAllTracks(): Promise<Track[]> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      const store = this.db.getTransaction(this.storeName, 'readonly');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => {
        console.error('Error retrieving all tracks:', request.error);
        reject(request.error);
      };
    });
  }

  async updateTrack(track: Track): Promise<Track> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      const store = this.db.getTransaction(this.storeName, 'readwrite');
      const request = store.put(track);

      request.onsuccess = () => resolve(track);
      request.onerror = (event) => {
        console.error('Error updating track:', request.error);
        reject(request.error);
      };
    });
  }

  async deleteTrackById(id: string): Promise<string> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      const store = this.db.getTransaction(this.storeName, 'readwrite');
      const request = store.delete(id);

      request.onsuccess = () => resolve(id);
      request.onerror = (event) => {
        console.error('Error deleting track:', request.error);
        reject(request.error);
      };
    });
  }

}
