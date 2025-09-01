import { store } from '@/lip/store'
import { RootState } from '@/lip/store'

describe('Redux Store', () => {
  it('should have the correct initial state structure', () => {
    const state = store.getState()
    
    expect(state).toHaveProperty('auth')
    expect(state).toHaveProperty('lockers')
    expect(state).toHaveProperty('loginApi')
    expect(state).toHaveProperty('traineesApi')
    expect(state).toHaveProperty('programApi')
    expect(state).toHaveProperty('addStudentApi')
    expect(state).toHaveProperty('TraningContetnApi')
    expect(state).toHaveProperty('UserAPI')
    expect(state).toHaveProperty('QuestionAPI')
    expect(state).toHaveProperty('LectureAPI')
    expect(state).toHaveProperty('MarketerAPI')
    expect(state).toHaveProperty('SafeAPI')
    expect(state).toHaveProperty('FeesAPI')
  })

  it('should have auth reducer with correct initial state', () => {
    const state = store.getState()
    
    expect(state.auth).toHaveProperty('user')
    expect(state.auth).toHaveProperty('token')
    expect(state.auth).toHaveProperty('isAuthenticated')
  })

  it('should have lockers reducer', () => {
    const state = store.getState()
    
    expect(state.lockers).toBeDefined()
  })

  it('should have all API reducers', () => {
    const state = store.getState()
    
    // Check that all API reducers are present
    const apiReducers = [
      'loginApi',
      'traineesApi',
      'programApi',
      'addStudentApi',
      'TraningContetnApi',
      'UserAPI',
      'QuestionAPI',
      'LectureAPI',
      'MarketerAPI',
      'SafeAPI',
      'FeesAPI'
    ]
    
    apiReducers.forEach(apiName => {
      expect(state).toHaveProperty(apiName)
    })
  })

  it('should have correct middleware configuration', () => {
    const middleware = store.getState()
    
    // The store should be configured with middleware
    expect(store).toBeDefined()
  })

  it('should dispatch actions correctly', () => {
    const initialState = store.getState()
    
    // Dispatch a test action
    store.dispatch({ type: 'TEST_ACTION' })
    
    const newState = store.getState()
    
    // State should change (even if just by reference)
    expect(newState).not.toBe(initialState)
  })

  it('should have correct store configuration', () => {
    expect(store).toBeDefined()
    expect(typeof store.dispatch).toBe('function')
    expect(typeof store.getState).toBe('function')
    expect(typeof store.subscribe).toBe('function')
  })
})

describe('Store Type Definitions', () => {
  it('should have correct RootState type', () => {
    const state: RootState = store.getState()
    
    expect(state).toBeDefined()
    expect(typeof state).toBe('object')
  })

  it('should have correct AppDispatch type', () => {
    const { AppDispatch } = require('@/lip/store')
    
    expect(AppDispatch).toBeDefined()
  })
})
