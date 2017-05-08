import { Component } from '@angular/core';

import { AppComponent } from './app.component'
import { Item } from './item';
import { ItemsService } from './items.service';
import { LocalStorageService } from './localStorage.service';

@Component({
  selector: 'item-form',
  templateUrl: './app/itemForm.component.html'
})
export class ItemFormComponent {
  itemName: string;
  currentItem: Item;
  
  constructor(private itemService: ItemsService) { 
      this.itemService.itemObservable.subscribe();
  };

  addItem(): void {
    let searchItemByName = this.itemService.searchItemByName(this.itemName);

    if (searchItemByName) {
        this.currentItem = searchItemByName;
        this.itemService.currentItemSubject.next(this.currentItem);
    } else {
        this.itemService.addItem(this.itemName);
        this.itemService.currentItemSubject.next(this.itemService.searchItemByName(this.itemName));
    }
    
    this.itemName = '';
  };
}
