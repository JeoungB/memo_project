import { combineReducers, configureStore, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist';
import { produce } from 'immer';
import sessionStorage from 'redux-persist/es/storage/session';
import { getDefaultMiddleware } from "@reduxjs/toolkit";

let memo = createSlice({
    name : "memo",
    initialState : [
        {id : 0, title : "영어 공부", content : "영단어 리스트~~", subTitle : "영어 단어 외우기", date : "2024-03-18", important : true, group : 0, check : true, color : "#ff00ff", modify : false},
        {id : 2, title : "근력 운동", content : "팔굽혀펴기, 딥스", subTitle : "매일 1시간씩", date : "2024-03-20", important : false, group : 1, check : true, color : "#0000ff", modify : false},
        {id : 3, title : "리액트 스터디", content : "라이프 사이클, 상태관리 등등", subTitle : "리액트 공부 관련", date : "2024-03-25", important : false, group : 0, check : true, color : "#ff00ff", modify : false},
        {id : 4, title : "강아지 사진 모음", content : "<p><img src=\"http://localhost:8080/uploadImgs/강아지1712842521305.jpg\"></p><p>강아지는 귀여워요</p><p><br></p><p><img src=\"http://localhost:8080/uploadImgs/강아지21712842584627.jpg\"></p><p>자고 있는 모습도 귀여워요</p>", subTitle : "강아지는 귀여워요", date : "2024-04-01", important : false, group : "", check : false, color : "", modify : false}
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
        {id : 0, title : "공부 관련", subTitle : "공부에 필요한 메모", color : "#ff00ff"},
        {id : 1, title : "운동", subTitle : "운동 관련 메모", color : "#0000ff"},
        {id : 2, title : "여러가지 메모들 모음집", subTitle : "메모 모음집", color : "#a52a2a"}
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

let darkMode = createSlice({
    name : "darkMode",
    initialState : false,
    reducers : {
        setDark(state) {
            state= !state;
            return state;
        }
    }
});

export let { addMemo, deleteMemo, updateMemo, importantMemo, addGroupMemo, deleteGroupMemo, checkMemo, allDeleteGroupMemo, canleCheck } = memo.actions;
export let { setModal } = modal.actions;
export let { addGroup, deleteGroup } = groupMemo.actions;
export let { setSelectModal } = selectModal.actions;
export let { changeSearch } = searchMemos.actions;
export let { setDark } = darkMode.actions;

const reducers = combineReducers({
    memo : memo.reducer,
    modal : modal.reducer,
    groupMemo : groupMemo.reducer,
    selectModal : selectModal.reducer,
    searchMemos : searchMemos.reducer,
    darkMode : darkMode.reducer,
});

const persistConfig = {
    key : 'memo',
    storage : sessionStorage,
    whitelist : ['memo', 'groupMemo', 'searchMemos', 'darkMode']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer : persistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    })
});

export default store;
