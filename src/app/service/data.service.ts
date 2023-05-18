import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../Interfaces/note';

@Injectable()
export class DataService implements OnInit, OnDestroy {
  // private listSubject$ = new BehaviorSubject<Note[]>([]);
  private data;
  private listSubject$;
  private indexSubject$;
  list$;
  index$;

  constructor() {
    this.data = JSON.parse(localStorage.getItem('data'));

    this.listSubject$ = new BehaviorSubject<Note[]>(this.data);
    this.indexSubject$ = new BehaviorSubject<number>(0);
    this.list$ = this.listSubject$.asObservable();
    this.index$ = this.indexSubject$.asObservable();
  }

  ngOnInit(): void {}

  getList(): Note[] {
    return this.listSubject$.value;
  }

  addNote(note: Note): void {
    this.listSubject$.next([...this.getList(), note]);
  }

  removeNote(title: string): void {
    const value: Note[] = this.getList().filter((note: Note) => {
      return note.title !== title;
    });

    console.log(value);
    this.listSubject$.next(value);
  }
  updateWithIndex(note: Note, index: number): void {
    const myList: Note[] = this.getList();

    if (index === myList.length) {
      this.listSubject$.next([...myList, note]);
    } else {
      let currentIndex = 0;
      myList.forEach((item, i) => {
        if (currentIndex === index) {
          myList[i] = note;
        }
        currentIndex++;
      });
      this.listSubject$.next(myList);
    }
    console.log(this.listSubject$.value);
  }

  getDataWithIndex(index: number): any {
    const myList: Note[] = this.getList();
    console.log(myList);
    myList.forEach((item, ind) => {
      if (ind === index) {
        console.log(item);
        return item;
      }
    });
  }

  getCurrentIndex(): number {
    return this.indexSubject$.value;
  }

  setCurrentIndex(i: number): void {
    console.log('in service');
    this.indexSubject$.next(i);
  }

  ngOnDestroy(): void {
    localStorage.setItem('data', JSON.stringify(this.data));
  }
}
