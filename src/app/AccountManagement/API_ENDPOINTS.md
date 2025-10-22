# Account Management API Endpoints

## Base URL
```
http://localhost:4000/api/trainee-platform/accounts
```

## Endpoints

### 1. Get All Accounts
**GET** `/api/trainee-platform/accounts`

**Query Parameters:**
- `search` (string, optional): البحث بالاسم أو الرقم القومي
- `isActive` (boolean, optional): تصفية حسب حالة التفعيل
- `programId` (number, optional): تصفية حسب البرنامج
- `page` (number, optional): رقم الصفحة (default: 1)
- `limit` (number, optional): عدد العناصر (default: 10)
- `sortBy` (string, optional): الترتيب حسب (default: 'createdAt')
- `sortOrder` ('asc' | 'desc', optional): نوع الترتيب (default: 'desc')

**Response:**
```json
{
  "data": [
    {
      "id": "string",
      "nationalId": "string",
      "birthDate": "Date",
      "password": "string | null",
      "isActive": "boolean",
      "lastLoginAt": "Date | null",
      "resetCode": "string | null",
      "resetCodeExpiresAt": "Date | null",
      "resetCodeGeneratedAt": "Date | null",
      "traineeId": "number",
      "createdAt": "Date",
      "updatedAt": "Date",
      "trainee": {
        "id": "number",
        "nameAr": "string",
        "nameEn": "string",
        "nationalId": "string",
        "email": "string | null",
        "phone": "string",
        "photoUrl": "string | null",
        "traineeStatus": "string",
        "classLevel": "string",
        "academicYear": "string",
        "program": {
          "id": "number",
          "nameAr": "string",
          "nameEn": "string"
        }
      }
    }
  ],
  "meta": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number",
    "hasNext": "boolean",
    "hasPrev": "boolean"
  }
}
```

---

### 2. Get Account By ID
**GET** `/api/trainee-platform/accounts/:id`

**Response:**
```json
{
  "data": {
    "id": "string",
    "nationalId": "string",
    "birthDate": "Date",
    "password": "string | null",
    "isActive": "boolean",
    "lastLoginAt": "Date | null",
    "resetCode": "string | null",
    "resetCodeExpiresAt": "Date | null",
    "resetCodeGeneratedAt": "Date | null",
    "traineeId": "number",
    "createdAt": "Date",
    "updatedAt": "Date",
    "trainee": {
      "id": "number",
      "nameAr": "string",
      "nameEn": "string",
      "nationalId": "string",
      "email": "string | null",
      "phone": "string",
      "photoUrl": "string | null",
      "traineeStatus": "string",
      "classLevel": "string",
      "academicYear": "string",
      "program": {
        "id": "number",
        "nameAr": "string",
        "nameEn": "string"
      }
    }
  }
}
```

---

### 3. Toggle Account Status ⭐ (NEW)
**PATCH** `/api/trainee-platform/accounts/:id/toggle-status`

**Description:** 
يقوم الباك إند تلقائياً بتبديل حالة التفعيل (من نشط إلى غير نشط والعكس)

**Body:** 
```json
{}  // لا يتطلب body
```

**Response:**
```json
{
  "id": "string",
  "nationalId": "string",
  "birthDate": "Date",
  "password": "string | null",
  "isActive": "boolean",  // الحالة الجديدة بعد التغيير
  "lastLoginAt": "Date | null",
  "resetCode": "string | null",
  "resetCodeExpiresAt": "Date | null",
  "resetCodeGeneratedAt": "Date | null",
  "traineeId": "number",
  "createdAt": "Date",
  "updatedAt": "Date",
  "trainee": {
    "id": "number",
    "nameAr": "string",
    "nameEn": "string",
    "nationalId": "string"
  }
}
```

**Example:**
```typescript
// Frontend Call
await updateStatus({ id: "123", isActive: true }).unwrap();

// Backend will toggle the status automatically
// If current status is true -> will change to false
// If current status is false -> will change to true
```

---

### 4. Reset Password
**POST** `/api/trainee-platform/accounts/:id/reset-password`

**Body:** 
```json
{}  // لا يتطلب body
```

**Response:**
```json
{
  "message": "Password reset successfully"
}
```

---

### 5. Delete Account
**DELETE** `/api/trainee-platform/accounts/:id`

**Response:**
```json
{
  "message": "Account deleted successfully"
}
```

---

### 6. Get Account Statistics
**GET** `/api/trainee-platform/accounts/stats`

**Response:**
```json
{
  "totalAccounts": "number",
  "activeAccounts": "number",
  "inactiveAccounts": "number",
  "averageAccountAgeInDays": "number"
}
```

---

### 7. Get Platform Statistics ⭐ (NEW)
**GET** `/api/trainee-platform/stats`

**Query Parameters:**
- `startDate` (string, optional): تاريخ البداية (ISO date string)
- `endDate` (string, optional): تاريخ النهاية (ISO date string)
- `programId` (number, optional): معرف البرنامج التدريبي

**Response:**
```json
{
  "overview": {
    "totalAccounts": "number",
    "activeAccounts": "number",
    "inactiveAccounts": "number",
    "registeredTrainees": "number",
    "unregisteredTrainees": "number",
    "totalSessions": "number",
    "totalTimeSpent": "number",
    "averageSessionTime": "number",
    "activeToday": "number",
    "activeThisWeek": "number",
    "activeThisMonth": "number"
  },
  "loginActivity": [
    {
      "date": "string (YYYY-MM-DD)",
      "count": "number",
      "uniqueUsers": "number",
      "totalTime": "number",
      "averageTime": "number"
    }
  ],
  "programsStats": [
    {
      "id": "number",
      "nameAr": "string",
      "traineeCount": "number"
    }
  ],
  "recentActivity": [
    {
      "id": "string",
      "loginAt": "Date",
      "logoutAt": "Date | null",
      "duration": "number | null",
      "device": "string | null",
      "trainee": {
        "nameAr": "string",
        "program": {
          "nameAr": "string"
        }
      }
    }
  ],
  "topActivities": [
    {
      "type": "string",
      "count": "number"
    }
  ],
  "deviceStats": [
    {
      "device": "string",
      "count": "number"
    }
  ]
}
```

**Example:**
```typescript
// Frontend Call
const { data } = useGetPlatformStatsQuery({
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  programId: 5
});

// Or without filters
const { data } = useGetPlatformStatsQuery();
```

---

## Authentication
جميع الـ endpoints تتطلب Bearer Token في الـ headers:

```
Authorization: Bearer <token>
```

الـ token يتم الحصول عليه من:
- `Cookies.get('access_token')`
- أو `Cookies.get('auth_token')`

---

## Error Responses

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Account not found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---

## Notes

⚠️ **Important:** 
- الباك إند يجب أن يعمل على `http://localhost:4000`
- جميع التواريخ بصيغة ISO 8601
- الـ toggle-status endpoint يقوم بالتبديل تلقائياً ولا يحتاج body
