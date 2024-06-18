import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SharedService } from './shared.service';
import { SharedStore } from './shared-store';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent],
  providers: [SharedService, SharedStore]
})
export class SharedModule {}
