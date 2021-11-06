import React from 'react'

const Sight = ({ stroke="rgba(0, 0, 0, 0.5)", fill="#fff", drag}) => {
      return (
    <svg
      viewBox="0 0 100 100"
      onMouseDown={drag}
      pointerEvents="none"
    >
    <circle
      cx="50"
      cy="50"
      r="50"
      fill="transparent"
    />
    <circle
      cx="50"
      cy="50"
      r="50"
      fill="transparent"
      pointerEvents="visiblePainted"
    />
      <path
        d="M 50 0
           a 50 50 0 1 1 0 100
           a 50 50 0 1 1 0 -100
           m 0 2
           a 48 48 0 1 0 0 96
           a 48 48 0 1 0 0 -96
           v 45
           m 3 3
           h 45
           m -96 0
           h 45
           m 3 3
           v 45
           v -39
           a 5 5 0 1 1 0 -20
           a 5 5 0 1 1 0 20
           v 2
           a 7 7 0 1 0 0 -24
           a 7 7 0 1 0 0 24
           "
        stroke={stroke}
        fill={fill}
      />
    </svg>
  )
}

export default Sight