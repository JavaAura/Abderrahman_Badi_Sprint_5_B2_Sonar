import { Injectable } from '@angular/core';
import { IndexedDbService } from '../db/indexed-db.service';
import { FileType } from '../../enums/file-type.enum';

export interface StoredFile {
  id: string;
  file: Blob;
  type: FileType;
  name: string;
  trackId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly storeName = 'files';

  constructor(private db: IndexedDbService) { }


  async storeFiles(trackFile: File, coverFile: File | null, trackId: string): Promise<boolean> {
    await this.db.initialize();
    try {
      const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36)}`;

      // Store track file
      await this.storeFile({
        id: generateId("audio"),
        file: trackFile,
        type: FileType.AUDIO,
        name: trackFile.name,
        trackId: trackId
      });

      // Store cover file if it exists
      if (coverFile) {
        await this.storeFile({
          id: generateId("cover"),
          file: coverFile,
          type: FileType.COVER,
          name: coverFile.name,
          trackId: trackId
        });
      }

      return true;
    } catch (error) {
      console.error('Error storing files:', error);
      return false;
    }
  }

  private async storeFile(fileData: StoredFile): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction(this.storeName, 'readwrite');
        const request = store.add(fileData);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(false);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getAllFiles(): Promise<StoredFile[]> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction(this.storeName, 'readonly');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getFile(fileId: string): Promise<StoredFile | null> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction(this.storeName, 'readonly');
        const request = store.get(fileId);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteFile(fileId: string): Promise<boolean> {
    await this.db.initialize();
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction(this.storeName, 'readwrite');
        const request = store.delete(fileId);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(false);
      } catch (error) {
        reject(error);
      }
    });
  }

}
