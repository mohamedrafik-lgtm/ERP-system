import {
  BasicDataInput,
  ContactInformationInput,
  EducationDataInput,
  AdditionalDataInput,
  stats,
  activities,
  enumOptions,
  AttendanceAndDepartureData,
} from '@/data'

describe('Data Module', () => {
  describe('BasicDataInput', () => {
    it('should contain all required basic data fields', () => {
      const requiredFields = [
        'nameAr',
        'nameEn',
        'enrollmentType',
        'maritalStatus',
        'marketer',
        'nationalId',
        'idIssueDate',
        'idExpiryDate',
        'programType',
        'gender',
        'nationality',
        'birthDate',
        'residenceAddress',
        'religion',
        'program',
      ]

      requiredFields.forEach(field => {
        const fieldExists = BasicDataInput.some(input => input.name === field)
        expect(fieldExists).toBe(true)
      })
    })

    it('should have correct field types', () => {
      const textFields = BasicDataInput.filter(input => input.type === 'text')
      const selectFields = BasicDataInput.filter(input => input.type === 'select')
      const dateFields = BasicDataInput.filter(input => input.type === 'date')

      expect(textFields.length).toBeGreaterThan(0)
      expect(selectFields.length).toBeGreaterThan(0)
      expect(dateFields.length).toBeGreaterThan(0)
    })

    it('should have enrollment type options', () => {
      const enrollmentField = BasicDataInput.find(input => input.name === 'enrollmentType')
      expect(enrollmentField?.options).toEqual([
        { value: 'REGULAR', label: 'منتظم' },
        { value: 'DISTANCE', label: 'عن بعد' },
        { value: 'BOTH', label: 'الاثنان معاً' },
      ])
    })

    it('should have marital status options', () => {
      const maritalField = BasicDataInput.find(input => input.name === 'maritalStatus')
      expect(maritalField?.options).toEqual([
        { value: 'SINGLE', label: 'أعزب' },
        { value: 'MARRIED', label: 'متزوج' },
        { value: 'DIVORCED', label: 'مطلق' },
        { value: 'WIDOWED', label: 'أرمل' },
      ])
    })

    it('should have program type options', () => {
      const programTypeField = BasicDataInput.find(input => input.name === 'programType')
      expect(programTypeField?.options).toEqual([
        { value: 'SUMMER', label: 'صيفي' },
        { value: 'WINTER', label: 'شتوي' },
        { value: 'ANNUAL', label: 'سنوي' },
      ])
    })

    it('should have gender options', () => {
      const genderField = BasicDataInput.find(input => input.name === 'gender')
      expect(genderField?.options).toEqual([
        { value: 'MALE', label: 'ذكر' },
        { value: 'FEMALE', label: 'أنثى' },
      ])
    })

    it('should have program options', () => {
      const programField = BasicDataInput.find(input => input.name === 'program')
      expect(programField?.options).toEqual([
        { value: 1, label: 'ذكاء اصطناعي' },
        { value: 2, label: 'هندسه برمجيات' },
      ])
    })
  })

  describe('ContactInformationInput', () => {
    it('should contain all required contact fields', () => {
      const requiredFields = [
        'country',
        'governorate',
        'city',
        'address',
        'mobileNumber',
        'email',
        'ParentMobile',
        'ParentEmail',
        'GuardianJob',
        'RelationshipWithTheGuardian',
        'NationalIDOfTheGuardian',
      ]

      requiredFields.forEach(field => {
        const fieldExists = ContactInformationInput.some(input => input.name === field)
        expect(fieldExists).toBe(true)
      })
    })

    it('should have correct field types', () => {
      ContactInformationInput.forEach(input => {
        expect(input.type).toBe('text')
      })
    })
  })

  describe('EducationDataInput', () => {
    it('should contain all required education fields', () => {
      const requiredFields = [
        'TypeOfEducation',
        'School_Center_Name',
        'DateOfObtainingTheQualification',
        'HighSchoolTotal',
        'HighSchoolPercentage',
      ]

      requiredFields.forEach(field => {
        const fieldExists = EducationDataInput.some(input => input.name === field)
        expect(fieldExists).toBe(true)
      })
    })
  })

  describe('AdditionalDataInput', () => {
    it('should contain optional additional fields', () => {
      const optionalFields = [
        'SportsActivity',
        'CulturalAndArtisticActivity',
        'ScientificActivity',
        'comments',
      ]

      optionalFields.forEach(field => {
        const fieldExists = AdditionalDataInput.some(input => input.name === field)
        expect(fieldExists).toBe(true)
      })
    })
  })

  describe('Stats', () => {
    it('should contain stat objects with required properties', () => {
      stats.forEach(stat => {
        expect(stat).toHaveProperty('title')
        expect(stat).toHaveProperty('value')
        expect(stat).toHaveProperty('color')
      })
    })

    it('should have at least one stat', () => {
      expect(stats.length).toBeGreaterThan(0)
    })
  })

  describe('Activities', () => {
    it('should contain activity objects with required properties', () => {
      activities.forEach(activity => {
        expect(activity).toHaveProperty('date')
        expect(activity).toHaveProperty('activity')
        expect(activity).toHaveProperty('details')
      })
    })

    it('should have at least one activity', () => {
      expect(activities.length).toBeGreaterThan(0)
    })
  })

  describe('Enum Options', () => {
    it('should have enrollment type options', () => {
      expect(enumOptions.enrollmentType).toEqual({
        REGULAR: 'منتظم',
        DISTANCE: 'عن بعد',
        BOTH: 'كلاهما',
      })
    })

    it('should have marital status options', () => {
      expect(enumOptions.maritalStatus).toEqual({
        SINGLE: 'أعزب',
        MARRIED: 'متزوج',
        DIVORCED: 'مطلق',
        WIDOWED: 'أرمل',
      })
    })

    it('should have program type options', () => {
      expect(enumOptions.programType).toEqual({
        SUMMER: 'صيفي',
        WINTER: 'شتوي',
        ANNUAL: 'سنوي',
      })
    })

    it('should have gender options', () => {
      expect(enumOptions.Gender).toEqual({
        MALE: 'ذكر',
        FEMALE: 'أنثى',
      })
    })

    it('should have religion options', () => {
      expect(enumOptions.Religion).toEqual({
        ISLAM: 'الإسلام',
        CHRISTIANITY: 'المسيحية',
        JUDAISM: 'اليهودية',
      })
    })

    it('should have education type options', () => {
      expect(enumOptions.IEducationType).toEqual({
        PREPARATORY: 'إعدادي',
        INDUSTRIAL_SECONDARY: 'ثانوي صناعي',
        COMMERCIAL_SECONDARY: 'ثانوي تجاري',
        AGRICULTURAL_SECONDARY: 'ثانوي زراعي',
        AZHAR_SECONDARY: 'ثانوي أزهري',
        GENERAL_SECONDARY: 'ثانوي عام',
        UNIVERSITY: 'جامعي',
        INDUSTRIAL_APPRENTICESHIP: 'تدريب صناعي',
      })
    })

    it('should have trainee status options', () => {
      expect(enumOptions.ITraineeStatus).toEqual({
        NEW: 'جديد',
        CURRENT: 'حالي',
        GRADUATE: 'خريج',
        WITHDRAWN: 'منسحب',
      })
    })

    it('should have class level options', () => {
      expect(enumOptions.IClassLevel).toEqual({
        FIRST: 'الأول',
        SECOND: 'الثاني',
        THIRD: 'الثالث',
        FOURTH: 'الرابع',
      })
    })
  })

  describe('AttendanceAndDepartureData', () => {
    it('should contain attendance objects with required properties', () => {
      AttendanceAndDepartureData.forEach(attendance => {
        expect(attendance).toHaveProperty('id')
        expect(attendance).toHaveProperty('DateOfAttendance')
        expect(attendance).toHaveProperty('DepartureTime')
        expect(attendance).toHaveProperty('day')
      })
    })

    it('should have at least one attendance record', () => {
      expect(AttendanceAndDepartureData.length).toBeGreaterThan(0)
    })

    it('should have valid date formats', () => {
      AttendanceAndDepartureData.forEach(attendance => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/
        expect(attendance.DateOfAttendance).toMatch(dateRegex)
      })
    })

    it('should have valid time formats', () => {
      AttendanceAndDepartureData.forEach(attendance => {
        const timeRegex = /^\d{2}:\d{2}:\d{2}$/
        expect(attendance.DepartureTime).toMatch(timeRegex)
      })
    })
  })

  describe('Data Consistency', () => {
    it('should have consistent field naming conventions', () => {
      const allInputs = [
        ...BasicDataInput,
        ...ContactInformationInput,
        ...EducationDataInput,
        ...AdditionalDataInput,
      ]

      allInputs.forEach(input => {
        expect(input).toHaveProperty('name')
        expect(input).toHaveProperty('type')
        expect(input).toHaveProperty('placeholder')
        expect(input).toHaveProperty('label')
        expect(input).toHaveProperty('id')
      })
    })

    it('should have unique IDs across all inputs', () => {
      const allInputs = [
        ...BasicDataInput,
        ...ContactInformationInput,
        ...EducationDataInput,
        ...AdditionalDataInput,
      ]

      const ids = allInputs.map(input => input.id)
      const uniqueIds = new Set(ids)
      
      expect(ids.length).toBe(uniqueIds.size)
    })
  })
})
