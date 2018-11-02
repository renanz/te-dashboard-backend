const Home = require('./handlers/home');
const Perfil = require('./handlers/perfil');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    { method: 'POST', path: '/actualizar-perfil/{id}', config: Perfil.update },
    { method: 'POST', path: '/eliminar-perfil/{id}/{eliminar}', config: Perfil.delete },
    { method: 'POST', path: '/crear-perfil', config: Perfil.create }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
