import * as Yup from "yup"

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Enter a valid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must contain at least 8 characters")
        .matches(/^(?=.*[0-9])(?=.*[A-Z]).*/, "Password must contain at least 1 upper letter and at least on number")
        .required("Password is required")
})

export default validationSchema;