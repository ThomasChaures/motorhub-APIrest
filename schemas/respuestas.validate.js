import yup from "yup";

export const respuestaSchema = yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    text: yup.string().required(),
    eliminado: yup.boolean()
})