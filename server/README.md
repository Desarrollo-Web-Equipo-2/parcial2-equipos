# Consigna

```
Se desea crear una webapp para llevar la agenda de contactos de una empresa.

Esta agenda maneja información de personas (con, al menos, los siguientes datos: Nombres, Apellidos, e-mail, teléfono, empresa a la cual pertenece y notas adicionales) y empresas (con, al menos, la siguiente información: Nombre, sitio web y notas adicionales).

Se pretende contar con la siguiente funcionalidad:

Ingresar y eliminar personas
Buscar personas por nombre y apellido
Ingresar y eliminar empresas
Solo se podrá eliminar una empresa si esta no tiene personas asociadas
Listar todas las personas de la agenda
Listar todas las empresas de la agenda
Ver los datos de una persona
Ver los datos de una empresa
Usted debe diseñar e implementar, usando Express.JS, un backend para esta webapp.

Adicionalmente, debe trabajar en al menos uno de los siguientes ítems:

Implementar seguridad en la API REST
Se debe estar autenticado para realizar cualquiera de las operaciones mencionadas anteriormente
Implementar un front end que sea mobile-first utilizando Ionic
Nota: no es necesario implementar una capa de persistencia en el backend.
```

# Recursos

## User

```
    {
        id: number;
        username: string;
        password: string;
    }
```

## Person

```
    {
        id: number;
        userId: number;
        companyId: number;
        names: string;
        surnames: string;
        email: string;
        telephoneNumber: string;
        notes: string;
    }
```

## Company

```
    {
        id: number;
        userId: number;
        name: string;
        url: string;
        notes: string;
    }
```


# Endpoints

    POST /api/user
    BODY
        {
            username: string;
            password: string;
        }

    Crea un nuevo usuario (REGISTRO)

    RETORNA
        200
        {
            "id": <userid>,
            "username": <username>,
        }

        400 (si el usuario ya existe)
        {
            code: "USER_ALREADY_EXISTS
        }

    
    POST /api/auth/login
    BODY
        {
            username: string;
            password: string;
        }

    RETORNA
        200
        {
            id: <id>
            username: <username>
            token: string,
        }

        400 (credenciales inválidas)
        {
            code: "INVALID_USERNAME_PASSWORD_PAIR"
        }

    (CON HEADER Authoriztion: TOKEN)
    POST /api/person
    GET /api/person
    GET /api/person?name=xx&surname=yy
    GET /api/person/:id
    DELETE /api/person/:id

    POST /api/company
    GET /api/company
    GET /api/company/:id
    DELETE /api/company/:id