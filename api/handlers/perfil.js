const Perfil = require('../models/perfiles');

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

module.exports.create = {
  
  handler: function (req, reply) {
    if (!req.payload.nombre) {
      return reply({ er: 'nombre es requirido' }).code(400);
    }

    if (!req.payload.categorias) {
      return reply({ er: 'requiere al menos una categoria' }).code(400);
    }

    if (!req.payload.busquedas) {
      return reply({ er: 'requiere al menos una busqueda' }).code(400);
    }

    Perfil.create({
      nombre: req.payload.nombre,
      categorias: req.payload.categorias,
      busquedas: req.payload.busquedas,
      inactivo: false
    }, (err) => {
      if (err) {
        return reply(err).code(500);
      }
      return reply.response({msg: 'Perfil creado con exito' });
    });
  }
};
