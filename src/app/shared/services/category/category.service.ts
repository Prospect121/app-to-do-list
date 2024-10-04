import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AbstractDataService } from 'src/app/core/services/abstract-data/abstract-data.service';
import { ICategory } from '../../interfaces/category';
import { ISelectOption } from 'src/app/core/interfaces/select-option';

@Injectable()
export class CategoryService extends AbstractDataService<ICategory> {
  tagsStatus: ISelectOption[] = [
    { title: 'Activo', select: true, search: true },
    { title: 'Inactivo', select: true, search: false },
  ];
  categories: ISelectOption[] = [];

  constructor(storage: Storage) {
    super(storage, 'category');
  }
}
