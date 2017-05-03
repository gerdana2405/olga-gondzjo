import { Component, Input, OnDestroy } from "@angular/core";
import { Subscription }   from 'rxjs/Subscription';

import { Item } from './item';
import { ItemsService } from './items.service';

@Component({
  selector: "item",
  templateUrl: "./app/item.component.html"
})
export class ItemComponent {
    @Input() item: Item;
    name: string;
    selected = false;
    id: string;
    currentItem: Item;
    currentItemIndex: number;
    comments: Array<Object>;
    subscription: Subscription;
    items: Item[];

    constructor(private itemService: ItemsService) {
        this.subscription = itemService.ItemObservable.subscribe(() => {
            this.name = this.item.name;
            this.comments = this.item.comments;
            this.items = itemService.getItems();
        });
     };

    removeItem(item: Item): void {
        if (this.currentItem.id == item.id) {
            this.currentItem = undefined || this.items[0];
            this.currentItemIndex = this.items.indexOf(this.currentItem) + 1;
        }

        if (!item) {
            return;
        }

        this.items = this. items.filter(function (itemToFilterOut: Item) {
            return itemToFilterOut.id != item.id;
        });

        this.localStorage.saveData('angularApp', this.items);
  };  
    
    ngOnDestroy() { // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
  };
}