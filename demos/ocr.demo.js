var tesseract = require('node-tesseract');

var options = {l:'eng', psm: 6, load_system_dawg: true};

// Recognize text of any language in any format
tesseract.process(__dirname + '/pictures/verificationimage.jpg', options, function(err, text) {
    if(err) {
        console.error(err);
    } else {
        console.log(text);
    }
});
