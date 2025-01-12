import { Injectable } from '@angular/core';
import { IndexedDbService } from '../../../core/services/db/indexed-db.service';
import { Track } from '../state/track.model';
import { Update } from '@ngrx/entity';

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

  async updateTrack(update: Update<Track>): Promise<Update<Track>> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      const store = this.db.getTransaction(this.storeName, 'readwrite');
  
      const request = store.get(update.id);
  
      request.onsuccess = () => {
        const existingTrack = request.result;
        console.log(existingTrack);
        
        if (existingTrack) {
          const updatedTrack = { ...existingTrack, ...update.changes };
  
          const putRequest = store.put(updatedTrack);

          putRequest.onsuccess = () => {
            resolve({
              id: updatedTrack.id,   
              changes: updatedTrack
            });
          };
          putRequest.onerror = (error) => {
            console.error('Error updating track:', error);
            reject(error);
          };
        } else {
          reject(new Error('Track not found'));
        }
      };
  
      request.onerror = (error) => {
        console.error('Error retrieving track for update:', error);
        reject(error);
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
