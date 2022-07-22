import express from 'express';
import cors from 'cors';

import { globalErrorMiddleware, userRouters, groupRouters, apiMethodLoggingMiddleware, jwtMiddleware, authRouters } from '../api';

const app = express();

app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.use(apiMethodLoggingMiddleware);
app.use(jwtMiddleware);

app.use(authRouters);
app.use(userRouters);
app.use(groupRouters);

app.use(globalErrorMiddleware);

export default app;
