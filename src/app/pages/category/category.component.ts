import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ModalController } from '@ionic/angular';
import { FormCategoryComponent } from './components/form-category/form-category.component';
import { addIcons } from 'ionicons';
import { add, trash, createOutline, filterOutline } from 'ionicons/icons';
import { FilterCategoryComponent } from './components/filter-category/filter-category.component';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { ITask } from 'src/app/shared/interfaces/task';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  categories: ICategory[] = [];
  messageAlert: string = '';
  isAlertOpen: boolean = false;

  private _tasks: ITask[] = [];

  constructor(
    private readonly _categoryService: CategoryService,
    private readonly _taskService: TaskService,
    private readonly _modalCtrl: ModalController
  ) {
    addIcons({ add, filterOutline, createOutline, trash });
  }

  async ngOnInit(): Promise<void> {
    await this._getAll();
  }

  async onEdit(category: ICategory): Promise<void> {
    await this.onOpenFormModal(category);
  }

  async onChangeStatus(category: ICategory): Promise<void> {
    category.status = !category.status;
    await this._updated(category);
  }

  async onRemove(id: number): Promise<void> {
    this._tasks = await this._taskService.filterByFields({ categoryId: [id] });

    if (this._tasks?.length) {
      this.messageAlert = this._tasks.map(task => task.name).join(', ');
      this.isAlertOpen = true;
      return;
    }

    await this._remove(id);
  }

  async onOpenFormModal(category?: ICategory): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: FormCategoryComponent,
      componentProps: { category },
      breakpoints: [0.8],
      initialBreakpoint: 0.8,
      backdropBreakpoint: 0.5,
      handle: false,
      showBackdrop: true,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.id != null && !isNaN(data?.id)) {
      await this._updated(data);
      return;
    }

    if (!!data?.name) {
      delete data.id;
      await this._addCategory(data);
    }
  }

  async onOpenFilterModal(): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: FilterCategoryComponent,
      breakpoints: [0.5],
      initialBreakpoint: 0.5,
      backdropBreakpoint: 0.5,
      handle: false,
      showBackdrop: true,
    });
    modal.present();

    const { data } = await modal.onWillDismiss();

    if (data?.status?.length) {
      this.categories = await this._categoryService.filterByFields({ ...data });
    }
  }

  async searchInput(event: HTMLIonSearchbarElement): Promise<void> {
    const query = event?.value?.toLowerCase();
    if (!query?.trim()) {
      return await this._getAll();
    }

    this.categories = await this._categoryService.filterItem(query);
  }

  private async _getAll(): Promise<void> {
    this.categories = await this._categoryService.getAll();
  }

  private async _addCategory(category: ICategory): Promise<void> {
    await this._categoryService.add(category);
    await this._getAll();
  }

  private async _updated(category: ICategory): Promise<void> {
    await this._categoryService.update(category.id, category);
    await this._getAll();
  }

  private async _remove(id: number): Promise<void> {
    await this._categoryService.delete(id);
    await this._getAll();
  }
}
