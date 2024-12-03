import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface FormField {
  label: string;
  controlName: string;
  type: string;
  options?: { value: number; label: string }[];
  validators?: any[];
  value?: any;
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  title: string = '';
  @Input() fields: FormField[] = [];
  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; fields: FormField[] }
  ) {
    this.fields = data.fields;
    this.formulario = this.fb.group({});
    this.title = data.title;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.fields.forEach((field) => {
      const control = this.fb.control(
        field.value || '',
        field.validators ? field.validators : []
      );
      this.formulario.addControl(field.controlName, control);
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.dialogRef.close(this.formulario.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  displayRole(role: { value: string; label: string }): string {
    return role ? role.label : '';
  }
}
