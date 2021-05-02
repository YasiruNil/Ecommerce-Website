export const addItem = (item, next) => {
  let cart = []
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.push({ ...item, count: 1 })
    //remove dublicates and add more items to the cart
    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id)
    })
    localStorage.setItem("cart", JSON.stringify(cart))
    next()
  }
}
export const cartTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length
    }
    return 0
  }
}
export const getCartItems = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"))
    }
    return []
  }
}
export const updateItem = (id, value) => {
  let cart = []
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.map((p, i) => {
      if (p._id === id) {
        cart[i].count = value
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}
export const removeItem = (id) => {
  let cart = []
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.map((p, i) => {
      if (p._id === id) {
        cart.splice(i, 1)
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart))
  }
  return cart
}
export const removeCart = (next) => {
  let cart = []
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart")
    next()
  }
}
export const userUpdateInLs = (newUser,next) => {
  let auth = []
  if (typeof window !== "undefined") {
    if (localStorage.getItem("JWTtoken")) {
      auth = JSON.parse(localStorage.getItem("JWTtoken"))
      auth.user.name = newUser.name
      auth.user.email = newUser.email
      localStorage.setItem("JWTtoken", JSON.stringify(auth))
      next()
    }
  }
}
