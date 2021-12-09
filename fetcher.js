const request = require('request');
const fs = require('fs');
const readline = require('readline');
const userInput = process.argv.slice(2);

request(userInput[0], (error, response, body) => {
  readline.createInterface({
    input: fs.createReadStream(userInput[1]),
    output: fetcher(body)
  });
});

const fetcher = function(body) {
  fs.writeFile(userInput[1], body, err => {
    if (err) {
      return console.log("error");
    } else {
      const stats = fs.statSync(userInput[1]);
      const fileSizeInBytes = stats.size;
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${userInput[1]}.`);
    }
    return;
  });
};