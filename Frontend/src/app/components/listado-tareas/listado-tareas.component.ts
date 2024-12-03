import { Component, OnInit } from '@angular/core';
import { TableColumn, UiTableComponent } from '../ui-table/ui-table.component';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Desarrollador, Estado, Proyecto } from '../../model';
import { catchError, Observable, of } from 'rxjs';
import { TareaService } from '../../services/tarea.service';
import { DesarrolladorService } from '../../services/desarrollador.service';
import { EstadoService } from '../../services/estado.service';
import { ProyectoService } from '../../services/proyecto.service';
import { CrearTareaDto } from '../../dto';
import { FormularioComponent } from '../formulario/formulario.component';

interface Tarea {
  id: number;
  titulo: string | null;
  descripcion: string | null;
  estado: Estado | null;
  proyecto: Proyecto | null;
  asignado: Desarrollador | null;
  fechaLimite: Date | null;
}

interface CrearTarea {
  titulo: string;
  descripcion: string;
  estado: Estado;
  proyecto: Proyecto;
  asignado: Desarrollador;
  fechaLimite: Date;
}

@Component({
  selector: 'app-listado-tareas',
  standalone: true,
  imports: [
    // UiTableComponent,
    // AsyncPipe,
    // MatIconModule,
    // MatButtonModule,
    // MatDialogModule,
    // ReactiveFormsModule,
    // MatInputModule,
    // MatSelectModule,
    // MatFormFieldModule,
    // MatSnackBarModule,
  ],
  templateUrl: './listado-tareas.component.html',
  styleUrl: './listado-tareas.component.scss',
})
export class ListadoTareasComponent {
  // implements OnInit
  // tareas$: Observable<Tarea[]> = of([]);
  // tableColumn: TableColumn<Tarea>[] = [];
  // asignados: Desarrollador[] = [];
  // estados: Estado[] = [];
  // proyectos: Proyecto[] = [];

  // constructor(
  //   private tareaservice: TareaService,
  //   private asignadosservice: DesarrolladorService,
  //   private estadosservice: EstadoService,
  //   private proyectosservice: ProyectoService,
  //   private snackBar: MatSnackBar,
  //   private dialog: MatDialog
  // ) {
  //   this.tareas$ = this.tareaservice.obtenerTareas().pipe(
  //     catchError((err) => {
  //       console.error('Error al obtener las Tareas:', err);
  //       return of([]);
  //     })
  //   );
  // }

  // ngOnInit(): void {
  //   this.setTableColumns();
  //   this.loadTareas();
  //   this.loadProyectos();
  //   this.loadEstados();
  //   this.loadAsignados();
  //   this.updateTareas();
  // }

  // loadEstados() {
  //   this.estadosservice.obtenerEstado().subscribe({
  //     next: (data) => {
  //       this.estados = data;
  //     },
  //     error: (err) => {
  //       console.error('Error al cargar roles:', err);
  //     },
  //   });
  // }

  // loadAsignados() {
  //   this.asignadosservice.obtenerDesarrolladores().subscribe({
  //     next: (data) => {
  //       this.asignados = data;
  //     },
  //     error: (err) => {
  //       console.error('Error al cargar roles:', err);
  //     },
  //   });
  // }

  // loadProyectos() {
  //   this.proyectosservice.obtenerProyectos().subscribe({
  //     next: (data) => {
  //       this.proyectos = data;
  //     },
  //     error: (err) => {
  //       console.error('Error al cargar roles:', err);
  //     },
  //   });
  // }

  // setTableColumns() {
  //   this.tableColumn = [
  //     {
  //       label: 'id',
  //       def: 'id',
  //       content: (row) => String(row.id),
  //     },
  //     {
  //       label: 'Titulo',
  //       def: 'titulo',
  //       content: (row) => row.titulo || 'Sin Titulo',
  //     },
  //     {
  //       label: 'Estado',
  //       def: 'estado',
  //       content: (row) => row.estado?.nombre || 'Sin Estado asignado',
  //     },
  //     {
  //       label: 'Descripcion',
  //       def: 'descripcion',
  //       content: (row) => row.descripcion || 'Sin descripcion',
  //     },
  //     {
  //       label: 'Fecha Limite',
  //       def: 'fechaLimite',
  //       content: (row) =>
  //         row.fechaLimite
  //           ? new Date(row.fechaLimite).toLocaleDateString()
  //           : 'Fecha no disponible',
  //     },
  //     {
  //       label: 'Asignado',
  //       def: 'asignado',
  //       content: (row) => row.asignado?.nombre || 'Sin Asignacion',
  //     },
  //     {
  //       label: 'Proyecto',
  //       def: 'proyecto',
  //       content: (row) => row.proyecto?.nombre || 'Sin Asignacion',
  //     },
  //   ];
  // }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(FormularioComponent, {
  //     width: '300px',
  //     data: {
  //       title: 'Nueva Tarea',
  //       fields: [
  //         {
  //           label: 'Titulo',
  //           controlName: 'titulo',
  //           type: 'text',
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Descripcion',
  //           controlName: 'descripcion',
  //           type: 'text',
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Estado',
  //           controlName: 'estado',
  //           type: 'select',
  //           options: this.estados.map((estado) => ({
  //             value: estado.id,
  //             label: estado.nombre,
  //           })),
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Asignadp',
  //           controlName: 'asignado',
  //           type: 'select',
  //           options: this.asignados.map((asignado) => ({
  //             value: asignado.id,
  //             label: asignado.nombre,
  //           })),
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Proyecto',
  //           controlName: 'proyecto',
  //           type: 'select',
  //           options: this.proyectos.map((proyecto) => ({
  //             value: proyecto.id,
  //             label: proyecto.nombre,
  //           })),
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Fecha Limite',
  //           controlName: 'fechaLimite',
  //           type: 'date',
  //           validators: [Validators.required],
  //         },
  //       ],
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.addTarea(result);
  //     }
  //   });
  // }

