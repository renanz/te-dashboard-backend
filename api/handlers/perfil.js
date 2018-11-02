const Perfil = require('../models/perfil');

module.exports.notFound = {
  handler: function(request, reply) {
    return reply({ result: "Oops, 404 Page!" }).code(404);
  }
};

module.exports.update = {
  handler: function(req, reply) {
    if (!req.params.id) {
      return reply({ err: "id es un parametro requerido" }).code(400);
    }
    let attributes = {};

    if (req.payload.nombre) {
      attributes.nombre = req.payload.nombre;
    }
    if (req.payload.categorias) {
      attributes.categorias = req.payload.categorias;
    }
    if (req.payload.busquedas) {
      attributes.busquedas = req.payload.busquedas;
    }
    Perfil.findByIdAndUpdate(
      req.params.id,
      attributes,
      { new: true },
      (err, company) => {
        if (err) {
          return reply(err).code(500);
        }
        return reply.response(company);
      }
    );
  }
};
