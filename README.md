# datafill

Simple data filler with client and server-side versions and custom adapters.

# Usage:

## Server-side:

    node datafill-cli <input> <output> [options]

    input      Input file to parse
    output     Output file to write

    Options:
       -u, --url        URL to pull data from
       -p, --parser     Data parser  [parsers/simple.js]
       -l, --language   Language of data to fill

    (installation: `npm install`)

## Client-side:

    <script type="text/javascript" src="../lib/datafill.js" /></script>
    <script type="text/javascript" src="../lib/parsers/simple.js" /></script>

    <script type="text/javascript">

      datafill.init();
      datafill.fill();

    </script>


## Custom adapters:

Copy and modify `adapters/simple.js`. Each adapter must export `parse` method, which should accept and return data with adjustments. Magic `exports` wrapper is required, because this file can be called on both server and client side.