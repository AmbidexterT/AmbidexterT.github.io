import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableRoutingModule } from './table-routing.module';
import {TableComponent} from './table.component';
import {MaterialExampleModule} from "../../../material.module";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    FormsModule,
    MaterialExampleModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  exports: [
    TableComponent
  ]
})
export class TableModule {
}
