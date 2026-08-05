import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: "",
    category: "All",
    sort: "default",
};
const searchSlice = createSlice({
    name : "search",
    initialState,
    reducers: {
  setSearch: (state, action) => {
    state.search = action.payload;
  },
  setCategory: (state, action) => {
    state.category = action.payload;
  },
  setSort: (state, action) => {
    state.sort = action.payload;
  },
}
});

export const { setSearch,setCategory,setSort } = searchSlice.actions;
export default searchSlice.reducer;