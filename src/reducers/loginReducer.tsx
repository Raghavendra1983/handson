

const initialState = {
    error: '',
    username: '',
    token: ''
};

export default (state = initialState, { type, payload }: any) => {
    switch (type) {
        case 'ERROR_THROWN_FROM_API':
            return { ...state, error: { ...payload } };

        default:
            return state;
    }
};
