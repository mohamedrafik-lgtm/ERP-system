import { StudentFormManager } from '@/services/StudentFormManager';
import { StudentFormValidator } from '@/services/StudentFormValidator';
import { IStudentFormData, Gender, Religion, MaritalStatus, EnrollmentType, ProgramType, TraineeStatus, ClassLevel } from '@/types/student.types';

describe('StudentFormManager', () => {
  let formManager: StudentFormManager;
  let mockValidator: jest.Mocked<StudentFormValidator>;

  beforeEach(() => {
    mockValidator = {
      validateBasicInfo: jest.fn(),
      validateContactInfo: jest.fn(),
      validateAcademicInfo: jest.fn(),
    } as any;

    formManager = new StudentFormManager();
    formManager.setValidator(mockValidator);
  });

  describe('Form Data Management', () => {
    it('should reset form data', () => {
      formManager.setFieldValue('nameAr', 'أحمد');
      formManager.setFieldValue('nationalId', '12345678901234');
      
      formManager.resetForm();
      
      expect(formManager.isEmpty()).toBe(true);
    });

    it('should set and get field values', () => {
      formManager.setFieldValue('nameAr', 'أحمد محمد');
      formManager.setFieldValue('gender', Gender.MALE);
      
      expect(formManager.getFieldValue('nameAr')).toBe('أحمد محمد');
      expect(formManager.getFieldValue('gender')).toBe(Gender.MALE);
    });

    it('should check if field exists', () => {
      formManager.setFieldValue('nameAr', 'أحمد');
      
      expect(formManager.hasField('nameAr')).toBe(true);
      expect(formManager.hasField('nameEn')).toBe(false);
    });

    it('should get field count', () => {
      formManager.setFieldValue('nameAr', 'أحمد');
      formManager.setFieldValue('nationalId', '12345678901234');
      
      expect(formManager.getFieldCount()).toBe(2);
    });
  });

  describe('Validation', () => {
    it('should validate form using injected validator', () => {
      const mockFormData: Partial<IStudentFormData> = {
        nameAr: 'أحمد',
        nationalId: '12345678901234',
        phone: '01234567890',
        email: 'ahmed@example.com',
        address: 'القاهرة',
        enrollmentType: EnrollmentType.REGULAR,
        programType: ProgramType.SUMMER,
        traineeStatus: TraineeStatus.NEW,
        classLevel: ClassLevel.FIRST,
        programId: 1,
      };

      formManager.setFieldValue('nameAr', mockFormData.nameAr);
      formManager.setFieldValue('nationalId', mockFormData.nationalId);
      formManager.setFieldValue('phone', mockFormData.phone);
      formManager.setFieldValue('email', mockFormData.email);
      formManager.setFieldValue('address', mockFormData.address);
      formManager.setFieldValue('enrollmentType', mockFormData.enrollmentType);
      formManager.setFieldValue('programType', mockFormData.programType);
      formManager.setFieldValue('traineeStatus', mockFormData.traineeStatus);
      formManager.setFieldValue('classLevel', mockFormData.classLevel);
      formManager.setFieldValue('programId', mockFormData.programId);

      mockValidator.validateBasicInfo.mockReturnValue({ isValid: true, errors: {} });
      mockValidator.validateContactInfo.mockReturnValue({ isValid: true, errors: {} });
      mockValidator.validateAcademicInfo.mockReturnValue({ isValid: true, errors: {} });

      const result = formManager.validateForm();

      expect(mockValidator.validateBasicInfo).toHaveBeenCalledWith(mockFormData);
      expect(mockValidator.validateContactInfo).toHaveBeenCalledWith(mockFormData);
      expect(mockValidator.validateAcademicInfo).toHaveBeenCalledWith(mockFormData);
      expect(result.isValid).toBe(true);
    });

    it('should validate specific sections', () => {
      const mockFormData = { nameAr: 'أحمد' };
      formManager.setFieldValue('nameAr', 'أحمد');

      mockValidator.validateBasicInfo.mockReturnValue({ isValid: true, errors: {} });

      const result = formManager.validateSpecificSection('basic');

      expect(mockValidator.validateBasicInfo).toHaveBeenCalledWith(mockFormData);
      expect(result.isValid).toBe(true);
    });
  });

  describe('Strategy Pattern', () => {
    it('should validate with custom strategy', () => {
      const mockStrategy = {
        validate: jest.fn().mockReturnValue({ isValid: true, errors: {} })
      };

      const result = formManager.validateWithStrategy(mockStrategy);

      expect(mockStrategy.validate).toHaveBeenCalled();
      expect(result.isValid).toBe(true);
    });
  });
});
