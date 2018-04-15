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

  constructor(private notesService: NotesService) {
  }

  getNotes() {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes = notes;
    })
  }

  ngOnInit() {
   this.getNotes();
  }

}
