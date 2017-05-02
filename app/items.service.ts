import { Injectable } from '@angular/core';

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

let items: Item[];

@Injectable()
export class ItemsService {

  constructor(private localStorage: LocalStorageService ) { };

  getItems(): Item[] {
    items = this.localStorage.getData('angularApp') || [];
    return items;
  };

  searchItemByName(name: string): Item{
    return items.find(function(element): boolean {
      if (element.name == name) {
        return true;
      }
    })
  };

  addItem(name: string): void {
    if (!name) {
      return
    };

    items.push({
      name: name,
      id: generateItemId(),
      comments: []
    })
  };

  addNewComment(item: Item, comment: string): void{
    if (!item || !comment) {
      return;
    }

    item.comments.push({
      id: generateCommentId(),
      content: comment
    });
  };
}
