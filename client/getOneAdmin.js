var request = require('request');
var options = {
  'method': 'GET',
  'url': 'http://localhost:3000/admin/61f8e57363d33cb5141faaf8',
  'headers': {
    'Content-Type': 'application/json'
  },
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
