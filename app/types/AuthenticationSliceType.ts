export type AuthenticationSliceinitialState ={
    loading: boolean,
    user: null | string,
    error: null | string,
    username: ""| string,
    password: ""| string,
    confirmPassword: "" | string,
}

export type LoginSliceinitialState ={
    loading: boolean,
    user: null | string,
    error: null | any,
    username: ""| string,
    password: ""| string,
    token: null | string
}