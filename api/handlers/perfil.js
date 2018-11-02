const Perfil = require('../models/perfiles');

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
    if (req.payload.inactivo) {
      attributes.inactivo = req.payload.inactivo;
    }
    Perfil.findByIdAndUpdate(
      req.params.id,
      attributes,
      { new: true },
      (err, perfil) => {
        if (err) {
          return reply(err).code(500);
        }
        return reply.response(perfil);
      }
    );
  }
};

module.exports.delete = {
  handler: function (req, reply) {
    if (!req.params.id) {
      return reply({ err: 'id es un parámetro requerido' }).code(400);
    }
    if (req.params.eliminar === 'true') {
      Perfil.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
          return reply.response({ err });
        }
        return reply.response({ msg: `Perfil con id ${req.params.id} eliminado` });
      });
    } else {
      Perfil.findByIdAndUpdate(req.params.id, { $set: {inactivo: true}}, { new: true }, (err) => {
        if (err) {
          return reply.response({ err });
        }
        return reply.response({ msg: `Perfil con id ${req.params.id} esta ahora inactivo` });
      });
    }
  }
};
