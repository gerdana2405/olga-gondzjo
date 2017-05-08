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
        this.itemService.itemObservable.subscribe(item => this.items = item);
        this.itemService.currentItemObservable.subscribe(current => {
            this.currentItem = current;
            this.currentItemIndex = this.itemService.selectItem(this.currentItem, this.currentItem)
        });
    };

    getItems(): void {
        this.items = this.itemService.getItems();

        console.log(this.items);

        if (!this.currentItem) {
            this.currentItem = this.items[0] || undefined;
        }
    };

    selectItem(item: Item): void {
        this.currentItem = item || this.items[0];

        if (this.currentItem) {
            this.currentItemIndex = this.itemService.selectItem(item, this.currentItem)
        }

        this.itemService.currentItemSubject.next(this.currentItem);
    };

  ngOnInit(): void {
    this.getItems();
  };
}
