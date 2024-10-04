import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ISelectOption } from 'src/app/core/interfaces/select-option';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.scss'],
})
export class FilterCategoryComponent implements OnInit {
  tagsStatus: ISelectOption[] = [];

  constructor(
    private readonly _modalCtrl: ModalController,
    private readonly _categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.tagsStatus = this._categoryService.tagsStatus;
  }

  onSelect(index: number): void {
    this.tagsStatus[index].select = !this.tagsStatus[index].select;
  }

  onFilter(): void {
    const tags = this.tagsStatus
      .filter(tag => tag.select)
      .map(tag => tag.search);
    this._modalCtrl.dismiss({ status: tags });
  }
}
