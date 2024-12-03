import { plainToInstance } from "class-transformer";

import { validate, ValidationError } from "class-validator";

import { NextFunction, Request, Response } from "express";

export const validateDto = (dtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    validate(dtoInstance).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        return res.status(400).json(
          errors.map((error) => {
            if (error.constraints) {
              return Object.values(error.constraints);
            }
            return "Error de validación.";
          })
        );
      }

      next();
    });
  };
};
