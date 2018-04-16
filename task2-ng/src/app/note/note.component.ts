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
  deleted = new EventEmitter();

  @Input()
  note: Note;
  noteHtmlText: string;
  isEditing: boolean = false;
  tempNote: Note;

  edit(){
    this.isEditing = !this.isEditing;
    this.tempNote = JSON.parse(JSON.stringify(this.note));
    this.highligthTags();
    console.log(`Note ${this.note.id} isEditing is ${this.isEditing}`);
  }

  highligthTags(){
    let startIndex = 0;
    this.noteHtmlText = this.note.text+' ';
    this.note.tags = [];
    while(1){
      let start = this.noteHtmlText.indexOf('#', startIndex);
      if(start === -1){
        return;
      }
      let end = this.noteHtmlText.indexOf(' ',start) === -1? this.noteHtmlText.length: this.noteHtmlText.indexOf(' ',start);
      let tag = this.noteHtmlText.substring(start,end);
      this.note.tags.push(tag);
      tag+=' ';
      console.log(tag);
      this.noteHtmlText = this.noteHtmlText.replace(tag,`<span class="highlited" style="color: red">${tag.replace(' ','')}</span> `);
      startIndex = this.noteHtmlText.lastIndexOf('</span>');
    }
  }

  delete(){
    this.notesService.deleteNoteById(this.note.id).subscribe(()=>{
      console.log('deleted');
      this.deleted.emit();
    })
  }

  save(){
    this.isEditing = !this.isEditing;
    this.notesService.updateNote(this.note).subscribe(()=>{
      console.log('updated');
    })
  }

  cancel(){
    this.note = this.tempNote;
    this.isEditing = !this.isEditing;
  }

  constructor(private notesService: NotesService ) { }

  ngOnInit() {
    console.log(this);
  }

}
