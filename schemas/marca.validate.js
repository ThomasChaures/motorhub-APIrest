import yup from "yup";

export const marcaSchema = yup.object({
  marca: yup.string().required(),
  img1: yup.string().required(),
});
