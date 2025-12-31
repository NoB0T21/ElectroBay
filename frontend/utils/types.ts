interface Order{
    _id: string,
    userId: string,
    productId: string[],
    productName: string[],
    Fullname: string,
    PhoneNo: number,
    Address: string,
    City: string,
    State: string,
    Pincode: number,
    price: number,
    payment: boolean,
    createdAt:string,
}

export interface Products{
    _id: string,
    productType: string,
    name: string,
    description: string,
    price: number,
    offerprice: number,
    stock: number,
    images: [{
        url: string,
        path: string,
        background: string
    }],
    createdAt:string,
}

export type User = {
    _id?: string,
    email?: string,
    name?: string,
    picture: string,
}

export interface AddProduct{
    name?: string;
    description?: string;
    category?: string;
    price?: string;
    offerprice?: string;
    stock?: string;
    background?: string
    file?: File | null
}