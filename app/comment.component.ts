import { Component, Input, OnInit } from '@angular/core';

import { AppComponent } from './app.component'
import { Item } from './item';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-comments',
  templateUrl: './app/comment.component.html',
  providers: [ ItemsService ]
})
export class CommentComponent {
  @Input() currentItem: Item;
  @Input() comments: Array<Object>;

  newComment: string;

  constructor(private itemService: ItemsService) { };

  addComment(): void {
    this.itemService.addNewComment(this.currentItem, this.newComment);
    this.newComment = '';
  };
}
