const { isAuth, isAdmin } = require("../controller/auth")
const { requireSignin, userById } = require("../controller/user")
const { createCategory, categoryById, readByCategoryId, updateCategory, deleteCategory, getCategories  } = require("../controller/category")

module.exports = (app) => {
    app.param("userId", userById )

    app.param("categoryId", categoryById )

    app.get("/categories", getCategories )

    app.get("/category/:categoryId", readByCategoryId )

    app.post("/create-category/:userId", requireSignin, isAuth, isAdmin, createCategory )
    
    app.post("/admin/create-category/:userId", requireSignin, isAuth, isAdmin, createCategory )

    app.put("/create-category/:categoryId/:userId", requireSignin, isAuth, isAdmin, updateCategory )

    app.delete("/create-category/:categoryId/:userId", requireSignin, isAuth, isAdmin, deleteCategory )

}
