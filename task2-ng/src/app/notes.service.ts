import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { Note } from './notes-model/Note';

@Injectable()
export class NotesService {

  notesUrl: string = 'http://localhost:3000/notes';

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl);
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.notesUrl}/${id}`);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.notesUrl}/${note.id}`, { text: note.text, tags: note.tags });
  }

  deleteNoteById(id: number): Observable<Note[]> {
    return this.http.delete<Note[]>(`${this.notesUrl}/${id}`);
  }

  addNote(text: string, tags: string[]): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, { text: text, tags: tags });
  }

  constructor(private http: HttpClient) {
  }

}
