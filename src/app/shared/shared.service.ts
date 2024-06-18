import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  collectionSnapshots,
  deleteDoc,
  query,
  where,
  updateDoc,
  orderBy,
  startAt,
  endAt,
} from '@angular/fire/firestore';
import { IUser } from './shared.type';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  getAllUsers() {
    const itemCollection = collection(this.firestore, 'user');
    return collectionSnapshots(itemCollection).pipe(
      map((action) => action.map((a) => Object.assign(a.data(), { id: a.id })))
    ) as Observable<IUser[]>;
  }

  async addUser(user: IUser) {
    try {
      await addDoc(collection(this.firestore, 'user'), user);
    } catch (e: any) {
      throw e.message;
    }
  }

  async updateUser(id: string, displayName: string) {
    try {
      await updateDoc(doc(this.firestore, 'user', id), {
        name: displayName
      });
    } catch (e: any) {
      throw e.message;
    }
  }
}
