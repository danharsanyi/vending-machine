export interface Product {
    price: number,
    title: string,
}

export const PRODUCTS = {
    'caramel': {
        price: 250,
        title: 'Caramel'
    },
    'hazelnut': {
        price: 310,
        title: 'Hazelnut'
    },
    'organicraw': {
        price: 200,
        title: 'Organic Raw'
    },
}

export const VALID_CURRENCY = [ 10, 20, 50, 100, 200 ];