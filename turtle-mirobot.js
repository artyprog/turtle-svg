(function () {

  var mb;

  window.TurtleMirobot = function(options) {
    if (!options || !options.address || !options.commands) {
      return;
    }

    var commands = []
    var paths = options.commands;
    for (var i = 0, len=paths.length; i<len; i++) {
      path = paths[i];
      if (path.commands && path.commands.length) {
        commands = commands.concat(path.commands);
      }
    }

    var index = 0
    var next = function (status, msg) {
      console.log(arguments);
      if (status !== 'complete') {
        console.log(' a');
        return;
      }
      if (commands[index]) {
        console.log('sending '+index, commands[index]);
        var cmd = {
          cmd: commands[index].cmd,
          arg: commands[index].arg
        };
        mb.send(cmd, next);
        index++;
      }
    };
    var nextInABit = function (status, msg) {
      console.log("f");
      setTimeout(function(){
        next('complete');
      }, 500);
    };

    if (mb){
      nextInABit();
    } else {
      mb = new Mirobot(options.address, nextInABit);
    }
    console.log(mb);

  };

})()
