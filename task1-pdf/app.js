const express = require('express');
const cors = require('cors');
const db = require('./db');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const config = require('./config');

const app = express();
app.use(cors());

app.get('/:firstName', (req, res) => {
  const firstName = req.params.firstName;
  console.log(firstName);
  db.query('select * from users where firstName=?;', [firstName], (err, results, fields) => {
    if (err) {
      console.log(err);
      res.send(false);
    } else {
      const user = results[0];
      if (!user) {
        console.log('no such user');
        res.send(false);
      } else {
        let image = `data:image/png;base64,${user.image.toString('ascii')}`;
        let document = new PDFDocument();
        let writeStream = document.pipe(fs.createWriteStream(config.pdf));
        document.fontSize(25)
            .text(user.firstName + ' ' + user.lastName, 20, 20)
            .image(image, 20, 50)
            .save();

        document.end();

        writeStream.on('finish', () => {
          let readStream = fs.createReadStream(config.pdf);
          let resBuffer;
          readStream.on('readable', () => {
            let buf = readStream.read();
            if (buf) {
              if (resBuffer) {
                resBuffer = Buffer.concat([resBuffer, buf]);
              } else {
                resBuffer = buf;
              }
            } else {
              db.query('update users set pdf=? where firstName=?', [resBuffer, firstName], (err, results, fields) => {
                if (err) {
                  console.log(err);
                  res.send(false);
                } else {
                  console.log('success');
                  res.send(true);
                }
              });
            }
          });
        });
      }
    }
  })
});

app.listen(config.port, () => {
  console.log(`server listening ${config.port}...`);
});