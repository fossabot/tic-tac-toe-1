import { Router } from 'express';

import users from './app/users/users.routes';

const api = Router();

api.use('/users', users);

export default api;
