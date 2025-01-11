import { Injectable } from '@angular/core';
import { IndexedDbService } from '../../../core/services/db/indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private db: IndexedDbService) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.db.initialize();
    } catch (error) {
      console.error('Error initializing IndexedDB:', error);
    }
  }

  


}
