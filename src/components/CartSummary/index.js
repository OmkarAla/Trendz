// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const newSum = cartList.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )
      const no = cartList.length
      return (
        <div>
          <h1>Order Total: Rs.{newSum} /-</h1>
          <p>{no} items in cart</p>
          <button type="button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
