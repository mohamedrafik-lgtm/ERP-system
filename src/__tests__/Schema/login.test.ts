import { LoginSchema } from '@/Schema/login'

describe('Login Schema Validation', () => {
  describe('Valid Inputs', () => {
    it('should validate correct email and password', async () => {
      const validData = {
        emailOrPhone: 'test@example.com',
        password: 'password123',
        remember: true,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })

    it('should validate email with subdomain', async () => {
      const validData = {
        emailOrPhone: 'user@subdomain.example.com',
        password: 'password123',
        remember: false,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })

    it('should validate email with numbers', async () => {
      const validData = {
        emailOrPhone: 'user123@example.com',
        password: 'password123',
        remember: true,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })

    it('should validate email with special characters', async () => {
      const validData = {
        emailOrPhone: 'user.name+tag@example.com',
        password: 'password123',
        remember: false,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })

    it('should validate minimum password length', async () => {
      const validData = {
        emailOrPhone: 'test@example.com',
        password: '123456',
        remember: true,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })

    it('should validate long password', async () => {
      const validData = {
        emailOrPhone: 'test@example.com',
        password: 'verylongpassword123456789',
        remember: false,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })
  })

  describe('Invalid Inputs', () => {
    it('should reject empty email', async () => {
      const invalidData = {
        emailOrPhone: '',
        password: 'password123',
        remember: true,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('البريد الإلكتروني مطلوب')
      }
    })

    it('should reject missing email', async () => {
      const invalidData = {
        password: 'password123',
        remember: true,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('البريد الإلكتروني مطلوب')
      }
    })

    it('should reject invalid email format', async () => {
      const invalidData = {
        emailOrPhone: 'invalid-email',
        password: 'password123',
        remember: true,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('هذه ليس بريد الكتروني')
      }
    })

    it('should reject email without domain', async () => {
      const invalidData = {
        emailOrPhone: 'user@',
        password: 'password123',
        remember: false,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('هذه ليس بريد الكتروني')
      }
    })

    it('should reject email without @ symbol', async () => {
      const invalidData = {
        emailOrPhone: 'userexample.com',
        password: 'password123',
        remember: true,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('هذه ليس بريد الكتروني')
      }
    })

    it('should reject email with invalid TLD', async () => {
      const invalidData = {
        emailOrPhone: 'user@example.c',
        password: 'password123',
        remember: false,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('هذه ليس بريد الكتروني')
      }
    })

    it('should reject empty password', async () => {
      const invalidData = {
        emailOrPhone: 'test@example.com',
        password: '',
        remember: true,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('كلمة المرور مطلوبة')
      }
    })

    it('should reject missing password', async () => {
      const invalidData = {
        emailOrPhone: 'test@example.com',
        remember: true,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('كلمة المرور مطلوبة')
      }
    })

    it('should reject password shorter than 6 characters', async () => {
      const invalidData = {
        emailOrPhone: 'test@example.com',
        password: '12345',
        remember: false,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      }
    })

    it('should reject password with exactly 5 characters', async () => {
      const invalidData = {
        emailOrPhone: 'test@example.com',
        password: '12345',
        remember: true,
      }

      try {
        await LoginSchema.validate(invalidData)
        fail('Should have thrown validation error')
      } catch (error: any) {
        expect(error.message).toBe('كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      }
    })
  })

  describe('Remember Field', () => {
    it('should have default value of true', async () => {
      const dataWithoutRemember = {
        emailOrPhone: 'test@example.com',
        password: 'password123',
      }

      const result = await LoginSchema.validate(dataWithoutRemember)
      expect(result.remember).toBe(true)
    })

    it('should accept true value', async () => {
      const data = {
        emailOrPhone: 'test@example.com',
        password: 'password123',
        remember: true,
      }

      const result = await LoginSchema.validate(data)
      expect(result.remember).toBe(true)
    })

    it('should accept false value', async () => {
      const data = {
        emailOrPhone: 'test@example.com',
        password: 'password123',
        remember: false,
      }

      const result = await LoginSchema.validate(data)
      expect(result.remember).toBe(false)
    })
  })

  describe('Edge Cases', () => {
    it('should handle email with multiple dots', async () => {
      const validData = {
        emailOrPhone: 'user@sub.domain.example.com',
        password: 'password123',
        remember: true,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })

    it('should handle email with underscore', async () => {
      const validData = {
        emailOrPhone: 'user_name@example.com',
        password: 'password123',
        remember: false,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })

    it('should handle password with special characters', async () => {
      const validData = {
        emailOrPhone: 'test@example.com',
        password: 'p@ssw0rd!',
        remember: true,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })

    it('should handle password with spaces', async () => {
      const validData = {
        emailOrPhone: 'test@example.com',
        password: 'pass word 123',
        remember: false,
      }

      const result = await LoginSchema.validate(validData)
      expect(result).toEqual(validData)
    })
  })

  describe('Schema Structure', () => {
    it('should be a valid Yup schema', () => {
      expect(LoginSchema).toBeDefined()
      expect(typeof LoginSchema.validate).toBe('function')
    })

    it('should be required', () => {
      expect(LoginSchema).toBeDefined()
    })
  })
})
