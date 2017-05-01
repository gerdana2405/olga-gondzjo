import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { AppComponent } from './app.component'
import { Item } from './item';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-items',
  templateUrl: './app/item.component.html',
  providers: [ ItemsService ]
})
export class ItemComponent {
  itemName: string;
  currentItem: Item;
  currentItemIndex: number = -1;
  items: Item[];

  constructor(private itemService: ItemsService) { };

  getItems(): void {
    this.items = this.itemService.getItems();
    if(!this.currentItem) {
      this.currentItem = this.items[0] || {};
    }
    console.log(this.items);
  };

  ngOnInit(): void {
    this.getItems();
  };

  ngOnChanges() {
    global.localStorage.setItem("testingApp", JSON.stringify(this.items));
    console.log(global.JSON.parse(localStorage.getItem('testingApp')));
  };

  addItem(): void {
    const searchItemByName = this.itemService.searchItemByName(this.itemName);

    if (searchItemByName) {
      this.currentItem = searchItemByName;
    } else {
      this.itemService.addItem(this.itemName);
      this.selectItem(this.items[this.items.length-1]);
    }

    this.itemName = '';
};

  selectItem(item: Item): void {
    this.currentItem = item;
    this.currentItemIndex = this.items.indexOf(this.currentItem);
  };

  removeItem(item: Item): void {
    if (this.currentItem.id == item.id) {
      this.currentItem = undefined || this.items[0];
      this.currentItemIndex = -1 || this.items.indexOf(this.currentItem);
    }

    if (!item) {
      return;
    }

    this.items = this.items.filter(function (itemToFilterOut: Item) {
      return itemToFilterOut.id != item.id;
    });
  };
}
