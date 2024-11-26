import yup from "yup";

export const tipoSchema = yup.object({
  tipo: yup.string().required(),
});
