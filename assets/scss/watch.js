const fs = require('fs');
const exec = require('child_process').exec;

function render( filename ) {
  const shell = exec('node-sass core.scss ../css/core.css');
  shell.stdout.on('data', function(data){
      console.log(data);
      // sendBackInfo();
      console.log('I\'m watching you, scss...')
  });

  shell.stderr.on('data', function(data){
      console.log(data);
      // triggerErrorStuff();
      console.log('I\'m watching you, scss...')
  });
}

fs.watch('theme', function (event, filename) {
    if (filename) {
        console.log('File changed: ' + filename);
        render( 'core.scss' )
    } else {
      //  console.log('filename changed');
    }
});

fs.watch('fonts', function (event, filename) {
    if (filename) {
        console.log('File changed: ' + filename);
        render( 'core.scss' )
    } else {
        //console.log('filename changed');
    }
});

fs.watch('icons', function (event, filename) {
    if (filename) {
        console.log('File changed: ' + filename);
        render( 'core.scss' )
    } else {
        //console.log('filename changed');
    }
});

console.log('I\'m watching you, scss...')
