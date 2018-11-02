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
