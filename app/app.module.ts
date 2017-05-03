import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { ItemsListComponent }  from './itemsList.component';
import { ItemFormComponent }  from './itemForm.component';
import { ItemComponent }  from './item.component';
import { ItemsService } from './items.service';
import { CommentComponent } from './comment.component';
import { CommentFormComponent } from './commentForm.component';
import { LocalStorageService } from './localStorage.service';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ItemsListComponent, CommentComponent, ItemFormComponent, CommentFormComponent, ItemComponent],
  providers: [ AppComponent, ItemsService, LocalStorageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
