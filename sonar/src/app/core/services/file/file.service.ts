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

  constructor(private db: IndexedDbService) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.db.initialize();
    } catch (error) {
      console.error('Error initializing IndexedDB:', error);
    }
  }

  async storeFiles(trackFile: File, coverFile: File | null, trackId: string): Promise<boolean> {
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
        const store = this.db.getTransaction('files', 'readwrite');
        const request = store.add(fileData);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(false);
      } catch (error) {
        reject(false);
      }
    });
  }

  async getAllFiles(): Promise<StoredFile[]> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction('files', 'readonly');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getFile(fileId: string): Promise<StoredFile | null> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction('files', 'readonly');
        const request = store.get(fileId);

        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteFile(fileId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const store = this.db.getTransaction('files', 'readwrite');
        const request = store.delete(fileId);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(false);
      } catch (error) {
        reject(false);
      }
    });
  }

}
