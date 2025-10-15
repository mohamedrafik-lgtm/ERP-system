import * as yup from 'yup';

// ============================================
// Step 1: Verify Trainee Schema
// ============================================

export const VerifyTraineeSchema = yup.object().shape({
  nationalId: yup
    .string()
    .required('الرقم القومي مطلوب')
    .matches(/^[0-9]{14}$/, 'الرقم القومي يجب أن يكون 14 رقماً')
    .test('valid-national-id', 'الرقم القومي غير صحيح', (value) => {
      if (!value) return false;
      // التحقق من صحة الرقم القومي المصري
      const century = parseInt(value.substring(0, 1));
      const year = parseInt(value.substring(1, 3));
      const month = parseInt(value.substring(3, 5));
      const day = parseInt(value.substring(5, 7));
      
      // التحقق من الشهر
      if (month < 1 || month > 12) return false;
      
      // التحقق من اليوم
      if (day < 1 || day > 31) return false;
      
      return true;
    }),
  birthDate: yup
    .string()
    .required('تاريخ الميلاد مطلوب')
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      'تاريخ الميلاد يجب أن يكون بصيغة YYYY-MM-DD'
    )
    .test('valid-date', 'تاريخ الميلاد غير صحيح', (value) => {
      if (!value) return false;
      const date = new Date(value);
      return date instanceof Date && !isNaN(date.getTime());
    })
    .test('not-future', 'تاريخ الميلاد لا يمكن أن يكون في المستقبل', (value) => {
      if (!value) return false;
      const date = new Date(value);
      return date <= new Date();
    })
    .test('minimum-age', 'يجب أن يكون العمر 10 سنوات على الأقل', (value) => {
      if (!value) return false;
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 10;
      }
      
      return age >= 10;
    }),
});

// ============================================
// Step 2: Verify Phone Schema
// ============================================

export const VerifyPhoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('رقم الهاتف مطلوب')
    .matches(/^01[0-2,5]{1}[0-9]{8}$/, 'رقم الهاتف يجب أن يكون رقم مصري صحيح')
    .test('valid-egyptian-phone', 'رقم الهاتف يجب أن يبدأ بـ 010 أو 011 أو 012 أو 015', (value) => {
      if (!value) return false;
      return /^01[0-2,5]{1}[0-9]{8}$/.test(value);
    }),
});

// ============================================
// Step 3: Create Password Schema
// ============================================

export const CreatePasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('كلمة المرور مطلوبة')
    .min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
      'كلمة المرور يجب أن تحتوي على أحرف وأرقام'
    )
    .test('password-strength', 'كلمة المرور يجب أن تحتوي على أحرف وأرقام', (value) => {
      if (!value) return false;
      const hasLetter = /[A-Za-z]/.test(value);
      const hasNumber = /\d/.test(value);
      return hasLetter && hasNumber;
    }),
  confirmPassword: yup
    .string()
    .required('تأكيد كلمة المرور مطلوب')
    .oneOf([yup.ref('password')], 'كلمة المرور غير متطابقة'),
});


