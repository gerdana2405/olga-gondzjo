import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

import { Item } from './item';
import { LocalStorageService } from './localStorage.service';

let generateId = function (prefix: string) {
  return prefix + Math.floor(Math.random() * 100000);
};

let generateItemId = function () {
  return generateId('item_');
};

let generateCommentId = function () {
  return generateId('comment_');
};

@Injectable()
export class ItemsService {
  items: Item[];

    constructor(private localStorage: LocalStorageService ) { 
    this.items = this.localStorage.getData('angularApp') || [];
  };

    private ItemsSubject = new Subject<any>();
    ItemObservable = this.ItemsSubject.asObservable();

  getItems(): Item[] {
    return this.items;
  };

  displayItem(item: Item): void {
    this.ItemsSubject.next(item);
  }

  searchItemByName(name: string): Item{
    return this.items.find(function(element): boolean {
      if (element.name == name) {
        return true;
      }
    })
  };

  addItem(name: string): void {   
    if (!name) {
      return
    };

    this.items.push({
      name: name,
      id: generateItemId(),
      comments: []
    });

    this.localStorage.saveData('angularApp', this.items);
  };

  removeItem(item: Item): void {
    if (!item) {
      return;
    }

    this.items = this. items.filter(function (itemToFilterOut: Item) {
      return itemToFilterOut.id != item.id;
    });

    this.localStorage.saveData('angularApp', this.items);
  };

  addNewComment(item: Item, comment: string): void{
    if (!item || !comment) {
      return;
    }

    item.comments.push({
      id: generateCommentId(),
      content: comment
    });

    this.localStorage.saveData('angularApp', this.items);
  };
}