  // addTarea(tarea: any) {
  //   const estadoId = tarea.rol;
  //   const estado = this.estados.find((e) => e.id === estadoId);

  //   const asignadoId = tarea.asignado;
  //   const asignado = this.asignados.find((e) => e.id === asignadoId);

  //   const proyectoId = tarea.proyecto;
  //   const proyecto = this.proyectos.find((e) => e.id === proyectoId);

  //   if (estado && asignado && proyecto) {
  //     const cleanedTarea: CrearTareaDto = {
  //       titulo: tarea.titulo,
  //       estado: { id: estado.id, nombre: estado.nombre },
  //       descripcion: tarea.descripcion || '',
  //       fechaLimite: tarea.fechaLimite
  //         ? new Date(tarea.fechaLimite)
  //         : new Date(),
  //       asignado: {
  //         id: asignado?.id,
  //         nombre: asignado.nombre,
  //         correo: asignado.correo,
  //         rol: asignado.rol,
  //         fechaContratacion: asignado.fechaContratacion,
  //         fechaCreacion: asignado.fechaCreacion,
  //         fechaActualizacion: asignado.fechaActualizacion,
  //       },
  //       proyecto: {
  //         id: proyecto.id,
  //         nombre: proyecto.nombre,
  //         responsable: proyecto.responsable,
  //         descripcion: proyecto.descripcion,
  //         fechaInicio: proyecto.fechaInicio,
  //         fechaFin: proyecto.fechaFin,
  //         fechaCreacion: proyecto.fechaCreacion,
  //         fechaActualizacion: proyecto.fechaActualizacion,
  //         desarrolladores: proyecto.desarrolladores,
  //         tareas: proyecto.tareas,
  //       },
  //     };

  //     this.tareaservice.crearTarea(cleanedTarea).subscribe({
  //       next: (response) => {
  //         console.log('Tarea creada:', response);
  //         this.updateTareas();
  //         this.snackBar.open('Tarea creada exitosamente!', 'Cerrar', {
  //           duration: 3000,
  //         });
  //       },
  //       error: (err) => {
  //         console.error('Error al crear tarea:', err);
  //         this.snackBar.open('Error al crear tarea', 'Cerrar', {
  //           duration: 3000,
  //         });
  //       },
  //     });
  //   } else {
  //     console.error('Estado no encontrado:', estadoId);
  //   }
  // }
  // openEditDialog(tarea: Tarea): void {
  //   const dialogRef = this.dialog.open(FormularioComponent, {
  //     width: '300px',
  //     data: {
  //       title: 'Editar Tarea',
  //       fields: [
  //         {
  //           label: 'Titulo',
  //           controlName: 'titulo',
  //           type: 'text',
  //           value: tarea.titulo,
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Descripción',
  //           controlName: 'descripcion',
  //           type: 'text',
  //           value: tarea.descripcion,
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Fecha Limite',
  //           controlName: 'fechaLimite',
  //           type: 'date',
  //           value: tarea.fechaLimite
  //             ? new Date(tarea.fechaLimite).toISOString().split('T')[0]
  //             : '',
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Estado',
  //           controlName: 'estado',
  //           type: 'select',
  //           options: this.estados.map((r) => ({
  //             value: r.id,
  //             label: `${r.nombre}`,
  //           })),
  //           value: tarea.estado?.id,
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Asignado',
  //           controlName: 'asignado',
  //           type: 'select',
  //           options: this.asignados.map((d) => ({
  //             value: d.id,
  //             label: `${d.nombre}`,
  //           })),
  //           value: tarea.asignado?.id,
  //           validators: [Validators.required],
  //         },
  //         {
  //           label: 'Proyecto',
  //           controlName: 'proyecto',
  //           type: 'select',
  //           options: this.proyectos.map((d) => ({
  //             value: d.id,
  //             label: `${d.nombre}`,
  //           })),
  //           value: tarea.proyecto?.id,
  //           validators: [Validators.required],
  //         },
  //       ],
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.updateTarea(tarea.id, result);
  //     }
  //   });
  // }
}
