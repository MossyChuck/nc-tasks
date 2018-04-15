import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../notes-model/Note';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass']
})
export class NoteComponent implements OnInit {

  @Input()
  note: Note;
  isEditing: boolean = false;
  tempNote: Note;

  edit(){
    this.isEditing = !this.isEditing;
    this.tempNote = JSON.parse(JSON.stringify(this.note));
    this.note.tags.push('#qwe');
    console.log(`Note ${this.note.id} isEditing is ${this.isEditing}`);
  }

  save(){
    this.isEditing = !this.isEditing;
  }

  cancel(){
    this.note = this.tempNote;
    this.isEditing = !this.isEditing;
  }

  constructor() { }

  ngOnInit() {
  }

}
