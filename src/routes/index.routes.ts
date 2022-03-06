import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import Controller from '../controllers/index.controllers';

const routes = Router();
const controller = new Controller();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      aliexpressProductUrl: Joi.string().required(),
    },
  }),
  controller.postProduct,
);

export default routes;
