const fs = require('fs');

fs.copyFile('./seed', './data', function (err) {
    if (err) return err;
    console.log('The files have been copied');
});