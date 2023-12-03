export const GlobalComponent = {
    // Api Calling
    API_URL: 'https://api-node.themesbrand.website/',
    // API_URL : 'http://127.0.0.1:3000/',
    headerToken: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },

    // Auth Api
    AUTH_API: "https://api-node.themesbrand.website/auth/",
    // AUTH_API:"http://127.0.0.1:3000/auth/",


    // Products Api
    product: 'apps/product',
    productDelete: 'apps/product/',

    // Orders Api
    order: 'apps/order',
    orderId: 'apps/order/',

    // Customers Api
    customer: 'apps/customer',

    //Api back tesis
    API_TESIS: 'http://127.0.0.1:8000/',
    registro: 'registros',
    filtro: 'filtro?value=',
    num_riesgo:'num_riesgo',
    predict: 'predecir',
}
