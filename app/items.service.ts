import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


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

 private itemSubject = new Subject<any>();
 itemObservable = this.itemSubject.asObservable();

 public commentSubject = new Subject<any>();
 commentObservable = this.commentSubject.asObservable();
 

  constructor(private localStorage: LocalStorageService ) { 
    this.items = this.localStorage.getData('angularApp') || [];
  };

  getItems(): Item[] {
    return this.items;
  };
 
  searchItemByName(name: string): Item {
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
    this.itemSubject.next(this.items);
  };

  removeItem(item: Item): void {
    if (!item) {
      return;
    }

    this.items = this.items.filter(function (itemToFilterOut: Item) {
      return itemToFilterOut.id != item.id;
    });

    this.localStorage.saveData('angularApp', this.items);
    this.itemSubject.next(this.items);
  };

  selectItem(item: Item, currentItem: Item): number {
    let currentItemIndex: number;

    if(this.items.length === 0) {
      currentItemIndex = undefined;
      this.commentSubject.next(item.comments);
    }

     currentItemIndex = this.items.indexOf(currentItem) + 1;
     this.commentSubject.next(item.comments);
     return currentItemIndex;
  };

  getComment(item: Item):  Array<Object> {
    if(!item) {
      return [];
    }
    return item.comments;
  };

  addNewComment(item: Item, comment: string): void{
    if (!item || !comment) {
      return;
    }

   this.items.find(function(element): boolean {
      if (element.name == item.name) {
        element.comments.push({
          id: generateCommentId(),
          content: comment
        });
        return true;
      }
    });

    this.localStorage.saveData('angularApp', this.items);
    this.commentSubject.next(item.comments);
  };
}
