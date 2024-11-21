
interface ModalState {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
}

type ModalAction =
  | { type: 'OPEN_MODAL'; title: string; content: React.ReactNode }
  | { type: 'CLOSE_MODAL' };


// Define the initial state for the modal
export const initialState: ModalState = {
  isOpen: false,
  title: '',
  content: null,
};

// Define the reducer function
export function modalReducer(state: ModalState, action: ModalAction) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isOpen: true,
        title: action.title,
        content: action.content,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isOpen: false,
        content: null,
      };
    default:
      return state;
  }
}
