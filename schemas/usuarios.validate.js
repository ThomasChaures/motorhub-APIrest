import yup from "yup";

export const usuarioSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .max(16)
    .matches(/[0-9]/, "La contrase;a debe tener al menos un numero.")
    .matches(/[A-Z]/, "La contrase;a debe tener al menos una mayuscula."),
  passwordConfirm: yup
    .string()
    .required()
    .oneOf([yup.ref("password")]),
});

export const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .max(16)
    .matches(/[0-9]/, "La contraseña debe tener al menos un número.")
    .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula.")
    .required(),
});
