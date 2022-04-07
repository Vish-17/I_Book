import React from 'react'
import './mainPage.css'
const Main = () => {
  return (
    <div className='container' >
      <h1 className='text-center'>
        Id-Name: Vs_Karma
      </h1>
        <form>
                <div className="mb-3">
                    <label htmlFor="groupCode" className="form-label">Enter Group Code:</label>
                    <input type="text" className="form-control" id="groupCode" name='groupCode' aria-describedby="emailHelp" />
                </div>
                <button type="submit" className="btn btn-primary" >Form Group</button>
            </form>
    </div>
  )
}

export default Main