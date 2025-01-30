import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const list = cartList.filter(each => each.id !== id)
    this.setState({cartList: list})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newList = cartList.map(each => {
      if (each.id === id) {
        const newItem = {...each, quantity: each.quantity + 1}
        return newItem
      }
      return each
    })
    this.setState({cartList: newList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newList = cartList.map(each => {
      if (each.id === id) {
        const newItem = {...each, quantity: each.quantity - 1}
        return newItem
      }
      return each
    })
    this.setState({cartList: newList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const no = cartList.find(product)
    if (no === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newList = cartList.map(each => {
        if (each === product) {
          const item = {...each, quantity: each.quantity + 1}
          return item
        }
        return each
      })
      this.setState({cartList: newList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
