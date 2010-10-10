var Faye   = require('faye'),
    server = new Faye.NodeAdapter({mount: '/'}),
    sys    = require('sys'),
    port   = process.ARGV[2] || 8000;

server.listen(8000);
sys.puts("Gibbering on " + port);