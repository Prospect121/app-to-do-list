import { Injectable } from '@angular/core';
import { ITask } from '../../interfaces/task';
import { AbstractDataService } from 'src/app/core/services/abstract-data/abstract-data.service';
import { Storage } from '@ionic/storage';
import { ISelectOption } from 'src/app/core/interfaces/select-option';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends AbstractDataService<ITask> {
  completes: ISelectOption[] = [
    { title: 'Completado', select: true, search: true },
    { title: 'No Completado', select: true, search: false },
  ];

  constructor(storage: Storage) {
    super(storage, 'task');
  }
}
