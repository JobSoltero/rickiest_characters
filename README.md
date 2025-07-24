# Rickiest Characters

Una aplicación web para explorar personajes de la serie Rick and Morty, ver sus detalles y guardar tus favoritos. Este proyecto está construido con Next.js, React, Redux Toolkit y Redux Saga.

## Empezando

Sigue estas instrucciones para tener una copia del proyecto corriendo en tu máquina local para desarrollo y pruebas.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:
- Node.js (se recomienda v18 o superior)
- npm (normalmente viene con Node.js)

### Instalación

1.  Clona el repositorio en tu máquina local:
    ```bash
    git clone https://github.com/tu-usuario/rickiest_characters.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd rickiest_characters
    ```
3.  Instala todas las dependencias del proyecto:
    ```bash
    npm install
    ```

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

### `npm run dev`

Inicia la aplicación en modo de desarrollo.
Abre http://localhost:3000 para verla en tu navegador. La página se recargará automáticamente si haces cambios en el código.

### `npm run dev:api`

Para que la funcionalidad de "Favoritos" funcione, necesitas un servidor de API simulado. Este proyecto está configurado para usar `json-server`.

En una **terminal separada**, ejecuta el siguiente comando para iniciar la API de favoritos:
```bash
npx json-server --watch db.json --port 3001
```
Esto iniciará un servidor en `http://localhost:3001` que leerá y escribirá en el archivo `db.json`.

### `npm test`

Ejecuta los tests unitarios en modo interactivo (watch mode).
Esto utiliza **Jest** y **React Testing Library** para probar los componentes y la lógica de Redux. Los tests se volverán a ejecutar automáticamente cada vez que guardes un cambio en un archivo.

### `¿Qué es lo que más te gustó de tu desarrollo?`

Conocer la tecnologia de json-server, esta muy practica

### `Si hubieras tenido más tiempo ¿qué hubieras mejorado o qué más hubieras hecho?`

Desarrollar la funcionalidad de busqueda y paginado basado en el api de rick y morty y no de manera local, ademas de agregar la busqueda en la vista movil, detallar mas la UI 

### `Descríbenos un pain point o bug con el que te hayas encontrado y como lo solucionaste.`

Al momento de desarrollar la funcionalidad de favoritos, tuve varios bugs debido a que estaba manejando las ID como numeros mientras que el JSON-Server las maneja como strings, entonces tuve que cambiar los tipados para manejar strings.
