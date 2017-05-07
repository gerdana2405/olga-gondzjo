import { Component, Input } from "@angular/core";
import { Subscription }   from 'rxjs/Subscription';

import { Item } from './item';
import { ItemsService } from './items.service';

@Component({
  selector: "item",
  templateUrl: "./app/item.component.html"
})
export class ItemComponent {
   @Input() item: Item;
   @Input() currentItem: Item;
   @Input() items: Item[];

   constructor(private itemService: ItemsService) { 
     this.itemService.itemObservable.subscribe();
   };

   removeItem(item: Item): void {
      this.itemService.removeItem(item);
   };  
}