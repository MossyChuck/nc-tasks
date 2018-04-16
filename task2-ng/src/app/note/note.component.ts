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
    while(1){
      let start = this.noteHtmlText.indexOf('#', startIndex);
      if(start === -1){
        return;
      }
      let end = this.noteHtmlText.indexOf(' ',start) === -1? this.noteHtmlText.length: this.noteHtmlText.indexOf(' ',start);
      let subs = this.noteHtmlText.substring(start,end)+' ';
      console.log(subs);
      this.noteHtmlText = this.noteHtmlText.replace(subs,`<span class="highlited" style="color: red">${subs.replace(' ','')}</span> `);
      startIndex = this.noteHtmlText.lastIndexOf('</span>');
    }
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
