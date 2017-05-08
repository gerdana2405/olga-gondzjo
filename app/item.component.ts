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
       this.itemService.currentItemObservable.subscribe();
   };

   removeItem(item: Item): void {
       this.itemService.removeItem(item);
       this.currentItem = this.items[0] || undefined;
       this.itemService.selectItem(this.currentItem, this.currentItem);
       this.itemService.currentItemSubject.next(this.currentItem);
   };  
}