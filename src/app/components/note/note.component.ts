import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Note } from '../../Interfaces/note';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  note_display?: Note;
  note_data?: Note;
  index: number = 0;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.index$.subscribe((index) => {
      this.index = index;
      if (index === this.dataService.getList().length) {
        this.note_data = {
          title: '',
          context: '',
        };
      } else {
        const list = this.dataService.getList();
        this.note_data = list[index];
      }

      this.note_display = structuredClone(this.note_data);
    });
    this.OnRevert();
  }

  OnRevert(): void {
    this.note_display = structuredClone(this.note_data);
  }

  OnSave(): void {
    const newdata = this.note_display;
    this.dataService.updateWithIndex(newdata, this.index);
    this.note_data = structuredClone(newdata);

    // console.log(this.note_data);
    // console.log(this.note_display);
  }
}
