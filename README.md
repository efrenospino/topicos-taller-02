# APIRest

## Diseño de aplicaciones Web

1. Download the repository
```
git clone https://github.com/efrenospino/diseno-aplicaciones-web.git
```
2. Go to directory diseno-aplicaciones-web
```
cd diseno-aplicaciones-web
```
3. Install the app
```
npm install
```
4. Create .env file

```
ENV=development | production
DEV_DATABASE_HOST=
DEV_DATABASE_NAME=
PROD_DATABASE_HOST=
PROD_DATABASE_NAME=
PROD_DATABASE_USER=
PROD_DATABASE_PASSWORD=
SERVER_LOGS_DIR=
SERVER_PORT=
SERVER_HOST=
SECRET_KEY=
TOKEN_KEY=
```

5. To run the app on production mode
```
npm start
```

6. To run the app on development mode
6.1 Install nodemon
```
npm i nodemon -g
```
6.2 Run
```
npm run dev
```
7  To run tests
```
npm run test
```

# Libraries
- https://www.npmjs.com/package/express
- https://www.npmjs.com/package/mongoose
- https://www.npmjs.com/package/dotenv
- https://www.npmjs.com/package/morgan
- https://www.npmjs.com/package/path
- https://www.npmjs.com/package/fs
- https://www.npmjs.com/package/crypto-js
- https://www.npmjs.com/package/bcrypt
- https://www.npmjs.com/package/jsonwebtoken
- https://www.npmjs.com/package/jest

# Contributors
- Efren Ospino
- Daniel Gómez
- Daniel Herrera Amell
- Fireman Pineda

# Documentación
El programa consta de una API REST, con manejo de acceso en NODEJS. Consta de:
- /api/users/
```
Get: Obtienes todos los usuarios si estas autenticado.
```
```
Post: Creas un usuario, si le envías en formato json la estructura correcta:

{
name: “string” ,age: “Number”, username : “string” , password: “string”
,email: “string” , telephones: [“string” ], birthdate: “string”  YYYY-MM-
DD
}
```
```
Delete: Elimina 1 usuario.
```
- /api/users /tweets/count
```
Get: Devuelve el numero de tweets de un usuario, cuyo Id es enviado en
formato Json.
```
- /api/users /:id
```
Get: Obtiene un usuario por el ID.
```
```
Update: Modifica un usuario por el Id.
```
- /api/users /:id/tweets
```
 Get: Obtiene los tweets de un usuario.
```
- /api/users /login
```
Post: Es el login para un usuario, el cual devulve un json-web-tocken.
```
- /api/tweets/
```
Get: Realiza un obtener todos los tweets.
```
```
Post: Crea un tweet para un usuario logueado.
```
```
Delete: Elimina un tweet solo si es del usuario logueado.
```
- /api/tweets/lasts/:count
```
Get: Se obtienen los últimos “N” tweet de un usuario autenticado.
```
- /api/tweets /top/commenters/:count
```
Get: Se obtienen los “N” tweets con mas comentarios.
```
- /api/tweets /:id
```
Get: Obtienen un tweet por el id.
```
```
Put: Modifica un tweet por el id.
```
- /api/tweets /:id/comment
```
Post: Crea un comentario.
```
```
Delete: Elimina un comentario.
```
- /api/tweets /:id/comments/count
```
Get: Trae el numero de comentarios en un tweet.
```
- /api/tweets/top/:count
```
Get: Trae los últimos “N” tweet, con más comentarios.
```