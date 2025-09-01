import {
  IAddStudent,
  FilterButtonProps,
  ButtonProps,
  IFormValues,
  BasicData,
} from '@/interface'

describe('Interface Definitions', () => {
  describe('IAddStudent Interface', () => {
    it('should have required properties', () => {
      const mockInput: IAddStudent = {
        name: 'test',
        type: 'text',
        placeholder: 'Enter test',
        label: 'Test Label',
        id: 'test-id',
      }

      expect(mockInput.name).toBe('test')
      expect(mockInput.type).toBe('text')
      expect(mockInput.placeholder).toBe('Enter test')
      expect(mockInput.label).toBe('Test Label')
      expect(mockInput.id).toBe('test-id')
    })

    it('should have optional options property', () => {
      const mockInputWithOptions: IAddStudent = {
        name: 'test',
        type: 'select',
        placeholder: 'Select option',
        label: 'Test Select',
        id: 'test-select',
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
        ],
      }

      expect(mockInputWithOptions.options).toBeDefined()
      expect(mockInputWithOptions.options).toHaveLength(2)
      expect(mockInputWithOptions.options?.[0]).toEqual({ value: 'option1', label: 'Option 1' })
    })

    it('should work without options property', () => {
      const mockInputWithoutOptions: IAddStudent = {
        name: 'test',
        type: 'text',
        placeholder: 'Enter test',
        label: 'Test Label',
        id: 'test-id',
      }

      expect(mockInputWithoutOptions.options).toBeUndefined()
    })
  })

  describe('FilterButtonProps Interface', () => {
    it('should have required properties', () => {
      const mockFilterButton: FilterButtonProps = {
        label: 'Filter',
        options: ['Option 1', 'Option 2'],
        onSelect: jest.fn(),
      }

      expect(mockFilterButton.label).toBe('Filter')
      expect(mockFilterButton.options).toEqual(['Option 1', 'Option 2'])
      expect(typeof mockFilterButton.onSelect).toBe('function')
    })

    it('should handle empty options array', () => {
      const mockFilterButton: FilterButtonProps = {
        label: 'Empty Filter',
        options: [],
        onSelect: jest.fn(),
      }

      expect(mockFilterButton.options).toHaveLength(0)
    })
  })

  describe('ButtonProps Interface', () => {
    it('should extend HTML button attributes', () => {
      const mockButton: ButtonProps = {
        url: '/test',
        name: 'Test Button',
        className: 'btn-primary',
        onClick: jest.fn(),
        disabled: false,
      }

      expect(mockButton.url).toBe('/test')
      expect(mockButton.name).toBe('Test Button')
      expect(mockButton.className).toBe('btn-primary')
      expect(typeof mockButton.onClick).toBe('function')
      expect(mockButton.disabled).toBe(false)
    })

    it('should work with minimal properties', () => {
      const mockButton: ButtonProps = {
        url: '/test',
        name: 'Test Button',
      }

      expect(mockButton.url).toBe('/test')
      expect(mockButton.name).toBe('Test Button')
    })
  })

  describe('IFormValues Interface', () => {
    it('should have all basic data properties', () => {
      const mockFormValues: IFormValues = {
        nameArabic: 'اسم عربي',
        nameEnglish: 'English Name',
        admissionSystem: 'REGULAR',
        maritalState: 'SINGLE',
        marketer: 'Marketer Name',
        nationalId: '12345678901234',
        releaseDate: '2020-01-01',
        expirationDate: '2030-01-01',
        programType: 'SUMMER',
        gender: 'MALE',
        nationality: 'مصري',
        dateOfBirth: '1990-01-01',
        placeOfBirth: 'القاهرة',
        religion: 'الإسلام',
        program: '1',
      }

      expect(mockFormValues.nameArabic).toBe('اسم عربي')
      expect(mockFormValues.nameEnglish).toBe('English Name')
      expect(mockFormValues.admissionSystem).toBe('REGULAR')
      expect(mockFormValues.maritalState).toBe('SINGLE')
      expect(mockFormValues.marketer).toBe('Marketer Name')
      expect(mockFormValues.nationalId).toBe('12345678901234')
      expect(mockFormValues.releaseDate).toBe('2020-01-01')
      expect(mockFormValues.expirationDate).toBe('2030-01-01')
      expect(mockFormValues.programType).toBe('SUMMER')
      expect(mockFormValues.gender).toBe('MALE')
      expect(mockFormValues.nationality).toBe('مصري')
      expect(mockFormValues.dateOfBirth).toBe('1990-01-01')
      expect(mockFormValues.placeOfBirth).toBe('القاهرة')
      expect(mockFormValues.religion).toBe('الإسلام')
      expect(mockFormValues.program).toBe('1')
    })

    it('should have contact information properties', () => {
      const mockFormValues: IFormValues = {
        nameArabic: 'اسم عربي',
        nameEnglish: 'English Name',
        admissionSystem: 'REGULAR',
        maritalState: 'SINGLE',
        marketer: 'Marketer Name',
        nationalId: '12345678901234',
        releaseDate: '2020-01-01',
        expirationDate: '2030-01-01',
        programType: 'SUMMER',
        gender: 'MALE',
        nationality: 'مصري',
        dateOfBirth: '1990-01-01',
        placeOfBirth: 'القاهرة',
        religion: 'الإسلام',
        program: '1',
        The_state: 'مصر',
        Governorate: 'القاهرة',
        city: 'القاهرة',
        address: 'العنوان التفصيلي',
        mobileNumber: '01234567890',
        email: 'test@example.com',
        ParentMobile: '01234567891',
        ParentEmail: 'parent@example.com',
        GuardianJob: 'مهندس',
        RelationshipWithTheGuardian: 'أب',
        NationalIDOfTheGuardian: '12345678901235',
      }

      expect(mockFormValues.The_state).toBe('مصر')
      expect(mockFormValues.Governorate).toBe('القاهرة')
      expect(mockFormValues.city).toBe('القاهرة')
      expect(mockFormValues.address).toBe('العنوان التفصيلي')
      expect(mockFormValues.mobileNumber).toBe('01234567890')
      expect(mockFormValues.email).toBe('test@example.com')
      expect(mockFormValues.ParentMobile).toBe('01234567891')
      expect(mockFormValues.ParentEmail).toBe('parent@example.com')
      expect(mockFormValues.GuardianJob).toBe('مهندس')
      expect(mockFormValues.RelationshipWithTheGuardian).toBe('أب')
      expect(mockFormValues.NationalIDOfTheGuardian).toBe('12345678901235')
    })

    it('should have education data properties', () => {
      const mockFormValues: IFormValues = {
        nameArabic: 'اسم عربي',
        nameEnglish: 'English Name',
        admissionSystem: 'REGULAR',
        maritalState: 'SINGLE',
        marketer: 'Marketer Name',
        nationalId: '12345678901234',
        releaseDate: '2020-01-01',
        expirationDate: '2030-01-01',
        programType: 'SUMMER',
        gender: 'MALE',
        nationality: 'مصري',
        dateOfBirth: '1990-01-01',
        placeOfBirth: 'القاهرة',
        religion: 'الإسلام',
        program: '1',
        TypeOfEducation: 'UNIVERSITY',
        School_Center_Name: 'جامعة القاهرة',
        DateOfObtainingTheQualification: '2015-06-01',
        HighSchoolTotal: '600',
        HighSchoolPercentage: '95',
      }

      expect(mockFormValues.TypeOfEducation).toBe('UNIVERSITY')
      expect(mockFormValues.School_Center_Name).toBe('جامعة القاهرة')
      expect(mockFormValues.DateOfObtainingTheQualification).toBe('2015-06-01')
      expect(mockFormValues.HighSchoolTotal).toBe('600')
      expect(mockFormValues.HighSchoolPercentage).toBe('95')
    })

    it('should have optional additional properties', () => {
      const mockFormValues: IFormValues = {
        nameArabic: 'اسم عربي',
        nameEnglish: 'English Name',
        admissionSystem: 'REGULAR',
        maritalState: 'SINGLE',
        marketer: 'Marketer Name',
        nationalId: '12345678901234',
        releaseDate: '2020-01-01',
        expirationDate: '2030-01-01',
        programType: 'SUMMER',
        gender: 'MALE',
        nationality: 'مصري',
        dateOfBirth: '1990-01-01',
        placeOfBirth: 'القاهرة',
        religion: 'الإسلام',
        program: '1',
        photoUrl: '/path/to/photo.jpg',
        Landline: '0223456789',
        whatsapp: '01234567890',
        facebook: 'facebook.com/username',
        SportsActivity: 'كرة القدم',
        CulturalAndArtisticActivity: 'الرسم',
        ScientificActivity: 'البحث العلمي',
        comments: 'ملاحظات إضافية',
      }

      expect(mockFormValues.photoUrl).toBe('/path/to/photo.jpg')
      expect(mockFormValues.Landline).toBe('0223456789')
      expect(mockFormValues.whatsapp).toBe('01234567890')
      expect(mockFormValues.facebook).toBe('facebook.com/username')
      expect(mockFormValues.SportsActivity).toBe('كرة القدم')
      expect(mockFormValues.CulturalAndArtisticActivity).toBe('الرسم')
      expect(mockFormValues.ScientificActivity).toBe('البحث العلمي')
      expect(mockFormValues.comments).toBe('ملاحظات إضافية')
    })

    it('should work with minimal required properties', () => {
      const minimalFormValues: IFormValues = {
        nameArabic: 'اسم عربي',
        nameEnglish: 'English Name',
        admissionSystem: 'REGULAR',
        maritalState: 'SINGLE',
        marketer: 'Marketer Name',
        nationalId: '12345678901234',
        releaseDate: '2020-01-01',
        expirationDate: '2030-01-01',
        programType: 'SUMMER',
        gender: 'MALE',
        nationality: 'مصري',
        dateOfBirth: '1990-01-01',
        placeOfBirth: 'القاهرة',
        religion: 'الإسلام',
        program: '1',
      }

      expect(minimalFormValues.nameArabic).toBe('اسم عربي')
      expect(minimalFormValues.photoUrl).toBeUndefined()
    })
  })

  describe('BasicData Type', () => {
    it('should include all basic data field names', () => {
      const validBasicData: BasicData[] = [
        'nameEnglish',
        'nameArabic',
        'admission_system',
        'marital_state',
        'markter',
        'national_id',
        'release_date',
        'exprtation_date',
        'program_type',
        'gender',
        'nationalty',
        'dateOf_Birth',
        'placeOfBirth',
        'Religion',
        'program',
      ]

      validBasicData.forEach(field => {
        expect(typeof field).toBe('string')
      })
    })

    it('should have correct field names', () => {
      expect('nameEnglish' as BasicData).toBe('nameEnglish')
      expect('nameArabic' as BasicData).toBe('nameArabic')
      expect('admission_system' as BasicData).toBe('admission_system')
      expect('marital_state' as BasicData).toBe('marital_state')
      expect('markter' as BasicData).toBe('markter')
      expect('national_id' as BasicData).toBe('national_id')
      expect('release_date' as BasicData).toBe('release_date')
      expect('exprtation_date' as BasicData).toBe('exprtation_date')
      expect('program_type' as BasicData).toBe('program_type')
      expect('gender' as BasicData).toBe('gender')
      expect('nationalty' as BasicData).toBe('nationalty')
      expect('dateOf_Birth' as BasicData).toBe('dateOf_Birth')
      expect('placeOfBirth' as BasicData).toBe('placeOfBirth')
      expect('Religion' as BasicData).toBe('Religion')
      expect('program' as BasicData).toBe('program')
    })
  })

  describe('Interface Compatibility', () => {
    it('should allow IAddStudent to be used in arrays', () => {
      const inputs: IAddStudent[] = [
        {
          name: 'field1',
          type: 'text',
          placeholder: 'Enter field 1',
          label: 'Field 1',
          id: 'field1-id',
        },
        {
          name: 'field2',
          type: 'select',
          placeholder: 'Select option',
          label: 'Field 2',
          id: 'field2-id',
          options: [
            { value: 'option1', label: 'Option 1' },
          ],
        },
      ]

      expect(inputs).toHaveLength(2)
      expect(inputs[0].type).toBe('text')
      expect(inputs[1].type).toBe('select')
      expect(inputs[1].options).toBeDefined()
    })

    it('should allow FilterButtonProps to be used in components', () => {
      const filterButtons: FilterButtonProps[] = [
        {
          label: 'Filter 1',
          options: ['Option 1', 'Option 2'],
          onSelect: jest.fn(),
        },
        {
          label: 'Filter 2',
          options: ['Option A', 'Option B'],
          onSelect: jest.fn(),
        },
      ]

      expect(filterButtons).toHaveLength(2)
      expect(filterButtons[0].label).toBe('Filter 1')
      expect(filterButtons[1].label).toBe('Filter 2')
    })
  })
})
