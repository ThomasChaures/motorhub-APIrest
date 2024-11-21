import yup from "yup";

export const marcaSchema = yup.object({
  marca: yup.string().required(),
  autos: yup.array().required(),
  img: yup.string().required(),
  eliminado: yup.boolean(),
});
