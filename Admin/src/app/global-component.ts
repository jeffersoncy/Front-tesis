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
    //API_TESIS: 'https://tesis-back-cmb4.onrender.com/',
    API_TESIS: 'http://localhost:8000/',
    registro: 'registros',
    filtro: 'filtro?value=',
    num_riesgo:'num_riesgo?value=',
    predict: 'predecir',
    departamentos:'departamentos',
    lista_variables: 'lista_variables',
    lista_variables_significado:'lista_variables_significado',

    conteo_depto:'conteo_depto?',
    conteo_niv_eduXfrecMarih: 'conteo_nivel_edu_marihuana?',
    conteo_niv_eduXfrecCocaina: 'conteo_nivel_edu_cocaina',
    conteo_niv_eduXfrecBazuco: 'conteo_nivel_edu_bazuco',
    conteo_riesgoXsexoTipo: 'conteo_riesgo_sexo_tipo'
}
