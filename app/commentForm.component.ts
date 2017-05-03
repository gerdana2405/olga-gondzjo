import { Component } from '@angular/core';

import { AppComponent } from './app.component'
import { Item } from './item';
import { ItemsService } from './items.service';
import { LocalStorageService } from './localStorage.service';

@Component({
  selector: 'comment-form',
  templateUrl: './app/commentForm.component.html',
  providers: [ ItemsService ]
})
export class CommentFormComponent {
  newComment: string;
  currentItem: Item;

  constructor(private itemService: ItemsService) { };

  addComment(): void {
    this.itemService.addNewComment(this.currentItem, this.newComment);
    this.newComment = '';
  };
}
