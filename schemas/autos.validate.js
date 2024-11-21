import yup from "yup";

export const autoSchema = yup.object({
  img: yup.string().required(),
  brand: yup.string().required(),
  model: yup.string().required(),
  type: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().integer(),
  year: yup
    .number()
    .required()
    .min(1970, "El año como minimo debe ser: 1970")
    .max(2024, "El año como maximo debe ser: 2024"),
  engine: yup.string().required(),
  vendedor: yup.string().nullable(),
  usage: yup.string().nullable().required(),
  status: yup.string().required(),
  horsepower: yup.number().required(),
  eliminado: yup.boolean(),
  comments: yup.array().required()
});
