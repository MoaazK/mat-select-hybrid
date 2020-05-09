import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatCheckboxModule, MatButtonModule, MatInputModule, MatIconModule, MatRippleModule } from '@angular/material';
import { MatSelectSearchComponent } from './mat-select-search/mat-select-search.component';
import { MatSelectCheckComponent } from './mat-select-check/mat-select-check.component';
import { MatSelectHybridComponent } from './mat-select-hybrid.component';

@NgModule({
  declarations: [
    MatSelectSearchComponent,
    MatSelectCheckComponent,
    MatSelectHybridComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSelectHybridComponent
  ]
})
export class MatSelectHybridModule {}
