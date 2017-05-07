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
  @Input() comments: Array<Object>;

  constructor(private itemService: ItemsService) { 
    this.itemService.commentObservable.subscribe(comments => {
      this.comments = comments;
    });
  };

  getComment(): void {
  if(!this.currentItem){
    this.comments = [];
  }
    this.comments = this.itemService.getComment(this.currentItem);
  };

  ngOnInit(): void {
    this.getComment();
  };
}
