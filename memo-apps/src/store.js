import { configureStore, createSlice } from '@reduxjs/toolkit'

let memo = createSlice({
    name : "memo",
    initialState : [
        {id : 0, title : "첫번째 메모", content : "첫번째 메모 내용", date : "2024-03-18", important : false},
        {id : 1, title : "두번째 메모", content : "두번째 메모 내용", date : "2024-03-19", important : false}
    ],
    reducers : {
        addMemo(state, action) {
            let newMemo = state.concat(action.payload);
            return newMemo;
        },

        updateMemo(state, action) {

        },

        deleteMemo(state, action) {
            let clickIndex = state.findIndex((state) => state.id === action.payload);
            let newMemo = [...state];
            newMemo.splice(clickIndex, 1);
            return newMemo;
        }
    }
});

export let { addMemo, deleteMemo } = memo.actions;

export default configureStore({
  reducer: {
    memo : memo.reducer
   }
});