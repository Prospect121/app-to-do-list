import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITask } from 'src/app/shared/interfaces/task';
import { ModalController } from '@ionic/angular';
import { ICategory } from 'src/app/shared/interfaces/category';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss'],
})
export class FormTaskComponent implements OnInit {
  taskForm: FormGroup = new FormGroup({});

  @Input('task') task?: ITask;
  @Input('categories') categories: ICategory[] = [];

  constructor(private readonly _modalCtrl: ModalController) {}

  ngOnInit() {
    this._loadForm();
    this._loadDataForm();
  }

  onSaveCategory(): void {
    if (this.taskForm.invalid) return;
    const taskValue = this.taskForm.getRawValue();
    this._modalCtrl.dismiss({ ...taskValue });
  }

  onCloseForm(): void {
    this._modalCtrl.dismiss();
  }

  private _loadDataForm(): void {
    if (this.task?.id) {
      this.taskForm.patchValue(this.task);
    }
  }

  private _loadForm(): void {
    this.taskForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      complete: new FormControl(false, Validators.required),
      id: new FormControl(null),
    });
  }
}
