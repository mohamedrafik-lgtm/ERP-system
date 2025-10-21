# Employee Management System - API Integration

## Overview
This document describes the integration of the Employee Management system with the backend API endpoint `/api/users`.

## API Endpoints

### Base URL
```
http://localhost:4000
```

### Endpoints

#### 1. Get All Users
- **Method**: GET
- **URL**: `/api/users`
- **Response**: Array of UserResponse objects

#### 2. Get User by ID
- **Method**: GET
- **URL**: `/api/users/{id}`
- **Response**: UserResponse object

#### 3. Create User
- **Method**: POST
- **URL**: `/api/users`
- **Body**: CreateUserRequest
- **Response**: UserResponse object

#### 4. Update User (PUT)
- **Method**: PUT
- **URL**: `/api/users/{id}`
- **Body**: UpdateUserRequest
- **Response**: UserResponse object

#### 5. Update User (PATCH)
- **Method**: PATCH
- **URL**: `/api/users/{id}`
- **Body**: UpdateUserRequest
- **Response**: UserResponse object

#### 6. Delete User
- **Method**: DELETE
- **URL**: `/api/users/{id}`
- **Response**: void

#### 7. User Login
- **Method**: POST
- **URL**: `/api/auth/login`
- **Body**: LoginRequest
- **Response**: LoginResponse object

## Data Types

### CreateUserRequest
```typescript
interface CreateUserRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  accountType?: AccountType;
  roleId?: string;
}
```

### UserResponse
```typescript
interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  accountType: AccountType;
  roleId?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### AccountType Enum
```typescript
enum AccountType {
  STAFF = 'STAFF',
  INSTRUCTOR = 'INSTRUCTOR',
}
```

## Form Validation

The system uses Yup schema validation with the following rules:

### Create User Schema
- **name**: Required, 2-50 characters
- **email**: Required, valid email format, max 100 characters
- **phone**: Required, Egyptian phone number format, 10-15 characters
- **password**: Required, 6-50 characters, must contain lowercase, uppercase, and number
- **accountType**: Required, must be 'STAFF' or 'INSTRUCTOR'
- **roleId**: Optional, max 50 characters

## Components Updated

### 1. EmployeeModal.tsx
- Updated to use `useCreateUserMutation`
- Added form validation with Yup resolver
- Enhanced error handling with try-catch blocks

### 2. EmployeeModalContent.tsx
- Added phone number field
- Replaced role field with accountType field
- Updated form layout for better UX
- Added proper field validation

### 3. EmployeeTable.tsx
- Updated to use `useGetUsersQuery`
- Modified to display accountType instead of role
- Updated badge system for account types

### 4. ConfirmationModal.tsx
- Updated to use `useDeleteUserMutation`
- Enhanced error handling

### 5. EditEmployeeModal.tsx (NEW)
- Modal for editing user information
- Uses `usePatchUserMutation` for PATCH requests
- Pre-populates form with existing user data
- Enhanced loading states and error handling

### 6. EditEmployeeModalContent.tsx (NEW)
- Form content for editing users
- Updated validation schema for edit operations
- Improved UX with better field layouts

### 7. UserDetailsModal.tsx (NEW)
- Modal for viewing detailed user information
- Displays comprehensive user data
- Beautiful card-based layout with icons

### 8. DeleteConfirmationEnhanced.tsx (NEW)
- Enhanced delete confirmation modal
- Multi-step confirmation process
- User information display before deletion
- Success feedback after deletion
- Comprehensive error handling

### 9. DeleteStatsModal.tsx (NEW)
- Post-deletion success modal
- Shows impact of deletion
- User-friendly success message
- Impact information display

## API Service (user.ts)

### New Hooks Available
- `useGetUsersQuery()` - Get all users
- `useGetUserByIdQuery(id)` - Get user by ID
- `useCreateUserMutation()` - Create new user
- `useUpdateUserMutation()` - Update user (PUT)
- `usePatchUserMutation()` - Update user (PATCH)
- `useDeleteUserMutation()` - Delete user
- `useLoginUserMutation()` - User login
- `useGetUsersByAccountTypeQuery(accountType)` - Get users by account type

### Legacy Support
The following legacy hooks are still available for backward compatibility:
- `useGetUserEmployeeQuery()`
- `useAddEmployeeMutation()`
- `useDeleteEmployeeMutation()`

## Error Handling

The system includes comprehensive error handling:

1. **Form Validation**: Client-side validation using Yup schemas
2. **API Errors**: Server-side error handling with try-catch blocks
3. **User Feedback**: Toast notifications for success/error states
4. **Loading States**: Proper loading indicators during API calls

## Usage Examples

### Create User
```typescript
const [createUser, { isLoading, error }] = useCreateUserMutation();

