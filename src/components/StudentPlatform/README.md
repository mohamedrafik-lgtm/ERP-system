# Student Platform - Account Management

## Overview
This module provides comprehensive account management functionality for trainee accounts within the student platform. The implementation follows the Single Responsibility Principle with well-separated components.

## Architecture

### 📁 File Structure
```
src/components/StudentPlatform/
├── AccountManagement/
│   ├── page.tsx                    # Main page component
│   └── README.md                   # This documentation
├── TraineeAccountsTable.tsx        # Main table component
├── TraineeAccountRow.tsx          # Individual row component
├── TraineeAccountsFilters.tsx     # Filter controls
├── TraineeAccountDetails.tsx      # Account details modal
├── AccountBasicInfo.tsx           # Basic info section
├── AccountSecurityInfo.tsx        # Security info section
├── AccountActions.tsx              # Action buttons
├── DeleteConfirmationModal.tsx    # Delete confirmation
├── EmptyState.tsx                 # Empty state display
└── Pagination.tsx                 # Pagination controls

src/utils/
└── dateUtils.ts                   # Date formatting utilities

src/hooks/
└── useTraineeAccountActions.ts    # Custom hook for actions
```

## Components

### 🏗️ Main Components

#### `TraineeAccountsTable`
- **Purpose**: Displays paginated list of trainee accounts
- **Responsibilities**: 
  - Data fetching and display
  - Pagination handling
  - Action coordination
- **Props**: `filters`, `onPageChange`, `onViewDetails`

#### `TraineeAccountRow`
- **Purpose**: Individual account row display
- **Responsibilities**:
  - Account information display
  - Action button rendering
  - Status badge display
- **Props**: `account`, `index`, `page`, `limit`, `onViewDetails`, `onStatusToggle`, `onDelete`

#### `TraineeAccountDetails`
- **Purpose**: Detailed account information modal
- **Responsibilities**:
  - Account data fetching
  - Modal state management
  - Action coordination
- **Props**: `accountId`, `isOpen`, `onClose`

### 🔧 Utility Components

#### `AccountBasicInfo`
- **Purpose**: Basic account information display
- **Responsibilities**: Name, contact, program info display

#### `AccountSecurityInfo`
- **Purpose**: Security and account status information
- **Responsibilities**: Login history, reset codes, account status

#### `AccountActions`
- **Purpose**: Action buttons for account management
- **Responsibilities**: Reset password, delete account actions

#### `TraineeAccountsFilters`
- **Purpose**: Search and filter controls
- **Responsibilities**: Filter state management, search input

#### `DeleteConfirmationModal`
- **Purpose**: Confirmation dialog for deletions
- **Responsibilities**: User confirmation, action execution

#### `EmptyState`
- **Purpose**: Display when no accounts found
- **Responsibilities**: Empty state messaging, refresh action

#### `Pagination`
- **Purpose**: Page navigation controls
- **Responsibilities**: Page navigation, state management

### 🛠️ Utilities

#### `dateUtils.ts`
- **Purpose**: Date formatting utilities
- **Functions**:
  - `formatDate()`: Basic date formatting
  - `formatDateTime()`: Date and time formatting
  - `formatDateOnly()`: Date only formatting

#### `useTraineeAccountActions.ts`
- **Purpose**: Custom hook for account actions
- **Responsibilities**:
  - Status toggle handling
  - Delete confirmation
  - Password reset
  - Error handling

## API Integration

### Endpoints Used
- `GET /api/trainee-platform/accounts` - Fetch accounts with filters
- `GET /api/trainee-platform/accounts/{id}` - Fetch account details
- `GET /api/trainee-platform/accounts/stats` - Fetch account statistics
- `PATCH /api/trainee-platform/accounts/{id}/status` - Update account status
- `POST /api/trainee-platform/accounts/reset-password` - Reset password
- `DELETE /api/trainee-platform/accounts/{id}` - Delete account

### Query Parameters
```typescript
interface TraineeAccountFilters {
  search?: string;           // Search by name or national ID
  isActive?: boolean;        // Filter by activation status
  programId?: number;        // Training program ID
  page?: number;             // Page number (default: 1)
  limit?: number;            // Items per page (default: 10)
  sortBy?: string;           // Sort field (default: 'createdAt')
  sortOrder?: 'asc' | 'desc'; // Sort order (default: 'desc')
}
```

## Usage Example

```tsx
import { AccountManagementPage } from '@/app/AccountManagement/page';

// The page automatically handles:
// - Account fetching and display
// - Filtering and searching
// - Pagination
// - Account details modal
// - Status updates
// - Account deletion
```

## Benefits of This Architecture

### ✅ Single Responsibility Principle
- Each component has one clear purpose
- Easy to test and maintain
- Clear separation of concerns

### ✅ Reusability
- Components can be reused in other contexts
- Utility functions are shared
- Custom hooks can be used elsewhere

### ✅ Maintainability
- Small, focused components
- Clear interfaces and props
- Easy to debug and modify

### ✅ Performance
- Components only re-render when necessary
- Efficient state management
- Optimized API calls

## Testing

Each component has corresponding unit tests:
- `TraineeAccountsTable.test.tsx`
- `TraineeAccountRow.test.tsx`
- `TraineeAccountDetails.test.tsx`
- `TraineeAccountsFilters.test.tsx`
- `useTraineeAccountActions.test.ts`
- `dateUtils.test.ts`

## Future Enhancements

- Add bulk operations (bulk delete, bulk status update)
- Add export functionality (CSV, PDF)
- Add advanced filtering options
- Add account activity logs
- Add account creation from this interface
