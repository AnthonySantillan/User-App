# Proyecto Angular - Gestión de Usuarios

Este proyecto frontend está desarrollado en Angular y proporciona funcionalidades completas para la gestión de usuarios, incluyendo operaciones CRUD (Crear, Leer, Actualizar, Eliminar) con su conexion a backend realizado en Spring Boot.

## Características

- **Creación de Usuarios:** Permite a los usuarios crear nuevas cuentas en el sistema.
- **Visualización de Usuarios:** Muestra la lista de usuarios registrados.
- **Edición de Usuarios:** Permite actualizar la información de los usuarios existentes.
- **Eliminación de Usuarios:** Permite eliminar usuarios del sistema.

## Requisitos previos

- Node.js y npm instalados
- Angular CLI (Command Line Interface) instalado globalmente

## Configuración

1. Clonar este repositorio en tu máquina local.
2. Navegar al directorio del proyecto:
   ```bash
   cd nombre_proyecto
3. Instalar las dependencias del proyecto:
    ```bash
   npm install
5. Iniciar el servidor de desarrollo:
   ```bash
   ng serve
## Estructura del Proyecto

- **src/app/components:** Contiene los componentes de Angular relacionados con la gestión de usuarios.
- **src/app/services:** Contiene los servicios Angular para la comunicación con el backend.
- **src/app/models:** Contiene los modelos de datos utilizados en la aplicación.
  
## Pendiente actualización
- **src/app/guards:** Contiene los guards de ruta para la autenticación y autorización.
- **src/app/auth:** Contiene componentes de registro e inicio de sesión. 

## Tecnologías Utilizadas

- Angular 17
- TypeScript
- HTML/CSS
- Backend (separado, puede ser desarrollado en Spring Boot, Node.js u otra tecnología compatible)
