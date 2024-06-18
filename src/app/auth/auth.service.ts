import { Injectable, inject } from '@angular/core';
import {
  NextOrObserver,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = getAuth();
  firestore: Firestore = inject(Firestore);

  private user!: User;

  onGetProfile = new Subject<User>();

  constructor() {}

  get isAuth() {
    return !!this.auth.currentUser;
  }

  get profile() {
    return this.user;
  }

  set profile(user: User) {
    this.user = user;
  }

  onAuthStateChanged(callback: NextOrObserver<User>) {
    onAuthStateChanged(this.auth, callback);
  }

  async login(email: string, password: string) {
    try {
      const resp = await signInWithEmailAndPassword(this.auth, email, password);
      this.user = resp.user;
    } catch (e: any) {
      throw e.message;
    }
  }

  register(email?: string, password?: string) {
    return createUserWithEmailAndPassword(this.auth, email!, password!);
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (e: any) {
      throw e.message;
    }
  }

  async updateProfile(displayName?: string) {
    try {
      await updateProfile(this.user, {
        displayName,
      });
    } catch (e: any) {
      console.log(e);
      throw e.message;
    }
  }
}
