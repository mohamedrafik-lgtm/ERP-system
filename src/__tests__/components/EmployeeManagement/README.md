# Employee Management Unit Tests

This directory contains comprehensive unit tests for the Employee Management system components.

## Test Coverage

### Components Tested

1. **EmployeeModal.test.tsx** - Tests for the add employee modal
2. **EmployeeTable.test.tsx** - Tests for the employee table component
3. **ConfirmationModal.test.tsx** - Tests for the delete confirmation modal
4. **EditEmployeeModal.test.tsx** - Tests for the edit employee modal
5. **UserDetailsModal.test.tsx** - Tests for the user details modal
6. **DeleteConfirmationEnhanced.test.tsx** - Tests for the enhanced delete confirmation
7. **EmployeeModalContent.test.tsx** - Tests for the add employee form content
8. **EditEmployeeModalContent.test.tsx** - Tests for the edit employee form content
9. **DeleteStatsModal.test.tsx** - Tests for the delete success modal
10. **index.test.tsx** - Tests for the main EmployeeManagement page
11. **UserAPI.test.ts** - Tests for the User API service

## Test Structure

### Component Tests
Each component test file follows this structure:
- **Rendering Tests** - Verify components render correctly
- **Props Tests** - Test component behavior with different props
- **User Interaction Tests** - Test button clicks, form submissions, etc.
- **State Management Tests** - Test component state changes
- **Error Handling Tests** - Test error states and edge cases
- **Styling Tests** - Verify CSS classes are applied correctly

### API Tests
The UserAPI tests cover:
- **Endpoint Testing** - Test all API endpoints
- **Request/Response Testing** - Verify correct data flow
- **Error Handling** - Test network errors and API failures
- **Authentication** - Test token handling
- **Data Transformation** - Verify data is processed correctly

## Mocking Strategy

### API Mocking
```typescript
jest.mock('@/lip/features/users/user', () => ({
  UserAPI: {
    useGetUsersQuery: () => ({
      data: mockUsers,
      isLoading: false,
      isError: false
    }),
    useCreateUserMutation: () => [
      jest.fn().mockResolvedValue({ data: mockUser }),
      { isLoading: false, isError: false, isSuccess: true }
    ]
  }
}));
```

### Component Mocking
```typescript
jest.mock('@headlessui/react', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Dialog: ({ children, open, onClose }: any) => 
    open ? <div data-testid="dialog">{children}</div> : null
}));
```

### Toast Mocking
```typescript
jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn()
}));
```

## Test Data

### Mock Users
```typescript
const mockUsers = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+201234567890',
    accountType: 'STAFF',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  }
];
```

### Mock Form Data
```typescript
const mockFormData = {
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+201234567890',
  password: 'password123',
  accountType: 'STAFF'
};
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npm test EmployeeModal.test.tsx
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Tests in Watch Mode
```bash
npm test -- --watch
```

## Test Utilities

### Custom Render Function
```typescript
const renderWithProvider = (component: React.ReactElement) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};
```

### Mock Store Creation
```typescript
const createMockStore = () => {
  return configureStore({
    reducer: {
      [UserAPI.reducerPath]: UserAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(UserAPI.middleware),
  });
};
```

## Test Categories

### 1. Rendering Tests
- Component renders without crashing
- All required elements are present
- Correct text content is displayed
- Proper CSS classes are applied

### 2. Interaction Tests
- Button clicks trigger correct actions
- Form submissions work correctly
- Modal open/close functionality
- Input field interactions

### 3. State Management Tests
- Loading states are handled correctly
- Error states are displayed properly
- Success states trigger appropriate actions
- Data updates are reflected in UI

### 4. API Integration Tests
- API calls are made with correct parameters
- Response data is handled correctly
- Error responses are handled gracefully
- Loading states are managed properly

### 5. Accessibility Tests
- Proper ARIA labels and roles
- Keyboard navigation works
- Screen reader compatibility
- Focus management

## Best Practices

### 1. Test Naming
- Use descriptive test names
- Group related tests with `describe` blocks
- Use `it` for individual test cases

### 2. Test Organization
- One test file per component
- Group tests by functionality
- Use `beforeEach` and `afterEach` for setup/cleanup

### 3. Mock Management
- Mock external dependencies
- Use realistic mock data
- Clean up mocks between tests

### 4. Assertions
- Use specific assertions
- Test both positive and negative cases
- Verify side effects and state changes

### 5. Coverage
- Aim for high test coverage
- Test edge cases and error conditions
- Include integration tests

## Common Test Patterns

### Testing Form Components
```typescript
it('renders form fields correctly', () => {
  render(<Component />);
  
  expect(screen.getByLabelText('Field Label')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Placeholder')).toBeInTheDocument();
});
```

### Testing Modal Components
```typescript
it('opens modal when button is clicked', async () => {
  render(<Component />);
  
  const button = screen.getByText('Open Modal');
  fireEvent.click(button);
  
  await waitFor(() => {
    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
```

### Testing API Calls
```typescript
it('calls API with correct parameters', async () => {
  const mockApiCall = jest.fn().mockResolvedValue({ data: mockData });
  
  render(<Component />);
  
  const submitButton = screen.getByText('Submit');
  fireEvent.click(submitButton);
  
  await waitFor(() => {
    expect(mockApiCall).toHaveBeenCalledWith(expectedParams);
  });
});
```

## Troubleshooting

### Common Issues

1. **Mock Not Working**
   - Ensure mocks are defined before imports
   - Check mock function signatures match real functions

2. **Async Test Failures**
   - Use `waitFor` for async operations
   - Ensure proper async/await usage

3. **Component Not Rendering**
   - Check if all required props are provided
   - Verify mock implementations

4. **State Not Updating**
   - Ensure Redux store is properly configured
   - Check if actions are dispatched correctly

### Debug Tips

1. **Use `screen.debug()`** to see current DOM state
2. **Check console logs** for error messages
3. **Verify mock implementations** are correct
4. **Test one thing at a time** to isolate issues

## Future Improvements

1. **Visual Regression Tests** - Add screenshot testing
2. **Performance Tests** - Test component performance
3. **E2E Tests** - Add end-to-end test coverage
4. **Accessibility Tests** - Add automated a11y testing
5. **Internationalization Tests** - Test RTL and localization
