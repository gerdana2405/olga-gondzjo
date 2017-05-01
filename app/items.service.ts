import { Injectable } from '@angular/core';

import { Item } from './item';
import { ITEMS, generateItemId, generateCommentId } from './items.storage';

@Injectable()
export class ItemsService {
  getItems(): Item[] {
    return ITEMS;
  };

  searchItemByName(name: string) {
    return ITEMS.find(function(element: Item) {
      if (element.name == name) {
        return element;
      }
    })
  };

  addItem(name: string): void {
    if (!name) {
      return
    };

    ITEMS.push({
      name: name,
      id: generateItemId(),
      comments: []
    })
  };

  addNewComment(item: Item, comment: string) {
    if (!item || !comment) {
      return;
    }

    item.comments.push({
      id: generateCommentId(),
      content: comment
    });
  };
}
