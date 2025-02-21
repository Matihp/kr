import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';

export const validate = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validar el body contra el schema de Zod
      const validatedData = await schema.parseAsync(req.body);
      
      // Reemplazar el body con los datos validados y transformados
      req.body = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Error de validación',
          errors: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message
          }))
        });
      }

      console.error('Error en la validación:', error);
      return res.status(500).json({
        message: 'Error interno en la validación',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
};