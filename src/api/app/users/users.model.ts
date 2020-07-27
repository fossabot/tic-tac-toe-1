import { genSalt, hash, compare } from 'bcrypt';
import { Document, Schema, model, Error as MongooseError } from 'mongoose';
import { NextFunction } from 'express';
import * as Joi from '@hapi/joi';

export type UserDocument = Document & {
  email: string;
  username: string;

  password: string;
  passwordResetToken: string;
  passwordResetExpires: Date;

  /**
   * @todo: Add profile-themed options.
   */

  comparePassword: comparePasswordFunction;

  createdAt: Date;
  updatedAt: Date;
};

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: Error, isMatch: boolean) => {}
) => void;

const validationString = {
  email: Joi.string().email().max(255).messages({
    'string.base': 'E-mail should be provided in text format.',
    'string.empty': 'E-mail should not be empty.',
    'string.max': 'E-mail should not contain more than {#limit} characters.',
    'string.email': 'E-mail field should be a valid e-mail address.',
    'any.required': 'E-mail is a required field.',
  }),
  username: Joi.string().alphanum().min(4).max(30).messages({
    'string.base': 'Username should be provided in text format.',
    'string.empty': 'Username should not be empty.',
    'string.min': 'Username should contain at least {#limit} characters.',
    'string.max': 'Username should not contain more than {#limit} characters.',
    'any.required': 'Username is a required field.',
  }),
  password: Joi.string().min(8).messages({
    'string.base': 'Password should be provided in text format.',
    'string.empty': 'Password should not be empty.',
    'string.min': 'Password should contain at least {#limit} characters.',
    'any.required': 'Password is a required field.',
  }),
  passwordConfirm: Joi.valid(Joi.ref('password')).messages({
    'any.valid': 'Repeated password is not equal the provided password.',
    'any.required': 'Password confirmation is a required field.',
  }),
};

export const createValidationSchema = Joi.object({
  email: validationString.email.required(),
  username: validationString.username.required(),
  password: validationString.password.required(),
  passwordConfirm: validationString.passwordConfirm.required(),
});

export const loginValidationSchema = Joi.object({
  username: validationString.email,
  password: validationString.password,
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },

    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', function save(next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return next();
  genSalt(10, (err: Error, salt: any) => {
    if (err) return next(err);
    hash(user.password, salt, (err: Error, encryptedPassword: string) => {
      if (err) return next(err);
      user.password = encryptedPassword;
      next();
    });
  });
});

const comparePassword: comparePasswordFunction = function (
  candidatePassword,
  cb
) {
  compare(
    candidatePassword,
    this.password,
    (err: MongooseError, isMatch: boolean) => {
      cb(err, isMatch);
    }
  );
};

userSchema.methods.comparePassword = comparePassword;

export const User = model<UserDocument>('User', userSchema);
