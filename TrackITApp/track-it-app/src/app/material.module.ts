import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    imports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatTableModule,
        MatSortModule,
        MatProgressBarModule
    ],
    exports: [
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatAutocompleteModule,
        MatProgressBarModule
    ]
})
export class MaterialModule {}