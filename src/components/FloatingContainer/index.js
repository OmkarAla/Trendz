import {useState} from 'react'
import './index.css'

const FloatingContainer = () => {
  const [showCredentials, setShowCredentials] = useState(false)

  const handleClick = () => {
    setShowCredentials(!showCredentials) // Toggle the visibility of credentials
  }

  return (
    <div className="floating-container">
      {/* Credentials appear above "Watch Me!" */}
      {showCredentials && (
        <div className="credentials">
          <p>
            <strong>Username:</strong> rahul
          </p>
          <p>
            <strong>Password:</strong> rahul@2021
          </p>
        </div>
      )}

      {/* Button for interacting */}
      <button
        className="floating-box"
        type="button"
        onClick={handleClick}
        aria-label="Toggle credentials visibility"
      >
        <p className="watch-me-text">Watch Me!</p>
      </button>
    </div>
  )
}

export default FloatingContainer
