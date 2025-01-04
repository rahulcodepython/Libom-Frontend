export interface AccessTokenUserType {
    "token_type": 'access' | 'refresh'
    "exp": number
    "iat": number,
    "jti": string
    "username": string
    "email": string
    "first_name": string
    "last_name": string
    "image": string
    "is_superuser": boolean
}

export interface UserType {
    "username": string
    "email": string
    "first_name": string
    "last_name": string
    "image": string
    "is_superuser": boolean
}

export interface BookFormType {
    "name": string
    "isbn_no": string
    "author": string
    "quantity": number
    "category": string
    "image": string
}

export interface ApiResponseType {
    "status": number
    "data": any
}

export interface SignInFormType {
    "email": string
    "password": string
}

export interface SignUpFormType {
    "email": string
    "password": string
}