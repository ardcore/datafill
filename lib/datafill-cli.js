#!/usr/bin/env node

var fs = require('fs');
var jsdom = require('jsdom');
var nomnom = require('nomnom');

var opts = nomnom.script("datafill-cli").options({
  input: {
    position: 0,
    list: false,
    required: true,
    help: "Input file to parse",
  },

  output: {
    position: 1,
    list: false,
    required: true,
    help: "Output file to write",
  },

  url: {
    abbr: "u",
    flag: true,
    help: "URL to pull data from"
  },

  adapter: {
    abbr: "p",
    flag: true,
    help: "API adapter",
    default: "adapters/simple.js"
  },

  language: {
    abbr: "l",
    flag: true,
    help: "Language of data to fill"
  }
}).nocolors().parse();

var datafill = fs.readFileSync("./datafill.js", "utf-8");
var adapter = fs.readFileSync(opts.adapter, "utf-8");

var html = fs.readFileSync(opts.input, "utf-8");

if (!html) {
  return console.log("Error reading file: ", opts.input);
}

var output;

jsdom.env({
  html: html,
  src: [datafill, adapter],
  done: function(errors, window) {

    if (errors) {
      console.log("errors:", errors);
    }

    window.datafill.init();
    window.datafill.fill();

    output = window.document.innerHTML;

    fs.writeFile(opts.output, output, "utf-8", function(err, data) {
      if (err) {
        return console.log("Error writing file: ", opts.output);
      }
      console.log( " [*] " + opts.input + " -> " + opts.output );
    });

  }
})


