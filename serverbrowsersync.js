

// https://browsersync.io/docs/options
// https://browsersync.io/docs/api
// require the module as normal
import {create} from 'browser-sync';

const browserSync = create();

// Start the server
browserSync.init({
    port: 8080
  , open: false // auto open tab window
  //, overrideURL:  'http://localhost:8080'
  //, proxy: {
    //target: "localhost:8080",
    //ws: true
  //}
  , watch: true
  , server: "./public"
  // index: "index.html"
  , callbacks: {

    ready: function(err, bs) {
      //handle redirect to default page
      bs.addMiddleware("*", function (req, res) {
        // code 302
        res.writeHead(200, {
            //location: "404.html"
            location: "/"
        });
        res.end("Redirecting!");
      });

    }
  }
});

browserSync.watch([
  'public/*.css'
  , 'public/*.js'
], {ignored: '*.html'});

//browserSync.reload("*.js");
// multiple files
//bs.reload(["styles.css", "ie.css"]);

//browserSync.reload("core.css");
//browserSync.reload("*.html");

// and call any methods on it.
//browserSync.watch('*.html').on('change', bs.reload);