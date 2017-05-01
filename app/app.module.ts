import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ItemComponent }  from './item.component';
import { ItemsService } from './items.service';
import { CommentComponent } from './comment.component'

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ItemComponent, CommentComponent],
  providers: [ AppComponent, ItemsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
