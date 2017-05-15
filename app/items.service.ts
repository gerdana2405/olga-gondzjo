import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

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

interface CurrentItemEvent {
  item: Item // currentItem
  index: number // currentItem index in items
}

@Injectable()
export class ItemsService {
  items: Item[];
  currentItem: Item;

  private itemsSubject: BehaviorSubject<Item[]>;
  itemsObservable: Observable<Item[]>;

  private commentsSubject: BehaviorSubject<any[]>;
  commentsObservable: Observable<any[]>;

  private currentItemSubject: BehaviorSubject<CurrentItemEvent>;
  currentItemObservable: Observable<CurrentItemEvent>;

  constructor(private localStorage: LocalStorageService ) { 
    this.items = this.localStorage.getData('angularApp') || [];

    this.itemsSubject = new BehaviorSubject<Item[]>(this.items);
    this.itemsObservable = this.itemsSubject.asObservable();

    this.commentsSubject = new BehaviorSubject<any[]>([]);
    this.commentsObservable = this.commentsSubject.asObservable();

    this.currentItemSubject = new BehaviorSubject<CurrentItemEvent>({item: undefined, index: undefined});
    this.currentItemObservable = this.currentItemSubject.asObservable();

    this.currentItemObservable.subscribe((currentItemEvent) => {
      this.currentItem = currentItemEvent.item;

      if (currentItemEvent.item) {
        this.commentsSubject.next(currentItemEvent.item.comments);
      } else {
        this.commentsSubject.next([]);
      }
    });

    this.selectItem(this.items[0]);
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

    this.saveToLocalStore();
    this.itemsSubject.next(this.items);

    if (!this.currentItem) {
      this.selectItem(this.items[0]);
    }
  };

  removeItem(item: Item): void {
    if (!item) {
      return;
    }

    this.items = this.items.filter(function (itemToFilterOut: Item) {
      return itemToFilterOut.id != item.id;
    });

    this.saveToLocalStore();
    this.itemsSubject.next(this.items);

    if (this.currentItem && this.currentItem.id === item.id) {
      this.selectItem(this.items[0]);
    }
  };

  selectItem(currentItem: Item): number {
    if (!currentItem || this.items.length === 0) {
      this.currentItemSubject.next({
        item: undefined,
        index: undefined
      });
      return;
    }

    this.currentItemSubject.next({
      item: currentItem,
      index: this.items.indexOf(currentItem) + 1
    });
  };

  addCommentToCurrentItem(comment: string) {
    this.addNewComment(this.currentItem, comment);
  }

  addNewComment(item: Item, comment: string): void {
    if (!item || !comment) {
      return;
    }

    item.comments.push({
      id: generateCommentId(),
      content: comment
    });
    
    this.saveToLocalStore();
    this.commentsSubject.next(item.comments);
  };

  private saveToLocalStore() {
    this.localStorage.saveData('angularApp', this.items);
  }
}
