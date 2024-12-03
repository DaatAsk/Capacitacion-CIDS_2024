import { Component, EventEmitter, Output, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MatLabel, MatFormField],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  // @Output() searchResults = new EventEmitter<any[]>();

  // constructor(
  //   private dialog: MatDialog,
  //   @Inject('SearchService') private searchService: any
  // ) {}

  // onSearch(event: Event) {
  //   const query = (event.target as HTMLInputElement).value;
  //   if (query) {
  //     this.searchService
  //       .search(query)
  //       .pipe(
  //         catchError((err) => {
  //           this.showErrorPopup('Error al buscar: ' + err.message);
  //           return of([]);
  //         })
  //       )
  //       // .subscribe((results) => {
  //       //   if (results && results.length > 0) {
  //       //     this.searchResults.emit(results);
  //       //   } else {
  //       //     this.showErrorPopup('No se encontraron resultados.');
  //       //   }
  //       // });
  //   }
  // }

  // showErrorPopup(message: string) {
  //   this.dialog.open(SearchErrorPopup, {
  //     data: { message },
  //   });
  // }
}

// @Component({
//   selector: 'search-error-popup',
//   template:
//     '<h1 mat-dialog-title>Error</h1><div mat-dialog-content>{{data.message}}</div><div mat-dialog-actions><button mat-button (click)="onClose()">Cerrar</button></div>',
// })
// export class SearchErrorPopup {
//   constructor(
//     public dialogRef: MatDialogRef<SearchErrorPopup>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {}

//   onClose(): void {
//     this.dialogRef.close();
//   }
// }
