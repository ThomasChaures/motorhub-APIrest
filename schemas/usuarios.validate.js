import yup from "yup";

export const usuarioSchema = yup.object({
  name: yup.string().required(),
  surname: yup.string().required(),

  email: yup.string().email().required(),

  password: yup
    .string()
    .min(8)
    .max(16)
    .matches(/[0-9]/)
    .matches(/[A-Z]/)
    .required(),

  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),

  role: yup.string(),

  eliminado: yup.boolean()
});

export const loginSchema = yup.object({
  email: yup.string().email().required(),

  password: yup
    .string()
    .min(8)
    .max(16)
    .matches(/[0-9]/)
    .matches(/[A-Z]/)
    .required(),
});
