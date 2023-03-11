import { ADD_ENTRY, SELECT_ALL_ENTRY, UPDATE_ENTRY, TOGGLE_ENTRY_DIALOG, 
   GET_ENTRYS, GET_TEAM_ENTRYS, SELECT_ENTRY } from '../types';

const initialState = {
    entry: [],
    selectedEntry: [],
    openDialog: false,
    teamEntry: []
}

const toggleEntryDialog = state => ({
    ...state,
    openDialog: !state.openDialog
  });


const selectEntry = (state, payload) => {
    const { selectedEntry } = state;
  
    const selectedIndex = selectedEntry.indexOf(payload);
    let newSelected = [];
  
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedEntry, payload);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedEntry.slice(1));
    } else if (selectedIndex === selectedEntry.length - 1) {
      newSelected = newSelected.concat(selectedEntry.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedEntry.slice(0, selectedIndex),
        selectedEntry.slice(selectedIndex + 1)
      );
    }
  
    return {
      ...state,
      selectedEntry: newSelected
    };
  };
  

const getEntrys = (state, payload) => ({
    ...state,
    entry: payload
  });

  const getTeamEntrys = (state, payload) => ({
    ...state,
    teamEntry: payload
  });


const selectAllEntry = state => ({
...state,
selectedEntry: !state.selectedEntry.length
    ? state.entry.map(data => data._id)
    : []
});

// const addEntry = (state, payload) => ({
//   ...state,
//   entry: [...state.entry, payload]
// });

// const updateEntry = (state, payload) => ({
//   ...state,
//   entry: [...state.entry.filter(data => data._id !== payload._id), payload]
// });

// const deleteEntry = (state, payload) => ({
//     ...state,
//     entry: state.entry.filter(data => data._id !== payload),
//     selectedEntry: state.selectedEntry.filter(element => element !== payload)
//   });


  export default (state = initialState, action) => {
      const { type, payload } = action;

        switch (type) {
            case GET_ENTRYS:
                return getEntrys(state, payload);

            case GET_TEAM_ENTRYS:
              return getTeamEntrys(state, payload);

            case SELECT_ALL_ENTRY:
                return selectAllEntry(state);

            case SELECT_ENTRY:
              return selectEntry(state, payload)
            case ADD_ENTRY:
                return {
                    ...state,
                    entry: [action.payload, ...state.entry]
                };
            case TOGGLE_ENTRY_DIALOG:
                return toggleEntryDialog(state);
            case UPDATE_ENTRY:
                let index = state.entry.findIndex(
                    task => task._id === action.payload._id
                );
                state.entry.splice(index, 1);
            
                return {
                    ...state,
                    entry: [action.payload, ...state.entry]
                };
            // case DELETE_ENTRY:
            //     return deleteEntry(state, payload);
            default:
                return state;
        }
  }