import * as yup from 'yup';

// User creation validation schema
export const createUserSchema = yup.object({
  name: yup
    .string()
    .required('الاسم مطلوب')
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(50, 'الاسم يجب أن يكون أقل من 50 حرف'),
    
  email: yup
    .string()
    .required('البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح')
    .max(100, 'البريد الإلكتروني يجب أن يكون أقل من 100 حرف'),
    
  phone: yup
    .string()
    .required('رقم الهاتف مطلوب')
    .matches(/^(\+20|0)?1[0-9]{9}$/, 'رقم الهاتف غير صحيح')
    .min(10, 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل')
    .max(15, 'رقم الهاتف يجب أن يكون أقل من 15 رقم'),
    
  password: yup
    .string()
    .required('كلمة المرور مطلوبة')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    .max(50, 'كلمة المرور يجب أن تكون أقل من 50 حرف')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'كلمة المرور يجب أن تحتوي على حرف صغير وحرف كبير ورقم'
    ),
    
  accountType: yup
    .string()
    .oneOf(['STAFF', 'INSTRUCTOR'], 'نوع الحساب غير صحيح')
    .required('نوع الحساب مطلوب'),
    
  roleId: yup
    .string()
    .optional()
    .max(50, 'معرف الدور يجب أن يكون أقل من 50 حرف')
});

// User update validation schema
export const updateUserSchema = yup.object({
  name: yup
    .string()
    .required('الاسم مطلوب')
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(50, 'الاسم يجب أن يكون أقل من 50 حرف'),
    
  email: yup
    .string()
    .required('البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح')
    .max(100, 'البريد الإلكتروني يجب أن يكون أقل من 100 حرف'),
    
  phone: yup
    .string()
    .required('رقم الهاتف مطلوب')
    .matches(/^(\+20|0)?1[0-9]{9}$/, 'رقم الهاتف غير صحيح')
    .min(10, 'رقم الهاتف يجب أن يكون 10 أرقام على الأقل')
    .max(15, 'رقم الهاتف يجب أن يكون أقل من 15 رقم'),
    
  accountType: yup
    .string()
    .required('نوع الحساب مطلوب')
    .oneOf(['STAFF', 'INSTRUCTOR'], 'نوع الحساب غير صحيح'),
    
  roleId: yup
    .string()
    .optional()
    .max(50, 'معرف الدور يجب أن يكون أقل من 50 حرف')
});

// Login validation schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .required('البريد الإلكتروني مطلوب')
    .email('البريد الإلكتروني غير صحيح'),
    
  password: yup
    .string()
    .required('كلمة المرور مطلوبة')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
});

export default {
  createUserSchema,
  updateUserSchema,
  loginSchema
};
