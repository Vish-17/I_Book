import React from 'react'
import { useState } from 'react';
import './mainPage.css'
const Main = () => {
  const [groupCode, setGroupCode] = useState('something');
  return (
    <div className='container' >
      <h1 className='text-center'>
        Id-Name: Vs_Karma
      </h1>
      <form>
        <div className="mb-3">
          <label htmlFor="groupCode" className="form-label">Form Group:</label>
          <input type="text" className="form-control" id="groupCode" name='groupCode' aria-describedby="emailHelp" />
        </div>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Form Group
        </button>

        {/* <!-- Modal --> */}
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Group Invite Code</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h3>Invite Your Friends Using This Code:</h3> 
                <h2>{groupCode}</h2>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Share</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Main