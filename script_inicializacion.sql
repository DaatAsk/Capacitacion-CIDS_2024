-- tablas
create table roles (
  id serial primary key,
  nombre text
);

create table desarrolladores (
  id serial primary key,
  nombre text,
  correo text unique,
  id_rol integer references roles(id),
  fecha_contratacion date,
  fecha_creacion timestamp,
  fecha_actualizacion timestamp
);

create table proyectos (
  id serial primary key,
  nombre text,
  descripcion text,
  fecha_inicio date,
  fecha_fin date,
  id_responsable integer references desarrolladores(id),
  fecha_creacion timestamp,
  fecha_actualizacion timestamp
);

create table desarrollador_x_proyecto (
  id_desarrollador integer references desarrolladores(id),
  id_proyecto integer references proyectos(id),
  primary key (id_desarrollador, id_proyecto)
);

create table estados (
  id serial primary key,
  nombre text
);

create table tareas (
  id serial primary key,
  id_proyecto integer references proyectos(id),
  id_asignado integer references desarrolladores(id),
  titulo text,
  descripcion text,
  id_estado integer references estados(id),
  fecha_limite date,
  fecha_creacion timestamp,
  fecha_actualizacion timestamp
);


-- datos
INSERT INTO roles ("id", "nombre")
VALUES ('1', 'Desarrollador'),
       ('2', 'Administrador de base de datos'),
       ('3', 'Analista funcional'),
       ('4', 'Tester');

INSERT INTO desarrolladores ("id", "nombre", "correo", "id_rol", "fecha_contratacion", "fecha_creacion",
                             "fecha_actualizacion")
VALUES ('1', 'Francisco', 'merlinifrancisco@gmail.com', '1', '2022-01-17', '2024-11-03 00:10:56',
        '2024-11-03 00:10:56');

INSERT INTO proyectos ("id", "nombre", "descripcion", "fecha_inicio", "fecha_fin", "id_responsable", "fecha_creacion",
                       "fecha_actualizacion")
VALUES ('1', 'Caja', 'Caja de Jubilaciones, Pensiones y Retiros de Cordoba', '2020-12-10', null, '1',
        '2024-11-03 00:21:26', '2024-11-03 00:21:26');

INSERT INTO desarrollador_x_proyecto ("id_desarrollador", "id_proyecto")
VALUES ('1', '1');

INSERT INTO estados ("id", "nombre")
VALUES ('1', 'Pendiente'),
       ('2', 'En curso'),
       ('3', 'Finalizada');

INSERT INTO tareas ("id", "id_proyecto", "id_asignado", "titulo", "descripcion", "id_estado", "fecha_limite",
                    "fecha_creacion", "fecha_actualizacion")
VALUES ('1', '1', '1', 'Crear formulario login', 'Crear componente formulario login', '1', '2024-11-15',
        '2024-11-03 00:23:41', '2024-11-03 00:23:41'),
       ('2', '1', '1', 'Crear endpoint login', 'Desarrollo backend endpoint login', '2', '2024-11-15',
        '2024-11-03 00:25:25', '2024-11-03 00:25:25');

