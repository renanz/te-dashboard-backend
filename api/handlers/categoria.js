const categorias = ["business","entertainment","general","health", "science", "sports", "technology"];

module.exports.list = {
  handler: function (req, reply) {
    return reply.response(categorias);
  }
};
