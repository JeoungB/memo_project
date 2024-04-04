import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import { produce } from 'immer';
import sessionStorage from 'redux-persist/es/storage/session';
import { getDefaultMiddleware } from "@reduxjs/toolkit";

let memo = createSlice({
    name : "memo",
    initialState : [
        {id : 0, title : "영어 공부", content : "영단어 리스트~~", subTitle : "영어 단어 외우기", date : "2024-03-18", important : false, group : "", check : false, color : ""},
        {id : 2, title : "운동", content : "팔굽혀펴기, 딥스", subTitle : "매일 1시간씩", date : "2024-03-20", important : false, group : "", check : false, color : ""},
        {id : 3, title : "리액트 스터디", content : "라이프 사이클, 상태관리 등등", subTitle : "리액트 공부 관련 메모", date : "2024-03-25", important : false, group : "", check : false, color : ""}
    ],
    reducers : {
        addMemo(state, action) {
            let newMemo = state.concat(action.payload);
            return newMemo;
        },

        updateMemo(state, action) {
            let newMemo = [...state];
            let currentMemo = newMemo.findIndex((newMemo) => newMemo.id == action.payload[0]);
            newMemo[currentMemo] = action.payload[1];
            return newMemo;
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

        deleteGroupMemo(state, action) {
            return produce(state, draft => {
                let checkMemo = draft.find((draft) => draft.id == action.payload);
                checkMemo.group = "";
                checkMemo.check = false;
                checkMemo.color = "";
            });
        },

        allDeleteGroupMemo(state, action) {
            return produce(state, draft => {
                let deleteGroupMemos = draft.filter((draft) => draft.group === action.payload);
                for(let i = 0 ; i < deleteGroupMemos.length ; i++) {
                    deleteGroupMemos[i].group = "";
                    deleteGroupMemos[i].color = "";
                    deleteGroupMemos[i].check = false;
                }
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
        },

        canleCheck(state, action) {
            for(let i = 0 ; i < action.payload.length ; i++) {
                let result = state.find((state) => state.id == action.payload[i]);
                result.check = false;
            };
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
        },

        deleteGroup(state, action) {
            let newState = [...state];
            let checkGroup = newState.findIndex((newState) => newState.id == action.payload);
            newState.splice(checkGroup, 1);
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
});

let searchMemos = createSlice({
    name : "searchMemos",
    initialState : {value : ""},
    reducers : {
        changeSearch(state, action) {
            state.value = action.payload;
        }
    }
});

export let { addMemo, deleteMemo, updateMemo, importantMemo, addGroupMemo, deleteGroupMemo, checkMemo, allDeleteGroupMemo, canleCheck } = memo.actions;
export let { setModal } = modal.actions;
export let { addGroup, deleteGroup } = groupMemo.actions;
export let { setSelectModal } = selectModal.actions;
export let { changeSearch } = searchMemos.actions;

const reducers = combineReducers({
    memo : memo.reducer,
    modal : modal.reducer,
    groupMemo : groupMemo.reducer,
    selectModal : selectModal.reducer,
    searchMemos : searchMemos.reducer
});

const persistConfig = {
    key : 'memo',
    storage : sessionStorage,
    whitelist : ['memo', 'groupMemo', 'searchMemos']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
});

export default store;
