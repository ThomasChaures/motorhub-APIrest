import yup from "yup";

export const autoSchema = yup.object({
  img: yup.string().required(),
  brand: yup.string().required(),
  modelo: yup.string().required(),
  modelo: yup.string().required(),
  tipo: yup.string().required(),
  descripcion: yup.string().required(),
  price_usd: yup.number().required().integer(),
  year: yup
    .number()
    .required()
    .min(1970, "El año como minimo debe ser: 1970")
    .max(2024, "El año como maximo debe ser: 2024"),
  engine: yup.string().required(),
  vendedor: yup.string().nullable(),
  status: yup.string().nullable(),
  horsepower: yup.number().required(),
  link: yup.string().url().nullable(),
});