const handleCreateUser = async (userData: CreateUserRequest) => {
  try {
    await createUser(userData).unwrap();
    toast.success('User created successfully');
  } catch (error) {
    toast.error('Failed to create user');
  }
};
```

### Update User (PATCH)
```typescript
const [patchUser, { isLoading }] = usePatchUserMutation();

const handleUpdateUser = async (userId: string, userData: UpdateUserRequest) => {
  try {
    await patchUser({ id: userId, data: userData }).unwrap();
    toast.success('User updated successfully');
  } catch (error) {
    toast.error('Failed to update user');
  }
};
```

### Get User Details
```typescript
const { data: user, isLoading } = useGetUserByIdQuery(userId);

if (isLoading) return <LoadingSpinner />;
if (!user) return <ErrorMessage />;

return <UserDetails user={user} />;
```

### Delete User
```typescript
const [deleteUser, { isLoading }] = useDeleteUserMutation();

const handleDeleteUser = async (userId: string) => {
  try {
    await deleteUser(userId).unwrap();
    toast.success('User deleted successfully');
  } catch (error) {
    toast.error('Failed to delete user');
  }
};
```

## Security Features

1. **Authentication**: Bearer token authentication
2. **Input Validation**: Comprehensive client and server-side validation
3. **Password Requirements**: Strong password policy enforcement
4. **Phone Validation**: Egyptian phone number format validation

## New Features Added

### ✅ Edit User Functionality
- **EditEmployeeModal**: Complete modal for editing user information
- **PATCH API Integration**: Uses `/api/users/{id}` with PATCH method
- **Form Pre-population**: Automatically loads existing user data
- **Validation**: Comprehensive form validation for edit operations
- **Loading States**: Enhanced loading indicators and error handling

### ✅ User Details View
- **UserDetailsModal**: Beautiful modal for viewing user information
- **Comprehensive Display**: Shows all user data in organized cards
- **Responsive Design**: Works on all screen sizes
- **Icon Integration**: Uses Heroicons for better visual appeal

### ✅ Enhanced Table Actions
- **Edit Button**: Direct access to edit functionality
- **View Details Button**: Quick access to user information
- **Delete Button**: Enhanced delete functionality with confirmation
- **Improved UX**: Better button layouts and hover effects

### ✅ Delete User Functionality
- **DeleteConfirmationEnhanced**: Advanced delete confirmation modal
- **Multi-step Confirmation**: Two-step confirmation process for safety
- **User Information Display**: Shows complete user details before deletion
- **Success Feedback**: Post-deletion success modal with impact information
- **API Integration**: Uses `/api/users/{id}` DELETE endpoint
- **Error Handling**: Comprehensive error handling and user feedback

## Future Enhancements

1. **Role Management**: Implement role-based access control
2. **Bulk Operations**: Add bulk user creation/update/delete
3. **Advanced Filtering**: Add search and filter capabilities
4. **Audit Logging**: Track user management activities
5. **Email Verification**: Add email verification workflow
6. **User Activity Tracking**: Monitor user login/logout activities
7. **Profile Pictures**: Add profile picture upload functionality
