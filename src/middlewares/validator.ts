import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";

export const validator =
  (schema: Schema) =>
  (request: Request, response: Response, next: NextFunction) => {
    const data = {
      ...request.params,
      ...request.body,
    };

    const { error } = schema.validate(data);
    if (error) {
      return response
        .status(400)
        .json({ status: 400, message: error.details[0].message });
    }

    next();
  };
