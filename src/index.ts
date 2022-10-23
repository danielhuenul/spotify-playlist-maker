import 'core-js/stable';
import 'regenerator-runtime/runtime';

import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import router from 'routes/router';
import ClientAdapter from './services/adapter/client.adapter';

async function bootstrap(){
  const app = express();

  app.set("PORT", process.env.PORT || "3200")

  app.use(cors());
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    ClientAdapter.interceptors.request.use(function (config) {
      const authorization = req.headers?.authorization || ""
      if (authorization) {
        config.headers.Authorization = `Bearer ${authorization}`
      }

      return config;
    });

    return next();
  });

  app.use(router);

  app.listen(app.get("PORT"), () => {
    console.log(`Simple server on port ${app.get("PORT")}`)
  })
}

bootstrap();
