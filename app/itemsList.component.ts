import { Component, Input, OnInit, DoCheck } from '@angular/core';


import { AppComponent } from './app.component'
import { Item } from './item';
import { ItemsService } from './items.service';
import { LocalStorageService } from './localStorage.service';

@Component({
  selector: 'app-items',
  templateUrl: './app/itemsList.component.html',
  providers: [ ItemsService, LocalStorageService ]
})
export class ItemsListComponent {
  currentItem: Item;
  currentItemIndex: number;
  comments: Array<Object>;
  items: Item[];

  constructor(private itemService: ItemsService, private localStorage: LocalStorageService ) { 
    this.itemService.itemObservable.subscribe(item => {
      console.log(item);
    });
  };

  getItems(): void {
    this.items = this.itemService.getItems();

    console.log(this.items);

    if(!this.currentItem) {
      this.currentItem = this.items[0] || undefined;
    }

    this.selectItem(this.currentItem);
  };

  selectItem(item: Item): void {
      this.currentItem = item;
      this.currentItemIndex = this.items.indexOf(this.currentItem) + 1;
  };

  ngOnInit(): void {
    this.getItems();
  };

 // ngDoCheck(): void {
  //   this.items = this.itemService.getItems();
 // }
}
