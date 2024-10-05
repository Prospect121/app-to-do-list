import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FireBaseRemoteConfigService } from './core/services/fire-base-remote-config/fire-base-remote-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _storage: Storage,
    private readonly _fireBaseRemoteConfigService: FireBaseRemoteConfigService
  ) {}

  async ngOnInit(): Promise<void> {
    await this._storage.create();
    await this._fireBaseRemoteConfigService.fetchAndActivate();
  }
}
