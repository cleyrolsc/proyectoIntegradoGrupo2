# Proyecto Integrado Grupo 2

### Autores:
* 
*
*
* Djidjelly Philippe Arnault Siclait

## Tabla de Contenidos
1. [Descripción del Proyecto](#descripción-del-proyecto)
    * [Funcionalidades Principales](#funcionalidades-principales)
2. [Arquitectura](#arquitectura)
    * [Backend API](#backend-api)
        * [Instalación y Ejecución](#instalación-y-ejecución)
        * [Crear un Repositorio](#crear-un-repositorio)
        * [Crear un Servicio](#crear-un-servicio)
        * [Crear un Controlador y Router](#crear-un-controllador-y-router)
        * [Realizar una Llamada](#realizar-una-llamada)
    * [Frontend APP](#frontend-app)

## Descripción del Proyecto
Este proyecto está compuesto de dos aplicaciones de arquitectura cliente-servidore para la gestión de horarios de agentes (sean de ventas, call center, servicio al cliente, etc.) a fin de contabilizar y renumerar sus horas laborales.

### Funcionalidades Principales 
1. Registrar usuarios para empleados 
    * No administrativos: agentes de marketing, ventas, etc.
    * Administrativo: gerentes, contable, recursos humanos, etc.
2. Gestionar privilegios para el acceso a páginas y funcionalidades 
4. Registro de horarios de trabajo por parte de los agentes
3. Visualización y descarga de reportes sobre horarios de los agentes

## Arquitectura 
Este proyecto está dividido en un par aplicaciones basado en la comunicación por peticiones (request) y transferencia de datos por JSON (response). En el lado del servidor, tenemos un REST API que se dedica a procesar las peticiones recibidas y devolver los datos necesarios. 

![Backend API](https://github.com/cleyrolsc/proyectoIntegradoGrupo2/blob/backend-dev/Images/Backend_Architecture.jpg?raw=true)

Por otro lado, la aplicación del cliente ...

### Backend API
#### Requisitos
1. IDE capaz de correr aplicaciones de Javascript
2. Nodejs instalado en su IDE
3. Npm para la instalación de paquetes y librerías
4. [DB Browser SQlite](https://sqlitebrowser.org/dl/) para ver el contenido de la base de datos

#### Instalación y Ejecución
Para instalar el API localmente, favor clonar el repositorio con su aplicación de control de versión GIT. 

`get clone https://github.com/cleyrolsc/proyectoIntegradoGrupo2.git`

1. Dentro del archivo clonado y con una aplicación IDE (Visual Studio Code) de su preferencia, abrir el archivo "Backend API".

2. Luego, en el terminal de sus IDE, ejecutar uno de los siguientes comandos

`npm install --save`

o

`npm install express crypto-js better-sqlite3 --save`

**NOTA**: Si tiene problema instalar `better-sqlite3`, favor abrir su Terminal de Comandos (Windows Powershell) en modo administrativo y ejecutar `npm i -g windows-build-tools`. Al finalizar, reinicie su computadora. 

3. Antes de ejecutar el API, revisar si la descarga del repositorio incluyo la base de datos sqlite3, en el directorio: **src/Database/backend-api.sqlite3**. Si no encuentre este archivo, puede descargarlo [aquí](https://trello.com/c/10p5nZtQ/16-dise%C3%B1ar-diageama-de-base-de-datos) y colocarlo en el directorio **src/Database/** del Backend API.

![Base de datos](https://github.com/cleyrolsc/proyectoIntegradoGrupo2/blob/backend-dev/Images/Base%20de%20datos.png?raw=true)
![Base de datos](https://github.com/cleyrolsc/proyectoIntegradoGrupo2/blob/backend-dev/Images/Descarga.png?raw=true)

4. Finalmente, ejecutar `node src/server.js` para correr la aplicación. para probar el servidor, ver sección [Realizar una Llamada](#realizar-una-llamada).

#### Crear un Repositorio
Para organizar el código de manera eficiente, se optó por el _[Patrón de Diseño de Repositorio](https://medium.com/@pererikbergman/repository-design-pattern-e28c0f3e4a30)_ que facilita manejar el procesamiento y transferencia de datos entre los clientes y el sistema de persistencia. Por ende, para crear un nuevo repositorio se necesita realizar lo siguiente. 
1. Crear un nuevo archivo en el directorio **src/Repositories/**, usando el estándar _{entidad}.repository.js_.
2. Importar el manejador de conexión con la base de datos.
    * `const DatabaseManager = require("../Database/database");`
3. Crear las siguientes funciones básicas
    * `createEntidad`
    * `getEntidad`
    * `getEntidades`
    * `updateEntidad`
    * `deleteEntidad`
        * Dado que no se va a borrar datos de la base de datos, puede dejar esta función vacía o con un `throw new Error("Not Implemented");`.
4. Para insertar datos en la base de datos con el manejador DatabaseManager use el siguiente método:
    * ```let values = `${val1}, ${vale}, ${val3}`;```
    * ```DatabaseManager.run(`INSERT INTO ${tableName} (col1, col2, col3) VALUES (${values})`);```
    * `tableName` se refiere a la variable que tiene el nombre de la tabla donde sale lo datos.
5. Para leer una fila de la tabla se usa:
    * ```let entidades = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE id = ${id} LIMIT 1`);```
    * Aún para leer una fila de datos, el `SELECT` siempre retorna una lista con una sola variable, por lo tanto, se extrae asi: `entidades[0]`
6. Para leer más de una fila solo se necesita remover `WHERE id = ${+id} LIMIT 1` al final del query anterior: ```let entidades = DatabaseManager.query(`SELECT * FROM ${tableName}`);```
7. Para actualizar una(s) fila(s), se necesita el siguiente código:
    * ```let result = DatabaseManager.run(`UPDATE ${tableName} SET ${params} WHERE id = ${id}`);```
    * Si el cambio fue exitoso, dentro de `result` existe un booleano que indicara un `1` para verdadero: `result.changes === 1`
8. Para terminar, exportar todas sus funciones con `module.exports = { func1, func2, ...}`

#### Crear un Servicio
Después de tener su capa de datos con su repositorio, la siguiente etapa es la crear un servicio que hace uso dicho repositorio. Este servicio representa la capa de negocio donde se define las restricciones y lógica para la manipulación y transferencia de datos entrando y saliendo. los siguientes pasos detallan como crear un servicio.
1. Crear un nuevo archivo en el directorio **src/Services/**, usando el estándar _{entidad}.service.js_.
2. Importar su nuevo repositorio y cualquier otro repositorio necesario para realizar un proceso.
    * `const EntitiesRepository = require('../../Repositories/{entidad}.repository');`
    * Si su servicio depende de otros repositorios pueden incluirlos. El repositorio más usado seria `const UsersRepository = require('../../Repositories/users.repository');`.
3. Crear las funciones que piensan necesarios para los usuarios según el objetivo del servicio, por ejemplo, UsersService para los procesos de creación y gestión de los usuarios, etc. Dado que ya definimos las funciones básicas para el repositorio, necesitaremos los mismos métodos en el servicio.
    * `registerEntidad`
    * `getEntidad`
    * `getEntidades`
    * `updateEntidad`
    * `deleteEntidad`
4. Por último, exportar todas sus funciones con `module.exports = { func1, func2, ...}`

#### Crear un Controlador y Router
La última capa para completar la arquitectura del API es el controlador que permite a los clientes realizar llamadas (requests) al servidor y transferir datos a la base de datos. Para crear un nuevo controlado solo se necesita seguir los pasos:
1. Crear un nuevo archivo en el directorio **src/Controllers/**, usando el estándar _{nombre}.controller.js_.
    * No es necesario llamar un controlador con el nombre de una entidad como los servicios y repositorios, ya que un controlador compilar varios servicios para agrupar puntos de acceso (endpoints) bajo el mismo prefijo de URL; ej. `/api/admin` para todos los URLs que usará los administradores y en globa varios servicios como UsersService, PrivilegesService, entre otro, se llamará _admin.controller.js_.
2. Importar todos los servicios necesarios
    * ```const UsersService = require("../../Services/Users/users.service");```
    * ```const PrivilegesService = require("../../Services/Privileges/privileges.service");```
3. Crear un punto de acceso con el siguiente formato:
    * `const funcion1 = (request, response) => { // tu código aquí}`
4. Cuando una función devuelva una respuesta, usa uno de los formatos siguientes:
    * `response.status(200);`, si no retorna un mensaje o objeto
    * `response.status(200).send("tu texto aquí");`
    * `response.status(200).json(miObjeto);`
5. Exportar todas sus funciones con `module.exports = { func1, func2, ...}`
6. En el mismo directorio, **src/Controllers/**, crear un segundo archivo llamado _{nombre}.route.js_. 
7. Importar la librería de ExpressJs y su nuevo controlador
    * `const express = require('express');`
    * `const AdminController = require('./admin.controller');`
8. Crear su Express router
    * `const adminRouter = express.Router();`
9. Con su nuevo router, definir el URL de sus distintos puntos de acceso, según el tipo de llamada (GET, POST, PUT, PATCH , o DELETE).
    * `adminRouter.post('/register-admin', AdminController.registerAdminUser);`
10. Exportar el router `module.exports = adminRouter;`
11. en el archivo, `src/server.js`, importar su router y asignarlo un URL prefijo.
    * `const { adminRouter, usersRouter } = require("./Controllers");`
    * `app.use('/api/admin', adminRouter);`

#### Realizar una Llamada
Para realizar una llamada, solo se necesita alguna aplicación cliente como [Postman API](https://www.postman.com/) o [Thunder Client for VS Code](https://www.thunderclient.com/), y seguir los pasos:
1. En su terminal de IDE ejecutar `node src/server.js`. Enseguida, el terminal le indicara en cual puerto el Backend API está atento a las llamadas. Por defecto el puerto es `3000`

![Ejecutar la Aplicación](https://github.com/cleyrolsc/proyectoIntegradoGrupo2/blob/backend-dev/Images/Ejecutar%20Node.png?raw=true)
2. Luego, en su aplicación de cliente, crear una llamada a `http://localhost:3000/{url}` y someter el pedido. 

![Llamada](https://github.com/cleyrolsc/proyectoIntegradoGrupo2/blob/backend-dev/Images/Llamada.png?raw=true)

### FrontEnd APP
TBD ...

