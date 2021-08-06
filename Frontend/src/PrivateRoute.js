import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useItem } from './ItemsContext'

export default function PrivateRoute({ component : Component, ...rest}) {
    const {user} = useItem()
    return (
        <Route
        {...rest}
        render = {(props) => {
            return user? (<Component {...props} />) : (<Redirect to='/login' />)
        }}
        />
    )
}
