import { Component, Input, OnInit, DoCheck } from '@angular/core';


import { AppComponent } from './app.component'
import { Item } from './item';
import { ItemsService } from './items.service';
import { LocalStorageService } from './localStorage.service';

@Component({
    selector: 'app-items',
    templateUrl: './app/itemsList.component.html',
    providers: [ItemsService, LocalStorageService]
})
export class ItemsListComponent {
  currentItem: Item;
  currentItemIndex: number;
  comments: Array<Object>;
  items: Item[];

  constructor(private itemService: ItemsService) {
    this.items = [];

    this.itemService.itemsObservable.subscribe(items => this.items = items);
    this.itemService.currentItemObservable.subscribe(({ item, index }) => {
      this.currentItem = item;
      this.currentItemIndex = index;
    });
  };

  isItemActive(item: Item): boolean {
    if (!item || !this.currentItem) {
      return false;
    }

    if (this.currentItem.id === item.id) {
      return true;
    }

    return false;
  }

  onRemove(item: Item) {
    this.itemService.removeItem(item);
  }

  selectItem(item: Item): void {
    this.itemService.selectItem(item);
  };
}
