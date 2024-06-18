import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { TaskModule } from './task/task.module';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { ProfileModule } from './profile/profile.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    TaskModule,
    AuthModule,
    ProfileModule,
    HomeModule,
    FormsModule,
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'task-management-1cc43',
        appId: '1:175771062543:web:4c196af79147bab5fe6e7a',
        storageBucket: 'task-management-1cc43.appspot.com',
        apiKey: 'AIzaSyB3JNYbUjQc-O-wwbfv8BPTpoBSUt6n5WM',
        authDomain: 'task-management-1cc43.firebaseapp.com',
        messagingSenderId: '175771062543',
        measurementId: 'G-2D4JDH14KV',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
