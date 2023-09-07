import React, { useState } from 'react'
import './App.css'
function CryptoStorefront() {
  const [cryptocurrencies] = useState([
    { name: 'Bitcoin', price: 40000 },
    { name: 'Ethereum', price: 2800 },
    { name: 'Litecoin', price: 150 },
  ])

  const [cart, setCart] = useState([])
  const [selectedCrypto, setSelectedCrypto] = useState('')
  const [quantity, setQuantity] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value)
  }

  const handleBuyClick = () => {
    if (selectedCrypto && quantity > 0) {
      const newItem = {
        crypto: selectedCrypto,
        quantity,
        total: quantity * getCryptoPrice(selectedCrypto),
      }
      setCart([...cart, newItem])
      setSelectedCrypto('')
      setQuantity('')
      setErrorMessage('')
    } else {
      setErrorMessage(
        'Please select a cryptocurrency and enter a valid quantity.',
      )
    }
  }

  const getCryptoPrice = (cryptoName) => {
    const crypto = cryptocurrencies.find((c) => c.name === cryptoName)
    return crypto ? crypto.price : 0
  }

  const handleRemoveItem = (index) => {
    const updatedCart = [...cart]
    updatedCart.splice(index, 1)
    setCart(updatedCart)
  }

  return (
    <div className="crypto-storefront">
      <h2>Crypto Storefront</h2>
      <div className="crypto-list">
        {cryptocurrencies.map((crypto, index) => (
          <div key={index} className="crypto-card">
            <h3>{crypto.name}</h3>
            <p>Price: ${crypto.price}</p>
            <button onClick={() => setSelectedCrypto(crypto.name)}>
              Select
            </button>
            {selectedCrypto === crypto.name && (
              <div>
                <input
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <button onClick={handleBuyClick}>Buy</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="shopping-cart">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.crypto} - Quantity: {item.quantity} - Total: ${item.total}
                <button onClick={() => handleRemoveItem(index)}>Remove</button>
              </li>
            ))}
            <li>
              Total Cost: ${cart.reduce((total, item) => total + item.total, 0)}
            </li>
          </ul>
        )}
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  )
}

export default CryptoStorefront
