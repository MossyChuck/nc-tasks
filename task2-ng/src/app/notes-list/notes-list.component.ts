import { Component, OnInit } from '@angular/core';
import { NotesService } from "../notes.service";
import { Note } from "../notes-model/Note";


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.sass']
})
export class NotesListComponent implements OnInit {

  notes: Note[] = [];
  isAdding: boolean = false;
  newNote: Note = new Note();
  filteredNotes: Note[] = [];
  tagFilter: string = '';

  constructor(private notesService: NotesService) {
  }

  getNotes(): void {
    this.notesService.getNotes().subscribe((notes: Note[]) => {
      this.notes = notes;
      this.filter();
    })
  }

  checkTags(): void {
    let startIndex: number = 0;
    this.newNote.tags = [];
    while (1) {
      let start: number = this.newNote.text.indexOf('#', startIndex);
      if (start === -1) {
        return;
      }
      let end: number = this.newNote.text.indexOf(' ', start) === -1 ? this.newNote.text.length : this.newNote.text.indexOf(' ', start);
      let tag: string = this.newNote.text.substring(start, end);
      this.newNote.tags.push(tag);
      startIndex = end;
    }
  }

  filter(): void {
    this.filteredNotes = [];
    this.filteredNotes = this.notes.filter((note) => {
      return this.checkFilter(note);
    });
  }

  checkFilter(note): boolean {
    if (this.tagFilter.length === 0) {
      return true;
    }
    let isContainTag: boolean = false;
    note.tags.forEach((tag) => {
      if (tag.toLowerCase().indexOf(this.tagFilter.toLowerCase()) !== -1) {
        isContainTag = true;
      }
    });
    return isContainTag;
  }

  startAdding(): void {
    this.isAdding = !this.isAdding;
  }

  save(): void {
    if (!this.newNote.text || this.newNote.text.length === 0) {
      this.cancel();
      return;
    }
    if (!this.newNote.tags) {
      this.newNote.tags = [];
    }
    this.notesService.addNote(this.newNote.text, this.newNote.tags).subscribe((note) => {
      this.notes.push(note);
      this.filter();
      this.cancel();
    });
  }

  cancel(): void {
    this.isAdding = !this.isAdding;
    this.newNote = new Note();
  }

  ngOnInit() {
    this.getNotes();
  }

}
