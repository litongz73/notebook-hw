import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DataService } from './service/data.service';
import { NoteComponent } from './components/note/note.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule],
  declarations: [AppComponent, MainComponent, NoteComponent],
  bootstrap: [AppComponent],
  providers: [
    DataService, // Add DataService as a provider
  ],
})
export class AppModule {}
