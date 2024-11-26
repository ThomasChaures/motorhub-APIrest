import yup from "yup";

export const comentarioSchema = yup.object({
    name: yup.string().required(),
    surname: yup.string().required(),
    text: yup.string().required(),
})