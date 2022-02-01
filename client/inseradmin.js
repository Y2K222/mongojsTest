var request = require('request');
var options = {
  method: "POST",
  url: "http://localhost:3000/admin",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "susu",
    age: "32",
    email: "susu@gmail.com",
  }),
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
