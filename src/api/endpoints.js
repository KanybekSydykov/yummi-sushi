const _URI = 'https://food.tatadev.pro/api/v1/'; 

export const ENDPOINTS = {
    getHomepage: () => _URI + 'pages/home/',
    getCategoryData: (slug) => _URI + `products/category/${slug}/`,
    postLogin: () => _URI + 'users/login/',
    postOtp: () => _URI + 'users/verify-code/',
    getUserProfileInfo: () => _URI + 'users/profile/',
    patchUserProfileInfo: () => _URI + 'users/profile/',
    getUserAdress: () => _URI + 'users/addresses/',
    postUserAdress: () => _URI + 'users/addresses/',
    patchUserAdress: (id) => _URI + `users/addresses/${id}/update/`,
    deleteAdress: (id) => _URI + `users/addresses/${id}/delete/`,
    getRestaurantAdresses: () => _URI + 'orders/restaurants/',
    getDeliveryPrice: () => _URI + 'orders/order-preview/',
    postCreateOrder: () => _URI + 'orders/create-order/',
    getBanners: () => _URI + 'pages/banners/',
    getCategories: () => _URI + 'products/categories/only/',
    getContacts: () => _URI + 'pages/contacts/',
    getBonusAmount: () => _URI + 'users/bonus/',
    getUserOrders : () => _URI + 'orders/orders/',
    getBonusProducts: () => _URI + 'products/bonus/',
}