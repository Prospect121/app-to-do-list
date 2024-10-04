import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/shared/services/task/task.service';
import { ModalController } from '@ionic/angular';
import { ITask } from 'src/app/shared/interfaces/task';
import { addIcons } from 'ionicons';
import { add, trash, createOutline, filterOutline } from 'ionicons/icons';
import { FormTaskComponent } from './component/form-task/form-task.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ICategory } from 'src/app/shared/interfaces/category';
import { FilterTaskComponent } from './component/filter-task/filter-task.component';
import { FireBaseRemoteConfigService } from 'src/app/core/services/fire-base-remote-config/fire-base-remote-config.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  tasks: ITask[] = [];
  categories: ICategory[] = [];
  isAlertOpen: boolean = false;

  hideActions$: Observable<boolean> = of(false);

  constructor(
    private readonly _taskService: TaskService,
    private readonly _modalCtrl: ModalController,
    private readonly _categoryService: CategoryService,
    private readonly _fireBaseRemoteConfigService: FireBaseRemoteConfigService
  ) {
    addIcons({ add, filterOutline, createOutline, trash });
  }

  async ngOnInit(): Promise<void> {
    await this._getAll();
    await this._getAllcategory();
    this.hideActions$ = this._fireBaseRemoteConfigService.hideActions;

    this._categoryService.categories = this.categories.map(category => ({
      title: category.name,
      select: true,
      search: category.id,
    }));
  }
  async onEdit(task: ITask): Promise<void> {
    await this.onOpenFormModal(task);
  }

  async onChangeStatus(task: ITask): Promise<void> {
    task.complete = !task.complete;
    await this._updated(task);
  }

  async onRemove(id: number): Promise<void> {
    await this._remove(id);
  }

  async onOpenFormModal(task?: ITask): Promise<void> {
    if (!this.categories?.length) {
      this.isAlertOpen = true;
      return;
    }

    const modal = await this._modalCtrl.create({
      component: FormTaskComponent,
      componentProps: { task, categories: this.categories },
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
      await this._add(data);
    }
  }

  async onOpenFilterModal(): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: FilterTaskComponent,
      breakpoints: [0.9],
      initialBreakpoint: 0.9,
      backdropBreakpoint: 0.5,
      handle: false,
      showBackdrop: true,
    });
    modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.complete?.length || data?.categoryId?.length) {
      this.tasks = await this._taskService.filterByFields({ ...data });
    }
  }

  async searchInput(event: HTMLIonSearchbarElement): Promise<void> {
    const query = event?.value?.toLowerCase();
    if (!query?.trim()) {
      return await this._getAll();
    }

    this.tasks = await this._taskService.filterItem(query);
  }

  private async _getAll(): Promise<void> {
    this.tasks = await this._taskService.getAll();
  }

  private async _add(task: ITask): Promise<void> {
    await this._taskService.add(task);
    await this._getAll();
  }

  private async _updated(task: ITask): Promise<void> {
    await this._taskService.update(task.id, task);
    await this._getAll();
  }

  private async _remove(id: number): Promise<void> {
    await this._taskService.delete(id);
    await this._getAll();
  }

  private async _getAllcategory(): Promise<void> {
    this.categories = await this._categoryService.getAll();
  }
}
