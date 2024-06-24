# Backend del Sistema de Horas de Extensión Universitaria

Sistema para la gestión de las horas de extensión para los alumnos y encargados de la carrera de ingeniería en informática de la Facultad de Ciencias de la Informática de la Universidad Privada del Este.

### Funciones del Sistema
* Gestión de usuarios
* Gestión de alumnos
* Gestión de proyectos

### Controladores del Backend
* `Usuarios`
    - Función para crear usuarios
    - Función para editar usuario por ID
    - Función para eliminar usuario por ID
    - Función para obtener usuario por ID
    - Función para obtener todos los usuarios
* `Alumnos`
    - Función para crear alumnos
    - Función para editar alumnos por ID
    - Función para eliminar alumnos por ID
    - Función para obtener alumnos por ID
    - Función para obtener todos los alumnos

## Instrucciones de Instalación y Ejecución

### Instalación

Para poder utilizar el backend debemos descargar el repositorio de GitHub:

```
git clone https://github.com/OscarGRG14/back_extension
```

Luego debemos instalar todas las dependencias que tiene el proyecto, para ello usamos el siguiente comando:

```
npm install
```
También puede usarse:

```
npm i
```

### Ejecución

Para ejecutar el proyecto, existen dos maneras. La primera es la forma de desarrollo, que nos permite hacer pruebas sin tener que detener y reiniciar varias veces el backend. Se hace con este comando:

```
npm run dev
```

La segunda es el método de producción, que se utiliza si no se va a hacer ningún cambio significativo o algún cambio menor que no requiera reiniciar el backend. El comando es:

```
npm start
```
También puede usarse:

```
npm run start
```

