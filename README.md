# node-ecommerce

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
