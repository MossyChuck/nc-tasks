import { Component } from '@angular/core';
import { NotesService } from "./notes.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';

  constructor(private notesService: NotesService) {
  }

}

