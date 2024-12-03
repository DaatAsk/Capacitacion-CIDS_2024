import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  standalone: true,
  templateUrl: './delete-confirm-dialog.component.html',
  imports: [CommonModule, MatButtonModule, MatDialogModule],
})
export class DeleteConfirmDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
