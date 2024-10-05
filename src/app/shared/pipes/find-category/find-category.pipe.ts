import { Pipe, PipeTransform } from '@angular/core';
import { ICategory } from '../../interfaces/category';

@Pipe({
  name: 'findCategory',
})
export class FindCategoryPipe implements PipeTransform {
  transform(id: number, data: ICategory[]): ICategory | undefined {
    return data.find(category => category.id == id);
  }
}
