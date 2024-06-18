import { Injectable, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { ITask, ITasksQueryParams } from './task.type';
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

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  getTasks({
    status,
    q,
    orderByPriorityDirection,
  }: ITasksQueryParams): Observable<ITask[]> {
    const itemCollection = collection(this.firestore, 'task');
    const appQuery = query(
      itemCollection,
      where('status', '==', status),
      where('title', '>=', q),
      where('title', '<=', q + '\uf8ff'),
      orderBy('priority', orderByPriorityDirection)
    );

    return collectionSnapshots(appQuery).pipe(
      map((action) => action.map((a) => Object.assign(a.data(), { id: a.id })))
    ) as Observable<ITask[]>;
  }

  getTaskDetail(taskId: string) {
    return from(getDoc(doc(this.firestore, 'task', taskId)));
  }

  async addTask(data: ITask) {
    try {
      await addDoc(collection(this.firestore, 'task'), data);
    } catch (e: any) {
      throw e.message;
    }
  }

  async updateTask(taskId: string, data: ITask) {
    try {
      const { id, ...dataUpdate } = data;
      await updateDoc(doc(this.firestore, 'task', taskId), { ...dataUpdate });
    } catch (e: any) {
      throw e.message;
    }
  }

  async removeTask(id: string) {
    try {
      await deleteDoc(doc(this.firestore, 'task', id));
    } catch (e: any) {
      throw e.message;
    }
  }
}
