import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { TableColumn, UiTableComponent } from '../ui-table/ui-table.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormularioComponent } from '../formulario/formulario.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Desarrollador } from '../../model';
import { ProyectoService } from '../../services/proyecto.service';
import { DesarrolladorService } from '../../services/desarrollador.service';
import { ActualizarProyectoDto, CrearProyectoDto } from '../../dto';

interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  responsable: Desarrollador | null;
  fechaInicio: Date | null;
  fechaFin: Date | null;
  desarrolladores: Desarrollador[] | null;
}

interface CrearProyecto {
  nombre: string;
  descripcion: string;
  responsable: Desarrollador;
  fechaInicio: Date;
  fechaFin: Date;
  desarrolladores: Desarrollador[];
}

@Component({
  selector: 'app-listado-proyectos',
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
  templateUrl: './listado-proyectos.component.html',
  styleUrls: ['./listado-proyectos.component.scss'],
})
export class ListadoProyectosComponent implements OnInit {
  proyectos$: Observable<Proyecto[]> = of([]);
  tableColumn: TableColumn<Proyecto>[] = [];

  proyectos: Proyecto[] = [];
  desarrolladores: Desarrollador[] = [];

  constructor(
    private proyectoService: ProyectoService,
    private desarrolladorService: DesarrolladorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.proyectos$ = this.proyectoService.obtenerProyectos().pipe(
      catchError((err) => {
        console.error('Error al obtener desarrolladores', err);
        return of([]);
      })
    );
  }

  ngOnInit(): void {
    this.setTableColumns();
    this.loadProyectos();
    this.loaddesarrolladores();
  }

  setTableColumns() {
    this.tableColumn = [
      {
        label: 'ID',
        def: 'id',
        content: (row) => String(row.id),
      },
      {
        label: 'Nombre',
        def: 'nombre',
        content: (row) => row.nombre || 'Sin Nombre',
      },
      {
        label: 'Descripción',
        def: 'descripcion',
        content: (row) => row.descripcion || 'Sin descripcion',
      },
      {
        label: 'Responsable',
        def: 'responsable',
        content: (row) => row.responsable?.nombre || 'Sin responsable asignado',
      },
    ];
  }

  loadProyectos() {
    this.proyectos$ = this.proyectoService.obtenerProyectos().pipe(
      catchError((err) => {
        console.error('Error al cargar proyectos:', err);
        return of([]);
      })
    );
    this.proyectos$.subscribe((data) => {
      this.proyectos = data;
    });
  }

  loaddesarrolladores() {
    this.desarrolladorService.obtenerDesarrolladores().subscribe({
      next: (data) => {
        this.desarrolladores = data;
      },
      error: (err) => {
        console.error('Error al cargar desarrolladores', err);
      },
    });
  }

