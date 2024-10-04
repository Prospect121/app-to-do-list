import { Injectable } from '@angular/core';
import {
  fetchAndActivate,
  getBooleanChanges,
  RemoteConfig,
} from '@angular/fire/remote-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FireBaseRemoteConfigService {
  constructor(private readonly _remoteConfig: RemoteConfig) {
    this._initRemoteConfig();
  }

  get hideActions(): Observable<boolean> {
    return getBooleanChanges(this._remoteConfig, 'hide_actions');
  }

  async fetchAndActivate(): Promise<boolean> {
    return await fetchAndActivate(this._remoteConfig);
  }

  private _initRemoteConfig() {
    this._remoteConfig.defaultConfig = {
      hide_actions: true,
    };

    this._remoteConfig.settings.minimumFetchIntervalMillis = 1000;
  }
}
