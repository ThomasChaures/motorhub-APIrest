import yup from "yup";

export const usuarioSchema = yup.object({

  name: yup.string().required(),
  surname: yup.string().required(),

  email: yup
    .string()
    .email("El email debe ser válido.")
    .required("El email es obligatorio."),

  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(16, "La contraseña no debe tener más de 16 caracteres.")
    .matches(/[0-9]/, "La contraseña debe tener al menos un número.")
    .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula.")
    .required("La contraseña es obligatoria."),

  passwordConfirm: yup
    .string()
    .required("La confirmación de la contraseña es obligatoria.")
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden."),

  role: yup.string(),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("El email debe ser válido.")
    .required("El email es obligatorio."),

  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .max(16, "La contraseña no debe tener más de 16 caracteres.")
    .matches(/[0-9]/, "La contraseña debe tener al menos un número.")
    .matches(/[A-Z]/, "La contraseña debe tener al menos una mayúscula.")
    .required("La contraseña es obligatoria."),
});
