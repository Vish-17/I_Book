import React, { Children } from 'react'
import SocketContext from './socketContext'

const SocketState = () => {
  return (
    <SocketContext.Provider>
        {props.children}
    </SocketContext.Provider>
  )
}

export default SocketState