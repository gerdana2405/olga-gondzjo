import { Injectable } from '@angular/core';

import { Item } from './item';

@Injectable()
export class LocalStorageService {
  saveData(itemName: string, data: Item[]): void {
    localStorage.setItem(itemName, JSON.stringify(data));
    console.log(localStorage.getItem(itemName));
  };

  getData(itemName: string): Item[] {
    return JSON.parse(localStorage.getItem(itemName));
  };

}
