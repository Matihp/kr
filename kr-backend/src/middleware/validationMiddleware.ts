import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate as classValidate } from 'class-validator';

export const validate = (dto: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Convertimos el body a una instancia de la clase DTO
    const dtoObject = plainToInstance(dto, req.body);

    // Validamos
    const errors = await classValidate(dtoObject, {
      whitelist: true,
      forbidNonWhitelisted: true
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map(error => ({
        property: error.property,
        constraints: error.constraints
      }));

      return res.status(400).json({
        message: 'Error de validación',
        errors: formattedErrors
      });
    }

    // Si no hay errores, continuamos
    next();
  };
};