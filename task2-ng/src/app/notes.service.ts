import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {Note} from './notes-model/Note';

@Injectable()
export class NotesService {

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>('http://localhost:3000/notes');
  }

  // getNotesByTag(searchTag: string): Note[] {
  //   let notes: Note[] = this.notes.filter((note: Note) => {
  //     let flag: boolean = false;
  //     note.tags.forEach((tag) => {
  //       if (tag.toLowerCase() === searchTag.toLowerCase()) {
  //         flag = true;
  //       }
  //     });
  //     return flag;
  //   });
  //   return notes;
  // }
  //
  getNoteById(id: number): Observable<Note> {
    return this.http.get<Note>(`http://localhost:3000/notes/${id}`);
  }

  //
  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`http://localhost:3000/notes/${note.id}`, {text: note.text, tags: note.tags});
  }

  //
  deleteNoteById(id: number): Observable<Note[]> {
    return this.http.delete<Note[]>(`http://localhost:3000/notes/${id}`);
  }

  //
  addNote(text: string, tags: string[]): Observable<Note> {
    return this.http.post<Note>('http://localhost:3000/notes', {text: text, tags: tags});
  }

  constructor(private http: HttpClient) {
  }

}
