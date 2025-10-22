// Mock data for trainee accounts
export const mockTraineeAccounts = {
  data: [
    {
      id: "1",
      nationalId: "12345678901234",
      birthDate: new Date("2000-01-15"),
      password: null,
      isActive: true,
      lastLoginAt: new Date("2024-01-20T10:30:00"),
      resetCode: null,
      resetCodeExpiresAt: null,
      resetCodeGeneratedAt: null,
      traineeId: 1,
      createdAt: new Date("2023-09-01T08:00:00"),
      updatedAt: new Date("2024-01-20T10:30:00"),
      trainee: {
        id: 1,
        nameAr: "أحمد محمد علي",
        nameEn: "Ahmed Mohamed Ali",
        nationalId: "12345678901234",
        email: "ahmed@example.com",
        phone: "01012345678",
        photoUrl: null,
        traineeStatus: "CURRENT",
        classLevel: "المستوى الأول",
        academicYear: "2023-2024",
        program: {
          id: 1,
          nameAr: "برنامج تطوير الويب",
          nameEn: "Web Development Program"
        }
      }
    },
    {
      id: "2",
      nationalId: "98765432109876",
      birthDate: new Date("1999-05-20"),
      password: null,
      isActive: false,
      lastLoginAt: new Date("2023-12-15T14:20:00"),
      resetCode: null,
      resetCodeExpiresAt: null,
      resetCodeGeneratedAt: null,
      traineeId: 2,
      createdAt: new Date("2023-09-01T08:00:00"),
      updatedAt: new Date("2023-12-15T14:20:00"),
      trainee: {
        id: 2,
        nameAr: "سارة أحمد حسن",
        nameEn: "Sara Ahmed Hassan",
        nationalId: "98765432109876",
        email: "sara@example.com",
        phone: "01098765432",
        photoUrl: null,
        traineeStatus: "NEW",
        classLevel: "المستوى الثاني",
        academicYear: "2023-2024",
        program: {
          id: 2,
          nameAr: "برنامج الذكاء الاصطناعي",
          nameEn: "AI Program"
        }
      }
    },
    {
      id: "3",
      nationalId: "11223344556677",
      birthDate: new Date("2001-03-10"),
      password: null,
      isActive: true,
      lastLoginAt: new Date("2024-01-22T09:15:00"),
      resetCode: null,
      resetCodeExpiresAt: null,
      resetCodeGeneratedAt: null,
      traineeId: 3,
      createdAt: new Date("2023-09-01T08:00:00"),
      updatedAt: new Date("2024-01-22T09:15:00"),
      trainee: {
        id: 3,
        nameAr: "محمد علي أحمد",
        nameEn: "Mohamed Ali Ahmed",
        nationalId: "11223344556677",
        email: "mohamed@example.com",
        phone: "01011223344",
        photoUrl: null,
        traineeStatus: "CURRENT",
        classLevel: "المستوى الأول",
        academicYear: "2023-2024",
        program: {
          id: 1,
          nameAr: "برنامج تطوير الويب",
          nameEn: "Web Development Program"
        }
      }
    }
  ],
  meta: {
    total: 3,
    page: 1,
    limit: 10,
    totalPages: 1,
    hasNext: false,
    hasPrev: false
  }
};

export const mockTraineeAccountStats = {
  totalAccounts: 3,
  activeAccounts: 2,
  inactiveAccounts: 1,
  averageAccountAgeInDays: 120
};
