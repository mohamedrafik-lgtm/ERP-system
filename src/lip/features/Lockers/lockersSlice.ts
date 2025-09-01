import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LockersState {
  selectedLockerId: string | null;
}

const initialState: LockersState = {
  selectedLockerId: null,
};

export const lockersSlice = createSlice({
  name: 'lockers',
  initialState,
  reducers: {
    setSelectedLocker: (state, action: PayloadAction<string | null>) => {
      state.selectedLockerId = action.payload;
    },
  },
});

export const { setSelectedLocker } = lockersSlice.actions;
export default lockersSlice.reducer;
