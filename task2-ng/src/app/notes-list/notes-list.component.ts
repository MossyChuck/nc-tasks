import {Component, OnInit} from '@angular/core';
import {NotesService} from "../notes.service";
import {Note} from "../notes-model/Note";


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.sass']
})
export class NotesListComponent implements OnInit {

  notes: Note[] = [];
  isAdding: boolean = false;
  newNote: Note = new Note();
  tagFilter: string = '';

  constructor(private notesService: NotesService) {
  }

  getNotes() {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes = notes;
    })
  }

  checkTags(){
    let startIndex = 0;
    this.newNote.tags = [];
    while(1){
      let start = this.newNote.text.indexOf('#', startIndex);
      if(start === -1){
        return;
      }
      let end = this.newNote.text.indexOf(' ',start) === -1? this.newNote.text.length: this.newNote.text.indexOf(' ',start);
      let tag = this.newNote.text.substring(start,end);
      this.newNote.tags.push(tag);
      console.log(tag);
      startIndex = end;
    }
  }

  startAdding(){
    this.isAdding = !this.isAdding;
  }

  save(){
    this.notesService.addNote(this.newNote.text,this.newNote.tags).subscribe((note)=>{
      this.notes.push(note);
      this.cancel();
    });
  }

  cancel(){
    this.isAdding = !this.isAdding;
    this.newNote = new Note();
  }

  ngOnInit() {
   this.getNotes();
  }

}
