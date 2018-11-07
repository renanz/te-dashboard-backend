var categorias = ["business","entertainment","general","health", "science", "sports", "technology"];

module.exports.listar = {
  handler: function (req, reply) {
    return reply.response(categorias);
  }
};