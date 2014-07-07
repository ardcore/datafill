#!/usr/bin/env node

var fs = require('fs');
var jsdom = require('jsdom');
var nomnom = require('nomnom');

function writeOutput(data) {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  };
  if (opts.output) {

    fs.writeFile(opts.output, data, "utf-8", function(err, data) {
      if (err) {
        return console.log("Error writing file: ", opts.output);
      }
      console.log( " [*] " + opts.input + " -> " + opts.output );
    });

  } else {
    console.log(data);
  }
}


function run(opts, cb) {
  var datafill = fs.readFileSync(__dirname + "/datafill-client.js", "utf-8");
  var adapter;

  try {
    adapter = fs.readFileSync(__dirname + "/" + opts.adapter, "utf-8");
  } catch(e) {
    console.log("Error loading adapter:", opts.adapter);
  }

  var html = fs.readFileSync(opts.input, "utf-8");

  if (!html) {
    return console.log("Error reading file: ", opts.input);
  }

  jsdom.env({
    html: html,
    src: [datafill, adapter],
    done: function(errors, window) {

      if (errors) {
        console.log("errors:", errors);
      }

      if (opts.pull) {

        window.datafill.init(null, true);
        output = window.datafill.grab();

      } else {

        window.datafill.init();
        window.datafill.fill();

        output = window.document.innerHTML;
      }

      cb(output);

    }
  })

}

function execute(opts, cb) {
  run(opts, cb)
}

if (require.main == module) {

  var opts = nomnom.script("datafill").options({
    input: {
      position: 0,
      list: false,
      required: true,
      help: "Input file to parse",
    },

    output: {
      position: 1,
      list: false,
      help: "Output file to write"
    },

     url: {
      abbr: "u",
      help: "URL to pull data from"
    },

    adapter: {
      abbr: "a",
      help: "API adapter",
      default: "adapters/simple.js"
    },

    language: {
      abbr: "l",
      help: "Language of data to fill"
    },

    pull: {
      abbr: "p",
      flag: true,
      help: "Pull data from input file"
    }
  }).nocolors().parse();

  run(opts, function(output) {
    writeOutput(output);
  });

}

exports.execute = execute;
