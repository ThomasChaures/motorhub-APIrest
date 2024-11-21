import yup from "yup";

export const vendedorSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),
  email: yup.string().email().required(),
  autos_vendiendo: yup.array().required(),
  eliminado: yup.boolean(),
});
