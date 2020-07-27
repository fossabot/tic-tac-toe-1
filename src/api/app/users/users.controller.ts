import {
  User,
  UserDocument,
  createValidationSchema,
  loginValidationSchema,
} from './users.model';
import { Request, Response, NextFunction } from 'express';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = createValidationSchema.validate(req.body);
    if (error)
      return next({
        status: 400,
        message: error.message,
      });
    const { email, username, password } = req.body;
    const userCheck = await User.findOne({ $or: [{ email }, { username }] });
    if (userCheck)
      return next({
        status: 409,
        message:
          'Account with provided username or e-mail address already exists in our database.',
      });
    new User({
      email,
      username,
      password,
    }).save();
    res.status(201).json({
      message: 'User successfully created!',
    });
  } catch {
    return next({
      status: 500,
      message: 'Unexpected error occured!',
    });
  }
};
