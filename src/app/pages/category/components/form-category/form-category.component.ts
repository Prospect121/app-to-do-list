import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ICategory } from 'src/app/shared/interfaces/category';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.scss'],
})
export class FormCategoryComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({});
  @Input('category') category?: ICategory;

  constructor(private readonly _modalCtrl: ModalController) {}

  ngOnInit() {
    this._loadForm();
    this._loadDataForm();
  }

  onSaveCategory(): void {
    if (this.categoryForm.invalid) return;
    const catgoryValue = this.categoryForm.getRawValue();
    this._modalCtrl.dismiss({ ...catgoryValue });
  }

  onCloseForm(): void {
    this._modalCtrl.dismiss();
  }

  private _loadDataForm(): void {
    if (this.category?.id) {
      this.categoryForm.patchValue(this.category);
    }
  }

  private _loadForm(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      status: new FormControl(true, Validators.required),
      id: new FormControl(null),
    });
  }
}
