import express  from 'express';
import jwt from 'jsonwebtoken';
import { ValidatedRequest } from 'express-joi-validation';

import { getUserByCredentials } from '../../services';
import { controllersErrorLogger, loginSchemaValidator } from '../middelwares';
import { config } from '../../config/environment';
import { LoginRequestSchema } from '../../types';

const router = express.Router();

router.route('/login')
  .post(
    loginSchemaValidator,
    async (req: ValidatedRequest<LoginRequestSchema>, res, next) => {
      const { login, password } = req.body;

      try {
        const user = await getUserByCredentials(login, password);

        if (!user) {
          res.status(400).send('Incorrect login and/or password have been provided');
        } else {
          jwt.sign({ login, password }, config.jwtSecret, (err: Error | null, token: string | undefined) => {
            if (err) {
              throw err;
            } else {
              res.status(200).send({ token });
            }
          });
        }
      } catch (error) {
        controllersErrorLogger(error, req);
        return next(error);
      }
    }
  );

export const authRouters = router;
