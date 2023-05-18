import { Component, OnInit } from '@angular/core';
import { Note } from '../Interfaces/note';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  notes?: Note[];
  currentTitle = '';
  index = 0;
  constructor(private storage: DataService) {}

  ngOnInit(): void {
    this.storage.list$.subscribe((data) => {
      this.notes = data;
    });
  }

  AddNotes(): void {
    const currentIndex = this.storage.getList().length;
    this.storage.setCurrentIndex(currentIndex);
  }

  switchNote(index: number): void {
    this.storage.setCurrentIndex(index);
  }

  deleteNote(note: Note): void {
    this.storage.removeNote(note.title);
    const currentIndex = 0;
    this.storage.setCurrentIndex(0);
  }
}
