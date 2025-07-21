import { z } from 'zod/v4';

const validateSchema = (schmema) => (req, res, next) => {
  const { error, data } = schmema.safeParse(req.body);

  if (error) {
    const prettyErrorMessage = z.prettifyError(error);
    throw new Error(prettyErrorMessage, { cause: 400 });
  }

  next();
};


export default validateSchema;