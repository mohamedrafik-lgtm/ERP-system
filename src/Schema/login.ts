// import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export const LoginSchema = yup
  .object({
    nationalId: yup
      .string()
      .required("الرقم القومي مطلوب")
      .matches(
        /^\d{14}$/,
        "الرقم القومي يجب أن يكون 14 رقم"
      ),
    password: yup
      .string()
      .required("كلمة المرور مطلوبة")
      .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
    remember: yup
      .boolean()
      .default(true)
  })
  .required()

  