const { 
    productById,
    createProduct,
    getAllProducts,
    getSearchFilter,
    readProductById,
    getProductPhoto,
    removeProductById,
    updateProductById,
    getRelatedProduct,
    getProductBySearch,
    getProductCategories
  } = require("../controller/product")
const { isAuth, isAdmin } = require("../controller/auth")
const { requireSignin, userById } = require("../controller/user")

module.exports = (app) => {
    app.param("userId", userById )

    app.param("productId", productById )

    app.get("/products",getAllProducts )

    app.get("/products/search",getSearchFilter )

    app.get("/product/:productId", readProductById )
 
    app.post("/products/by/search",getProductBySearch )

    app.get("/products/categories",getProductCategories )

    app.get("/product/photo/:productId",getProductPhoto )

    app.get("/products/related/:productId",getRelatedProduct )

    app.post("/admin/create-product/:userId", requireSignin, isAuth, isAdmin, createProduct )

    app.post("/product/:productId/:userId",requireSignin, isAuth, isAdmin, updateProductById )

    app.delete("/product/:productId/:userId",requireSignin, isAuth, isAdmin, removeProductById )



    
}
