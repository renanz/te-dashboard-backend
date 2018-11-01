const Perfil = require('../models/perfil');

module.exports.delete = {
  handler: function (req, reply) {
    if (!req.params.id) {
      return reply({ err: 'id es un parámetro requerido' }).code(400);
    }
    if (req.params.eliminar === 'false') {
      Perfil.findByIdAndDelete(req.params.id.trim(), (err, result) => {
        if (err) {
          // return reply(err).code(500);
          return reply.response({ err });
        }
        return reply.response({ msg: `Perfil con id ${req.params.id} eliminado` });
      });
    } else {
      Perfil.findByIdAndUpdate(req.params.id, { new: true }, { inactivo: true }, (err) => {
        if (err) {
          // return reply(err).code(500);
          return reply.response({ err });
        }
        return reply.response({ msg: `Perfil con id ${req.params.id} esta ahora inactivo` });
      });
    }
  }
};
