import { Component, inject, OnInit, signal } from '@angular/core';

import {
  StoragesManager,
  addValue2Storage
} from "@beexy/tools"

import { ModalWindowHostComponent } from "@beexy/ngx-modals"

import {
  ViewAppComponent,
  ErrorAppComponent
} from "./views"

import {
  AppData
} from "./enums"

import {
  DATA_PATH,
  DATA_KEY,
  loadData
} from "./utils"


@Component({
  selector: 'app-root',
  imports: [ViewAppComponent, ErrorAppComponent, ModalWindowHostComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Quiz Game';

  private storage = inject(StoragesManager);

  dataErrorLoading = signal<boolean>(true);

  constructor() { }

  ngOnInit(): void {

    this.loadData(DATA_PATH);

    console.log(this.storage);
  }

  protected async loadData(path: string) {

    const response = await loadData(path);

    if (response.fail) {
      this.dataErrorLoading.set(true);
      return;
    }

    if (this.StorageDataApp(response.originalData)) {
      this.dataErrorLoading.set(false);
      return;
    }
  }

  protected StorageDataApp(data: Object): boolean {

    // TODO: On this process an checker/adaptor function must be applied to assure
    // data injected on App has the Interface that App is expecting
    const data2Storage: AppData = data as AppData;

    addValue2Storage<AppData>(this.storage, DATA_KEY, data2Storage);

    return true;
  }
}
