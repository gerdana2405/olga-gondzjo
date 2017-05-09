import { Component, Input, EventEmitter, Output } from "@angular/core";
import { Subscription }   from 'rxjs/Subscription';

import { Item } from './item';
import { ItemsService } from './items.service';

@Component({
  selector: "item",
  templateUrl: "./app/item.component.html"
})
export class ItemComponent {
  @Input() item: Item;
  @Input() isActive: boolean;
  @Output() onRemove = new EventEmitter();

  removeItem() {
    this.onRemove.emit(this.item);
  };  
}