import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TableColumn, UiTableComponent } from '../ui-table/ui-table.component';
import { DesarrolladorService } from '../../services/desarrollador.service';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario/formulario.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RolService } from '../../services/rol.service';
import { Rol } from '../../model';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


interface Desarrollador {
  id: number;
  nombre: string;
  rol: Rol | null;
  correo: string | null;
  fechaContratacion: Date | null;
}

interface CrearDesarrolladorDto {
  nombre: string;
  rol: Rol;
  correo: string;
  fechaContratacion: Date;
}

@Component({
  selector: 'app-listado-desarrolladores',
  standalone: true,
  imports: [
    UiTableComponent,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  templateUrl: './listado-desarrolladores.component.html',
  styleUrls: ['./listado-desarrolladores.component.scss'],
})
export class ListadoDesarrolladoresComponent implements OnInit {
  desarrolladores$: Observable<Desarrollador[]> = of([]);
  tableColumn: TableColumn<Desarrollador>[] = [];
  roles: Rol[] = [];

  constructor(
    private desarrolladorService: DesarrolladorService,
    private rolservice: RolService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.desarrolladores$ = this.desarrolladorService
      .obtenerDesarrolladores()
      .pipe(
        catchError((err) => {
          console.error('Error al obtener desarrolladores:', err);
          return of([]);
        })
      );
  }

  ngOnInit(): void {
    this.setTableColumns();
    this.loadRoles();
    this.updateDesarrolladores();
  }

  loadRoles() {
    this.rolservice.obtenerRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      },
    });
  }

  setTableColumns() {
    this.tableColumn = [
      {
        label: 'id',
        def: 'id',
        content: (row) => String(row.id),
      },
      {
        label: 'Nombre',
        def: 'nombre',
        content: (row) => row.nombre || 'Sin nombre',
      },
      {
        label: 'Rol',
        def: 'rol',
        content: (row) => row.rol?.nombre || 'Sin rol asignado',
      },
      {
        label: 'Mail',
        def: 'correo',
        content: (row) => row.correo || 'Sin correo asignado',
      },
      {
        label: 'Fecha de Contratación',
        def: 'fechaContratacion',
        content: (row) =>
          row.fechaContratacion
            ? new Date(row.fechaContratacion).toLocaleDateString()
            : 'Fecha no disponible',
      },
    ];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '300px',
      data: {
        title: 'Nuevo Desarrollador',
        fields: [
          {
            label: 'Nombre',
            controlName: 'nombre',
            type: 'text',
            validators: [Validators.required],
          },
          {
            label: 'Mail',
            controlName: 'correo',
            type: 'text',
            validators: [Validators.required, Validators.email],
          },
          {
            label: 'Rol',
            controlName: 'rol',
            type: 'select',
            options: this.roles.map((rol) => ({
              value: rol.id,
              label: rol.nombre,
            })),
            validators: [Validators.required],
          },
          {
            label: 'Fecha de Contratación',
            controlName: 'fechaContratacion',
            type: 'date',
            validators: [Validators.required],
          },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addDesarrollador(result);
      }
    });
  }

  addDesarrollador(desarrollador: any) {
    const rolId = desarrollador.rol;
    const rol = this.roles.find((r) => r.id === rolId);

    if (rol) {
      const cleanedDesarrollador: CrearDesarrolladorDto = {
        nombre: desarrollador.nombre,
        rol: { id: rol.id, nombre: rol.nombre },
        correo: desarrollador.correo || '',
        fechaContratacion: desarrollador.fechaContratacion
          ? new Date(desarrollador.fechaContratacion)
          : new Date(),
      };

      this.desarrolladorService
        .crearDesarrollador(cleanedDesarrollador)
        .subscribe({
          next: (response) => {
            console.log('Desarrollador creado:', response);
            this.updateDesarrolladores();
            this.snackBar.open('Desarrollador creado exitosamente!', 'Cerrar', {
              duration: 3000,
            });
          },
          error: (err) => {
            console.error('Error al crear desarrollador:', err);
            this.snackBar.open('Error al crear desarrollador', 'Cerrar', {
              duration: 3000,
            });
          },
        });
    } else {
      console.error('Rol no encontrado:', rolId);
    }
  }

  updateDesarrollador(id: number, updatedDesarrollador: any) {
    const rolId = updatedDesarrollador.rol;
    const rol = this.roles.find((r) => r.id === rolId);

    if (rol) {
      const cleanedDesarrollador: CrearDesarrolladorDto = {
        nombre: updatedDesarrollador.nombre,
        rol: { id: rol.id, nombre: rol.nombre },
        correo: updatedDesarrollador.correo || '',
        fechaContratacion: updatedDesarrollador.fechaContratacion
          ? new Date(updatedDesarrollador.fechaContratacion)
          : new Date(),
      };

      this.desarrolladorService
        .actualizarDesarrollador(id, cleanedDesarrollador)
        .subscribe({
          next: (response) => {
            console.log('Desarrollador actualizado:', response);
            this.updateDesarrolladores();
            this.snackBar.open(
              'Desarrollador actualizado exitosamente!',
              'Cerrar',
              {
                duration: 3000,
              }
            );
          },
          error: (err) => {
            console.error('Error al actualizar desarrollador:', err);
            this.snackBar.open('Error al actualizar desarrollador', 'Cerrar', {
              duration: 3000,
            });
          },
        });
    } else {
      console.error('Rol no encontrado:', rolId);
    }
  }

  updateDesarrolladores() {
    this.desarrolladores$ = this.desarrolladorService
      .obtenerDesarrolladores()
      .pipe(
        catchError((err) => {
          console.error('Error al obtener desarrolladores:', err);
          return of([]);
        })
      );
  }

  openEditDialog(desarrollador: Desarrollador): void {
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '300px',
      data: {
        title: 'Editar Desarrollador',
        fields: [
          {
            label: 'Nombre',
            controlName: 'nombre',
            type: 'text',
            validators: [Validators.required],
            value: desarrollador.nombre,
          },
          {
            label: 'Mail',
            controlName: 'correo',
            type: 'text',
            validators: [Validators.required],
            value: desarrollador.correo,
          },
          {
            label: 'Rol',
            controlName: 'rol',
            type: 'select',
            options: this.roles.map((rol) => ({
              value: rol.id,
              label: rol.nombre,
            })),
            validators: [Validators.required],
            value: desarrollador.rol?.id,
          },
          {
            label: 'Fecha de Contratación',
            controlName: 'fechaContratacion',
            type: 'date',
            validators: [Validators.required],
            value: desarrollador.fechaContratacion
              ? new Date(desarrollador.fechaContratacion)
                  .toISOString()
                  .split('T')[0]
              : '',
          },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateDesarrollador(desarrollador.id, result);
      }
    });
  }

  deleteDesarrollador(id: number) {
    this.desarrolladorService.eliminarDesarrollador(id).subscribe({
      next: (response) => {
        console.log('Desarrollador eliminado:', response);
        this.updateDesarrolladores();
      },
      error: (err) => {
        console.error('Error al eliminar desarrollador:', err);
      },
    });
  }
}
 