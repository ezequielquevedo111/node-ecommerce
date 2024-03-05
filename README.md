# FAZT ECOMMERCE

# Primer desafío el cuál consiste en desarrollar dos clases distintas con difentes métodos.

1. Primero creo la clase con teniendo un metodo create el cuál se la pasará luego la información para crear luego varias instancias.
2. Inicializo la instacia en una variable para luego utilizar el método create para crear multiples.
3. Muestro en consola el resultado de ambos.

# Segundo desafío el cuál consiste en agregarle la persistencia de los datos mediantes los módulos FS.

1. Primero importo los módulos anteriormente mencionados y declaro variables iniciales y de configuración.
2. Modifico los metodos create, read y readOne agregandole la funcionalidad.
3. Muestro en consola el resultado de ambos casos creando los archivos JSON correspondientes.

# Tercer desafío realizo la creación del servidor con distintos endpoints utilizando Express.

1. Primero realizo la creación del servidor con sus configuraciones.
2. Configuro y creo los distintos endpoints utilizando los métodos de las clases product/fs y user/fs.
3. Muestro en el navegador los distintos resultados.

# Primera Pre Entrega.

1. Configuro carpetas Public, Routers, Middlewares, Api y Views, además agrego el archivo utils que utilizo para configurar dirname.
2. Creo el manager de ordenes con sus respectivo ruteo junto a los demás Middlewares para manejar los errores, además de agregarle el next correspondiente en cada try catch de los endpoints.
3. Testeo los endpoints solicitados en Postman.

# Cuarto desafío se agrega Handlebars para crear plantillas y se agrega Socket.io para renderizar productos en tiempo real.

1. Agregamos la correspondiente configuración instalando Handlebars y Socket.io además de inicializar ya sea en el archivo server como en las carpetas views.
2. Modifico vistas para que se vincule Handlebars y Socket.io agregandole además la carpeta utils la cual será de reutilización para los middlewares.
3. Testeo las vistas en localhost y realizo capturas.

# Quinto desafío se agrega MongoDB y se realiza manager con models y configuro métodos con el mismo.

1. Configuramos MongoDB.
2. Configuramos el manager, models y endpoints.
3. Testeo en postman y realizo capturas.

# Segunda Pre Entrega.

1. Agrego paginate a cada manager con la correspondiente population dependiendo el caso.
2. Modifico ciertos endpoints adaptandolos ya que en el caso del método de read se empieza a utilizar el método paginate anteriormente mencionado, y sobre todo se le aplica un parseo para luego leer la data en las vistas.
3. Configuro el router de views para poder fetchear la data en la vista principal y poder hacer la busqueda a través de un input y tener la paginación.
4. Testeo cada endpoint y saco capturas.

# Sexto desafío se agrega cookies y sessions con express-session y connect-mongo.

1. Instalo las dependencias correspondientes y configuro en el archivo server el middleware de session.
2. Configuro los endpoints de sessions con sus respectivos middlewares y utils para realizar validaciones.
3. Testeo en postman y realizo capturas.

# Septimo desafío se agrega passport y JWT.

1. Instalo las dependencias correspondientes y configuro los endpoints correspondientes.
2. Modifico middlewares adaptando las sesiones con el token.
3. Testeo y realizo capturas.

# Octavo desafío se agrega Policies, CustomRouter

1. Cambiamos el enroutamiento de todos los endpoints manejando solamente con el customRouter, modifico cada endpoint.
2. Genero las policies para que cada usuario solo pueda acceder a la vista/endpoint permitida y generamos las responses genericas.
3. Testeamos y realizamos capturas.
