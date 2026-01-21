/**
 * TYPING ANIMATION COMPONENT
 * Displays text with typewriter effect
 * Used in hero section for ministry name and vision
 */

import React, { useState, useEffect } from 'react'
import './typingAnimation.css'

const TypingAnimation = ({ text, speed = 50, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed])

  return (
    <div className={`typing-animation ${className}`}>
      {displayedText}
      <span className="typing-cursor"></span>
    </div>
  )
}

export default TypingAnimation
