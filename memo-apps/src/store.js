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

let groupMemo = createSlice({
    name : "groupmemo",
    initialState : [
        {id : 0, title : "First Group", subTitle : "첫번째 그룹 메모들", color : "#"},
        {id : 1, title : "Second Group", subTitle : "두번째 그룹 메모들", color : "#0000ff"},
        {id : 2, title : "Third Group Important Name", subTitle : "두번째 그룹 메모들", color : "#a52a2a"}
    ],
    reducers : {
        addGroup(state, action) {
            let newState = state.concat(action.payload);
            return newState;
        }
    }
});

let modal = createSlice({
    name : "modal",
    initialState : false,
    reducers : {
        setModal(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export let { addMemo, deleteMemo } = memo.actions;
export let { setModal } = modal.actions;
export let { addGroup } = groupMemo.actions;

export default configureStore({
  reducer: {
    memo : memo.reducer,
    modal : modal.reducer,
    groupMemo : groupMemo.reducer
   }
});