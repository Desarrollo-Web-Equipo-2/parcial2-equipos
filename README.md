# Recursos

## User

Administrador de la agenda.

```
    {
        id: number;
        username: string;
        password: string;
    }
```

## Person

Trabajador perteneciente a una empresa

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

```
POST /api/user
BODY (Json)
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
```


```
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
```

Los siguientes reciben el token devuelto por /api/auth/login en el header: "Authorization"


```
POST /api/company
BODY
    {
        "name": string,
        "url": string,
        "notes": string
    }
RETORNA
    200
    {
        "id": number,
        "userId": number,
        "name": <name>,
        "url": <url>,
        "notes": <notes>
    }

    401:
    {
        code: "INVALID_TOKEN"
    }
```

```
GET /api/company
RETORNA
    200
    [
        {
            "id": 1,
            "userId": 1,
            "name": "C2",
            "url": "b.com",
            "notes": "Chau"
        }
    ]
```

```
GET /api/company/:id
```

```
DELETE /api/company/:id
```

```
POST /api/person
BODY
    {
        "names": string,
        "surnames": string,
        "companyId": number,
        "email": string,
        "telephoneNumber": string,
        "notes": string,
    }
RETORNA
    200
    {
        "id": number,
        "companyId": <companyId>,
        "userId": number,
        "names": <names>,
        "surnames": <surnames>,
        "email": <email>,
        "telephoneNumber": <telephoneNumber>,
        "notes": <notes>
    }

    404 (si companyId no es una companía válida)
    {
        code: "COMPANY_NOT_FOUND"
    }

    401
    {
        code: "INVALID_TOKEN"
    }

```
    GET /api/person
    GET /api/person?name=xx&surname=yy
    GET /api/person/:id
    DELETE /api/person/:id
