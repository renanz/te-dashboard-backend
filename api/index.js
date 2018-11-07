const Home = require('./handlers/home');
const Perfil = require('./handlers/perfil');
const Categorias = require('./handlers/categoria');

exports.register = (plugin, options, next) => {

  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/restricted', config: Home.restricted },
    { method: 'GET', path: '/{path*}', config: Home.notFound },
    { method: 'POST', path: '/editar-perfil/{id}', config: Perfil.update },
    { method: 'POST', path: '/eliminar-perfil/{id}/{eliminar}', config: Perfil.delete },
    { method: 'POST', path: '/crear-perfil', config: Perfil.create },
    { method: 'GET', path: '/listar-categorias', config: Categorias.listar}
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};
