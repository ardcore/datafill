# datafill

Simple data filler with client and server-side versions and custom adapters.

# Usage:

## Command line:

    node datafill <input> <output> [options]

    Usage: datafill <input> [output] [options]

    input      Input file to parse
    output     Output file to write

    Options:
       -u, --url        URL to pull data from
       -a, --adapter    API adapter  [adapters/simple.js]
       -l, --language   Language of data to fill
       -p, --pull       Pull data from input file

  (installation: `npm install`)

## As module:

    var df = require('./datafill');
    df.execute({
      input: "../example/index.html",
      pull: true,
      adapter: "adapters/simple.js"
    }, function(output) {
      console.log(output)
    })

## Client-side:

    <script type="text/javascript" src="../lib/datafill-client.js" /></script>
    <script type="text/javascript" src="../lib/parsers/simple.js" /></script>

    <script type="text/javascript">

      datafill.init();
      datafill.fill();

    </script>


## Custom adapters:

Copy and modify `adapters/simple.js`. Each adapter must export `parse` method, which should accept and return data with adjustments. Magic `exports` wrapper is required, because this file can be called on both server and client side.
