import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import livereload from 'livereload';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var server = livereload.createServer();
server.watch(__dirname + "/public");

console.log("watch live reload...");