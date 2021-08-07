import React from 'react'
import { useItem } from '../ItemsContext'
import Item from './Item'
import './Items.css'
function Items() {

    const { user, items} = useItem()

    const noItemStyle = {
      height: "calc(100vh - 250px)",
      textAlign: "center",
      fontSize: "14x",
      color: "#ef233c",
      margin: "10px auto",
      paddingTop: "175px",
    };
    const itemList = items.map((item) => {
        return (
            <Item key={item._id} 
            item={item} 
            />
            )
    })

    console.log(user.uid)
    
    
    
    return items.length > 0? (
        <div className='items'>
            {itemList}
        </div>
        
    ) :  (
      <h4 className="animate__animated animate__bounce" style={noItemStyle}>
        No Items Left
      </h4>
      
    )
}

export default Items
