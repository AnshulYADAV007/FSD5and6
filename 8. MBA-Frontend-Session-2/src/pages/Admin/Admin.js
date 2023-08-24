import React, { useEffect, useState } from 'react'
import { getAllTheatres } from '../../api/theatre'

// Pragya, I will write comments wherever possible.
const Admin = () => {
  let [theatres, setTheatres] = useState([])

  // Function to fetch the threatres from the backend.
  const fetch = async () => {
    let result = await getAllTheatres()
    setTheatres(result.data)
  }

  useEffect(() => {
    fetch()
  }, [])
  return (
    <div>
      {' '}
      <table className="w-100">
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>City</th>
        </tr>
        {theatres.map((theatre) => {
          return (
            <tr>
              <td>{theatre.name}</td>
              <td>{theatre.description}</td>
              <td>{theatre.city}</td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

export default Admin
