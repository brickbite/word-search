const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('../client'));

app.get('/word', (req, res, next) => {
  let searched = '';
  req.on('data', (chunk) => {
    // console.log('chunking..');
    searched += chunk;
  });
  req.on('end', () => {
    // console.log('data end', searched);
    // console.log(req.query.term);
    let found = [];
    fs.readFile('a.txt', (err, data) => {
      if (err) {
        res.status(500).send('Error');
        return;
      }
      data = data.toString().split('\n');
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].includes(req.query.term)) {
          // console.log(`found ${data[i]}`);
          found.push(data[i]);
        }
      }
      res.status(200).send(found);
      return;
    })
  });
});

app.listen(3000, () => {
  console.log('server listening on 3000');
});
