import { Component, Input, OnInit } from '@angular/core';

import { AppComponent } from './app.component'
import { Item } from './item';
import { ItemsService } from './items.service';

@Component({
  selector: 'app-comments',
  templateUrl: './app/comment.component.html'
})
export class CommentComponent {
  @Input() currentItem: Item;
  @Input() comments: Object[];

  constructor(private itemService: ItemsService) {
    this.comments = [];
    
    this.itemService.commentsObservable.subscribe(comments => {
      this.comments = comments;
    });
  };
}
