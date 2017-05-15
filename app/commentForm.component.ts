import { Component, Input } from '@angular/core';

import { AppComponent } from './app.component'
import { Item } from './item';
import { ItemsService } from './items.service';
import { LocalStorageService } from './localStorage.service';

@Component({
  selector: 'comment-form',
  templateUrl: './app/commentForm.component.html'
})
export class CommentFormComponent {
  newComment: string;

  constructor(private itemService: ItemsService) { 
  };

  addComment(): void {
    this.itemService.addCommentToCurrentItem(this.newComment);
    this.newComment = '';
  };
}
