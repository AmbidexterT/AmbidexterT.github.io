import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
