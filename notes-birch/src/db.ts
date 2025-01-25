import Dexie, { Table } from 'dexie';
import { Note } from './types/types';

export class NoteClassedDexie extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super('NotesDatabase');
    this.version(1).stores({
      notes: "++id, title, date, additionalText, mdText"
    });
  }
}

export const db = new NoteClassedDexie();