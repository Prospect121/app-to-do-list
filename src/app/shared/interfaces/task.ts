import { ICategory } from './category';

export interface ITask {
  id: number;
  name: string;
  complete: boolean;
  description: string;
  categoryId: number;
}
