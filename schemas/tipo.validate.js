import yup from "yup";

export const tipoSchema = yup.object({
  tipo: yup.string().required(),
  autos: yup.array().required(),
  eliminado: yup.boolean(),
});
