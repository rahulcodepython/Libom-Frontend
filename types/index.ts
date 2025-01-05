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
    "status": 200 | 201 | 400 | 406
    "data": {
        "success"?: string
        "error"?: string
    } | any
}

export interface SignInFormType {
    "email": string
    "password": string
}

export interface SignUpFormType {
    "email": string
    "password": string
}

export interface PricingType {
    id: string,
    amount: number,
    max_borrow: number,
    journal_access: boolean,
    premium_book_access: boolean,
    holding_time: number,
    duration: 30 | 365,
}

export interface BookType {
    isbn_no: string,
    borrowed: boolean,
    request_pending: boolean,
    name: string,
    author: string,
    quantity: number,
    category: string,
    image: string,
}

export interface BorrowingType {
    id: string,
    isbn_no: string,
    user: string,
    state: 'canceled' | 'approved' | 'pending',
    date: string,
}