import { Component, Input, OnInit, DoCheck } from '@angular/core';


import { AppComponent } from './app.component'
import { Item } from './item';
import { ItemsService } from './items.service';
import { LocalStorageService } from './localStorage.service';

@Component({
  selector: 'app-items',
  templateUrl: './app/item.component.html',
  providers: [ ItemsService, LocalStorageService ]
})
export class ItemComponent {
  currentItem: Item;
  currentItemIndex: number;
  comments: Array<Object>;
  items: Item[];

  constructor(private itemService: ItemsService, private localStorage: LocalStorageService ) { };

  getItems(): void {
    this.items = this.itemService.getItems();

    if(!this.currentItem) {
      this.currentItem = this.items[0] || undefined;
    }
  };


  ngOnInit(): void {
    this.getItems();
  };

  selectItem(item: Item, currentItem: Item): void {
    this.currentItem = item;
    this.currentItemIndex = this.items.indexOf(this.currentItem) + 1;
  };

  removeItem(item: Item): void {
    if (this.currentItem.id == item.id) {
      this.currentItem = undefined || this.items[0];
      this.currentItemIndex = this.items.indexOf(this.currentItem) + 1;
    }

    this.itemService.removeItem(item);
  };
}
