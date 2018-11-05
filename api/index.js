const Home = require('./handlers/home');
const Perfil = require('./handlers/perfil');
const Fuentes = require('./handlers/fuente');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    { method: 'POST', path: '/eliminar-perfil/{id}/{eliminar}', config: Perfil.delete },
    { method: 'GET', path: '/listar-fuentes', config: Fuentes.get },
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
