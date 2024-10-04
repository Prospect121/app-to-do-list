import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { ISelectOption } from 'src/app/core/interfaces/select-option';

@Component({
  selector: 'app-filter-task',
  templateUrl: './filter-task.component.html',
  styleUrls: ['./filter-task.component.scss'],
})
export class FilterTaskComponent implements OnInit {
  categories: ISelectOption[] = [];
  completes: ISelectOption[] = [];

  constructor(
    private readonly _modalCtrl: ModalController,
    private readonly _categoryService: CategoryService,
    private readonly _taskService: TaskService
  ) {}

  ngOnInit() {
    this.categories = this._categoryService.categories;
    this.completes = this._taskService.completes;
  }

  onSelectCategory(index: number): void {
    this.categories[index].select = !this.categories[index].select;
  }

  onSelectComplete(index: number): void {
    this.completes[index].select = !this.completes[index].select;
  }

  onFilter(): void {
    const completes = this.completes
      .filter((tag) => tag.select)
      .map((tag) => tag.search);

    const categories = this.categories
      .filter((tag) => tag.select)
      .map((tag) => tag.search);

    const data = {
      complete: completes.length ? completes : [],
      categoryId: categories.length ? categories : [],
    };

    this._modalCtrl.dismiss(data);
  }
}
