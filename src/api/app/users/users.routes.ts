import { Router } from 'express';
import * as controller from './users.controller';

const api = Router();

api.post('/', controller.createUser);

export default api;
