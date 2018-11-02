const Home = require('./handlers/home');
const Perfil = require('./handlers/perfil');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    { method: 'POST', path: '/eliminar-perfil/{id}/{eliminar}', config: Perfil.delete },
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
