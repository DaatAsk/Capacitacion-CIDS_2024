import {
  Component,
  OnChanges,
  SimpleChanges,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../delete-confirm-dialog/delete-confirm-dialog.component';

export interface TableColumn<T> {
  label: string;
  def: string;
  content: (row: T) => string | null | undefined;
}

@Component({
  selector: 'app-ui-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    DeleteConfirmDialogComponent,
  ],
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss'],
})
export class UiTableComponent<T> implements OnChanges {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<T>([]);

  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();

  constructor(private dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.setData();
    }
    this.setDisplayedColumns();
  }

  private setData() {
    this.dataSource.data = this.data ?? [];
  }

  private setDisplayedColumns() {
    this.displayedColumns = [...this.columns.map((col) => col.def), 'actions'];
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  editRow(row: T) {
    this.edit.emit(row);
  }

  confirmDelete(row: T) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delete.emit(row);
      }
    });
  }
}
