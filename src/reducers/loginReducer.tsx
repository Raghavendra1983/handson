export const initialState = {
    user: '',
    token: ''
};
interface payloadType {
    user: string,
    token: string,

}
interface combinedPayloadType {
    payload: payloadType,
    type?: string
}


export default (state = initialState, { type, payload }: combinedPayloadType) => {
    switch (type) {
        case 'ERROR_THROWN_FROM_API':
            return { ...state, error: { ...payload } };
        case 'LOGIN_SUCCESS':
            sessionStorage.setItem('@app/user', payload.user);
            sessionStorage.setItem('@app/token', payload.token);
            return { ...payload }
        default:
            return state;
    }
};
