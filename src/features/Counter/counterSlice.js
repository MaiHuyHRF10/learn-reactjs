const { createSlice } = require("@reduxjs/toolkit");

const counterSlice = createSlice({
  name: "counterSlice",
  initialState: 0,
  reducers: {
    increase(state) {
      return state + 1;
    },

    decrease(state) {
      return state - 1;
    },
  },
});

const { actions, reducer } = counterSlice;
export const { increase, decrease } = actions;
export default reducer;
