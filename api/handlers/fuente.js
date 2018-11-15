var request = require('request');

module.exports.get = {
  handler: (req, reply) => {
    request('https://newsapi.org/v2/sources?apiKey=e16a574134f74d72a50d1ebb7c05b7b5',
      function (err, response, body) {
        if (err) {
          return reply.response({ err });
        }
        const bodyJSON = JSON.parse(body);
        const sources = Array.from(bodyJSON.sources).map(function (s) {
          return { id: s.id, source: s.name };
        });
        return reply.response(sources);
      });
  }
};
