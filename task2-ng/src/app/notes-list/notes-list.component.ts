import { Component, OnInit } from '@angular/core';
import { NotesService } from "../notes.service";
import { Note } from "../notes-model/Note";


@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.sass']
})
export class NotesListComponent implements OnInit {



  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.notesService.getNotes().subscribe((notes)=>{
      notes[0].text = 'Hi, updated #note';
      this.notesService.updateNote(notes[0]).subscribe();
    });
  }

}
