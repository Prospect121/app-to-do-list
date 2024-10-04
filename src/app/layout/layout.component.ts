import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { documentTextOutline, home, pricetagsOutline } from 'ionicons/icons';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class LayoutComponent implements OnInit {
  constructor() {
    addIcons({ home, documentTextOutline, pricetagsOutline });
  }

  ngOnInit() {}
}
