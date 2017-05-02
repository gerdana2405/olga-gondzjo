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
  itemName: string;
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
    this.localStorage.saveData('angularApp', this.items);
    console.log(this.localStorage.getData('angularApp'));
  };

  ngOnInit(): void {
    this.getItems();
  };

  ngDoCheck() {
    console.log('сhange');
    this.localStorage.saveData('angularApp', this.items);
  }

  addItem(): void {
    const searchItemByName = this.itemService.searchItemByName(this.itemName);

    if (searchItemByName) {
      this.currentItem = searchItemByName;
    } else {
      this.itemService.addItem(this.itemName);
      this.selectItem(this.items[this.items.length-1], this.currentItem);
    }

    this.itemName = '';
};

  selectItem(item: Item, currentItem: Item): void {
    this.currentItem = item;
    this.currentItemIndex = this.items.indexOf(this.currentItem) + 1;
    this.comments = this.currentItem.comments;
  };

  removeItem(item: Item): void {
    if (!item) {
      return;
    }

    this.items = this.items.filter(function (itemToFilterOut: Item) {
      return itemToFilterOut.id != item.id;
    });

    if (this.currentItem.id == item.id) {
      this.currentItem = undefined || this.items[0];
      this.currentItemIndex = this.items.indexOf(this.currentItem) + 1;
    }
  };
}
