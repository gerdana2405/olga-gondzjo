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
    id: string;
    currentItem: Item;
    currentItemIndex: number;
    comments: Array<Object>;
    subscription: Subscription;
    items: Item[];

    constructor(private itemService: ItemsService) { 
      this.itemService.itemObservable.subscribe(item => {
        console.log('remove' + item);
      });
    };

    removeItem(item: Item): void {
       this.itemService.removeItem(item);
    };  
}