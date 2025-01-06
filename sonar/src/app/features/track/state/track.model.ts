import { MusicCategory } from "../../../core/enums/music-category.enum";

export interface Track {
  id: string;
  title: string;
  description: string;
  author: string;
  duration: number;
  category: MusicCategory;
  creationDate: Date;
}
