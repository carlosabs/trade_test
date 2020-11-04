import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { UserComponent } from './user/user.component';
import {HttpClientModule} from '@angular/common/http';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropDownEditor } from './user/drop.down.editor';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    DropDownEditor 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AgGridModule.withComponents([DropDownEditor]),
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