  openDialog(): void {
    if (this.desarrolladores.length === 0) {
      this.loaddesarrolladores();
    }

    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '300px',
      data: {
        title: 'Nuevo Proyecto',
        fields: [
          {
            label: 'Nombre',
            controlName: 'nombre',
            type: 'text',
            validators: [Validators.required],
          },
          {
            label: 'Descripción',
            controlName: 'descripcion',
            type: 'text',
            validators: [Validators.required],
          },
          {
            label: 'Fecha de Inicio',
            controlName: 'fechaInicio',
            type: 'date',
            validators: [Validators.required],
          },
          {
            label: 'Fecha de Fin',
            controlName: 'fechaFin',
            type: 'date',
            validators: [Validators.required],
          },
          {
            label: 'Responsable',
            controlName: 'responsable',
            type: 'select',
            options: this.desarrolladores.map((r) => ({
              value: r.id,
              label: `${r.nombre} (${r.rol.nombre})`,
            })),
            validators: [Validators.required],
          },
          {
            label: 'Desarrolladores',
            controlName: 'desarrolladores',
            type: 'multi-select',
            options: this.desarrolladores.map((d) => ({
              value: d.id,
              label: `${d.nombre} (${d.rol.nombre})`,
            })),
            validators: [],
          },
        ],
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addProyecto(result)
      }
    });
  }

  addProyecto(proyecto: any) {
    const responsableId = proyecto.responsable;
    const responsable = this.desarrolladores.find(
      (r) => r.id === responsableId
    );

    const desarrolladoresIds = proyecto.desarrolladores;
    const desarrolladores = this.desarrolladores.filter((d) =>
      desarrolladoresIds.includes(d.id)
    );

    if (responsable && desarrolladores) {
      const newProyecto: CrearProyectoDto = {
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fechaInicio: proyecto.fechaInicio
          ? new Date(proyecto.fechaInicio)
          : new Date(),
        fechaFin: proyecto.fechaFin ? new Date(proyecto.fechaFin) : new Date(),
        responsable: {
          id: responsable.id,
          nombre: responsable.nombre,
          rol: responsable.rol,
          correo: responsable.correo,
          fechaContratacion: responsable.fechaContratacion,
          fechaCreacion: responsable.fechaCreacion,
          fechaActualizacion: responsable.fechaActualizacion,
        },
        desarrolladores: desarrolladores.map((d) => ({
          id: d.id,
          nombre: d.nombre,
          rol: d.rol,
          correo: d.correo,
          fechaContratacion: d.fechaContratacion,
          fechaCreacion: d.fechaCreacion,
          fechaActualizacion: d.fechaActualizacion,
        })),
      };

      this.proyectoService.crearProyecto(newProyecto).subscribe({
        next: (response) => {
          console.log('Proyecto creado:', response);
          this.loadProyectos();
          this.snackBar.open('Proyecto creado exitosamente!', 'Cerrar', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Error al crear proyecto:', err);
          this.snackBar.open('Error al crear proyecto', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    } else {
      console.error('Responsable o desarrolladores no encontrados');
    }
  }

  openEditDialog(proyecto: Proyecto): void {
    const dialogRef = this.dialog.open(FormularioComponent, {
      width: '300px',
      data: {
        title: 'Editar Proyecto',
        fields: [
          {
            label: 'Nombre',
            controlName: 'nombre',
            type: 'text',
            value: proyecto.nombre,
            validators: [Validators.required],
          },
          {
            label: 'Descripción',
            controlName: 'descripcion',
            type: 'text',
            value: proyecto.descripcion,
            validators: [Validators.required],
          },
          {
            label: 'Fecha de Inicio',
            controlName: 'fechaInicio',
            type: 'date',
            value: proyecto.fechaInicio
              ? new Date(proyecto.fechaInicio).toISOString().split('T')[0]
              : '',
            validators: [Validators.required],
          },
          {
            label: 'Fecha de Fin',
            controlName: 'fechaFin',
            type: 'date',
            value: proyecto.fechaFin
              ? new Date(proyecto.fechaFin).toISOString().split('T')[0]
              : '',
            validators: [Validators.required],
          },
          {
            label: 'Responsable',
            controlName: 'responsable',
            type: 'select',
            options: this.desarrolladores.map((r) => ({
              value: r.id,
              label: `${r.nombre} (${r.rol.nombre})`,
            })),
            value: proyecto.responsable?.id,
            validators: [Validators.required],
          },
          {
            label: 'Desarrolladores',
            controlName: 'desarrolladores',
            type: 'multi-select',
            options: this.desarrolladores.map((d) => ({
              value: d.id,
              label: `${d.nombre} (${d.rol.nombre})`,
            })),
            value: proyecto.desarrolladores?.map((d) => d.id),
            validators: [],
          },
        ],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateProyecto(proyecto.id, result);
      }
    });
  }

  updateProyecto(id: number, proyecto: any) {
    const responsableId = proyecto.responsable;
    const responsable = this.desarrolladores.find(
      (r) => r.id === responsableId
    );

    const desarrolladoresIds = proyecto.desarrolladores;
    const desarrolladores = this.desarrolladores.filter((d) =>
      desarrolladoresIds.includes(d.id)
    );

    if (responsable && desarrolladores) {
      const updatedProyecto: ActualizarProyectoDto = {
        nombre: proyecto.nombre,
        descripcion: proyecto.descripcion,
        fechaInicio: proyecto.fechaInicio
          ? new Date(proyecto.fechaInicio)
          : new Date(),
        fechaFin: proyecto.fechaFin ? new Date(proyecto.fechaFin) : new Date(),
        responsable: {
          id: responsable.id,
          nombre: responsable.nombre,
          rol: responsable.rol,
          correo: responsable.correo,
          fechaContratacion: responsable.fechaContratacion,
          fechaCreacion: responsable.fechaCreacion,
          fechaActualizacion: responsable.fechaActualizacion,
        },
        desarrolladores: desarrolladores.map((d) => ({
          id: d.id,
          nombre: d.nombre,
          rol: d.rol,
          correo: d.correo,
          fechaContratacion: d.fechaContratacion,
          fechaCreacion: d.fechaCreacion,
          fechaActualizacion: d.fechaActualizacion,
        })),
      };

      this.proyectoService.actualizarProyecto(id, updatedProyecto).subscribe({
        next: (response) => {
          console.log('Proyecto actualizado:', response);
          this.loadProyectos();
          this.snackBar.open('Proyecto actualizado exitosamente!', 'Cerrar', {
            duration: 3000,
          });
        },
        error: (err) => {
          console.error('Error al actualizar proyecto:', err);
          this.snackBar.open('Error al actualizar proyecto', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  deleteProyecto(id: number) {
    this.proyectoService.eliminarProyecto(id).subscribe({
      next: (response) => {
        console.log('Proyecto eliminado:', response);
        this.loadProyectos();
        this.snackBar.open('Proyecto eliminado exitosamente!', 'Cerrar', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error('Error al eliminar proyecto:', err);
        this.snackBar.open('Error al eliminar proyecto', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }
}
