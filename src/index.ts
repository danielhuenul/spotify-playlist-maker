import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import router from 'routes/router';

async function bootstrap(){
  const app = express();

  app.set("PORT", process.env.PORT || "3200")

  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(router);

  app.listen(app.get("PORT"), () => {
    console.log(`Simple server on port ${app.get("PORT")}`)
  })
}

bootstrap();
