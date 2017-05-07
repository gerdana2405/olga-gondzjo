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
  @Input() currentItem: Item;

  constructor(private itemService: ItemsService) { 
    this.itemService.commentObservable.subscribe();
  };

  addComment(): void {
    this.itemService.addNewComment(this.currentItem, this.newComment);
    this.newComment = '';
  };
}
