// import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export const LoginSchema = yup
  .object({
    email: yup
      .string()
      .required("البريد الإلكتروني مطلوب")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "هذه ليس بريد الكتروني"),
    password: yup
      .string()
      .required("كلمة المرور مطلوبة")
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  })
  .required()

  