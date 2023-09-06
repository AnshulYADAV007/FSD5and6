import './Booking.css'
import React, { useState, useEffect } from 'react'

const seats = Array.from({ length: 8 * 8 }, (_, index) => index)

const Booking = () => {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [occupiedSeats, setOccupiedSeats] = useState([10, 12, 50, 33, 28, 47])
  const [moviePrice, setMoviePrice] = useState(250)

  return (
    <>
      <div className="App bg-black backg">
        <h2 className="fw-bold text-light">Doom</h2>
        <ShowCase />
        <Cinema />
        <p className="info">
          You have selected{' '}
          <span className="fw-bold">{selectedSeats.length}</span> seats for the
          price of{' '}
          <span className="fw-bold">{selectedSeats.length * moviePrice}</span>$
        </p>
      </div>
    </>
  )
}

const Cinema = () => {
  return <h1>Cinema</h1>
}
const ShowCase = () => {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" />
        <small>Available</small>
      </li>
      <li>
        <span className="seat selected" />
        <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" />
        <small>Occupied</small>
      </li>
    </ul>
  )
}
export default Booking
