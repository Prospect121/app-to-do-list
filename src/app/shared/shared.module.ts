import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FindCategoryPipe } from './pipes/find-category/find-category.pipe';

@NgModule({
  declarations: [FindCategoryPipe],
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  providers: [],
  exports: [CommonModule, ReactiveFormsModule, IonicModule, FindCategoryPipe],
})
export class SharedModule {}
