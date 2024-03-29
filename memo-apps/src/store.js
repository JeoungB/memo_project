import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import { produce } from 'immer';
import sessionStorage from 'redux-persist/es/storage/session';
import { getDefaultMiddleware } from "@reduxjs/toolkit";

let memo = createSlice({
    name : "memo",
    initialState : [
        {id : 0, title : "첫번째 메모", content : "첫번째 메모 내용", subTitle : "첫번째 메모 설명", date : "2024-03-18", important : false, group : "", check : false, color : ""},
        {id : 2, title : "두번째 메모", content : "두번째 메모 내용", subTitle : "두번째 메모 설명", date : "2024-03-20", important : false, group : "", check : false, color : ""},
        {id : 3, title : "세번째 메모", content : "세번째 메모 내용", subTitle : "세번째 메모 설명", date : "2024-03-25", important : false, group : "", check : false, color : ""}
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
        },

        importantMemo(state, action) {
            return produce(state, draft => {
                let clickIndex = draft.findIndex((draft) => draft.id === action.payload);
                draft[clickIndex].important = !draft[clickIndex].important;
            });
        },

        addGroupMemo(state, action) {
            return produce(state, draft => {
                let checkMemo = draft.filter((draft) => {
                    return draft.check === true && draft.group === "";
                });
                for(let i = 0 ; i < checkMemo.length ; i++) {
                    checkMemo[i].group = action.payload[0];
                    checkMemo[i].color = action.payload[1];
                };
            });
        },

        checkMemo(state, action) {
            return produce(state, draft => {

                let checkMemo = draft.filter((draft) => {
                    return draft.id === action.payload;
                });

                for(let i = 0 ; i < checkMemo.length ; i++) {
                    checkMemo[i].check = !checkMemo[i].check;

                    if(checkMemo[i].check === false) {
                        checkMemo[i].group = "";
                    }
                };
            });
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

let selectModal = createSlice({
    name : "selectModal",
    initialState : false,
    reducers : {
        setSelectModal(state, action) {
            state = action.payload;
            return state;
        }
    }
})

export let { addMemo, deleteMemo, importantMemo, addGroupMemo, checkMemo } = memo.actions;
export let { setModal } = modal.actions;
export let { addGroup } = groupMemo.actions;
export let { setSelectModal } = selectModal.actions;

// export default configureStore({
//   reducer: {
//     memo : memo.reducer,
//     modal : modal.reducer,
//     groupMemo : groupMemo.reducer,
//     selectModal : selectModal.reducer
//    }
// });

const reducers = combineReducers({
    memo : memo.reducer,
    modal : modal.reducer,
    groupMemo : groupMemo.reducer,
    selectModal : selectModal.reducer
});

const persistConfig = {
    key : 'memo',
    storage : sessionStorage,
    whitelist : ['memo', 'groupMemo']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
});

export default store;
