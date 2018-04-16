import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Note } from '../notes-model/Note';
import { NotesService } from '../notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass']
})
export class NoteComponent implements OnInit {

  @Output()
  fetch = new EventEmitter();

  @Input()
  note: Note;
  noteHtmlText: string;
  isEditing: boolean = false;
  tempNote: Note;

  edit(): void {
    this.isEditing = !this.isEditing;
    this.tempNote = JSON.parse(JSON.stringify(this.note));
    this.highligthTags();
  }

  highligthTags(): void {
    let startIndex: number = 0;
    this.noteHtmlText = this.note.text + ' ';
    this.note.tags = [];
    while (1) {
      let start: number = this.noteHtmlText.indexOf('#', startIndex);
      if (start === -1) {
        return;
      }
      let end: number = this.noteHtmlText.indexOf(' ', start) === -1 ? this.noteHtmlText.length : this.noteHtmlText.indexOf(' ', start);
      let tag: string = this.noteHtmlText.substring(start, end);
      this.note.tags.push(tag);
      tag += ' ';
      this.noteHtmlText = this.noteHtmlText.replace(tag, `<span class="highlited" style="color: red">${tag.replace(' ', '')}</span> `);
      startIndex = this.noteHtmlText.lastIndexOf('</span>');
    }
  }

  delete(): void {
    this.notesService.deleteNoteById(this.note.id).subscribe(() => {
      this.fetch.emit();
    })
  }

  save(): void {
    this.isEditing = !this.isEditing;
    this.notesService.updateNote(this.note).subscribe(() => {
      this.fetch.emit();
    });
  }

  cancel(): void {
    this.note = this.tempNote;
    this.isEditing = !this.isEditing;
  }

  constructor(private notesService: NotesService) { }

  ngOnInit() {
  }

}
