import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './shared.type';


@Injectable({providedIn: 'root'})

export class SharedStore {
    users$: Observable<IUser[]> = new Observable();
    private _users$: BehaviorSubject<IUser[]>;

    constructor(){
        this._users$ = new BehaviorSubject<IUser[]>([]);
        this.users$ = this._users$.asObservable();
    }

    get users(): IUser[] {
        return this._users$.getValue();
    }

    setUsers(nextValue: IUser[]) {
        this._users$.next(nextValue);
    }
   
}