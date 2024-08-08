'use strict';

import { default as express } from 'express';
export const app = express();

//solve cors issue
import { default as cors } from 'cors';
app.use(cors());

import {default as bodyParser} from 'body-parser'
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.set('port', (process.env.BACKEND_PORT || 3009));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

import { createServer } from "http";
const server = createServer(app);

//WebSocket////////////////////////////////////////////
import {socket_module_ws} from './utilities/socket_ws.js'
await socket_module_ws(server)

///////////////////////////////
import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));
//routes///////////////////////////////////////////////////////////////
import { router as indexRouter } from './routes/index.mjs';
app.use('/', indexRouter);

/////////////////////////////////////////////////////////
server.listen(app.get('port'), () => {
  console.log(`Find the server at: http://${process.env.LOCAL_IP}:${app.get('port')}/`); // eslint-disable-line no-console
});
