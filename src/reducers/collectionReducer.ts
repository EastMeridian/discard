type ReducerState<E> = {
  error?: E;
  loading: boolean;
  value?: any;
};

type ErrorAction<E> = { type: "error"; error: E };
type ResetAction = { type: "reset"; defaultValue?: any };
type ValueAction = { type: "value"; value: any };
type ReducerAction<E> = ErrorAction<E> | ResetAction | ValueAction;

export const collectionInitialeState = {
  value: undefined,
  error: undefined,
  loading: true,
};

export const collectionReducer =
  <E>() =>
  (state: ReducerState<E>, action: ReducerAction<E>): ReducerState<E> => {
    switch (action.type) {
      case "error":
        return {
          error: action.error,
          loading: false,
          value: undefined,
        };
      case "reset":
        return collectionInitialeState;
      case "value":
        return {
          error: undefined,
          loading: false,
          value: action.value,
        };
      default:
        return state;
    }
  };
