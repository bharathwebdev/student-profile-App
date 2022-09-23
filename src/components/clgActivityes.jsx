import React from 'react'
import { Card, TextField } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import '../components/clgActivity.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { uuidv4 } from '@firebase/util';
import { useState } from 'react';
import '../pages/Profile.css'
import { useContext } from 'react';
import {UserContext} from '../userContext'
function ClgActivityes({profileForm,setprofieFrom,edit}) {
  const {pForm,setpFrom} = useContext(UserContext)
  const [profileActitvity,setprofileActivity] = useState(pForm.CollegeActivities);
  const handleClick = ()=>{
    const temp = {
      id:uuidv4(),
      activity:'dummy text edit this',

    }
     profileActitvity.push(temp)

     setpFrom(pre=>({...pre,CollegeActivities:profileActitvity}))
     
  }

  const handleChange = (e,id)=>{
    const newState =  pForm.CollegeActivities.map(obj => {
      
      if (obj.id === id) {
        return {...obj,[e.currentTarget.getAttribute('name')]:e.currentTarget.textContent};
      }


      return obj;
    });

    setpFrom(pre=>({...pre,CollegeActivities:[...newState]}))


  }
  const deleteList = ()=>{
      profileActitvity.pop();
      setpFrom(pre=>({
        ...pre,CollegeActivities:profileActitvity
      }))
  }
  // console.log(profileForm.CollegeActivities)

  return (
    <div>
    <div className="certificate__container bd-grid">
        <ul style={{listStyleType:'disc'}}>
            {
              profileActitvity.map(data=>{
                return <div key={data.id}  className="certificate__content">
                  <li className = "li_what_i_do profile__descriptioc activity_desc"

                 contentEditable={edit} 
                 name='activity'
                 suppressContentEditableWarning={true}
                 onInput={(e)=>handleChange(e,data.id)}
                 onBlur={(e)=>handleChange(e,data.id)}
                 dangerouslySetInnerHTML={{__html:data.activity}}

                  
                  >

                  </li>

                  </div>
              })
            }
            
        </ul>

    </div>
    {edit &&
    <div style={{display:'flex',
    justifyContent:'center',alignItems:'center',
    flexWrap:'wrap'
    }}>
    <Card onClick={handleClick} sx={{
      backgroundColor:'#a7bcfc',

      
    }} className='add_icon'>
      <AddBoxIcon sx={{
        fontSize:'30px',
         color:'#0540f0'
        
      }}/>
      <p>Add Activities </p>
      </Card>
      <Card  onClick={deleteList} sx={{
          backgroundColor:'#f29d9d'
      }} className='remove_icon'>
      <DeleteIcon sx={{
        fontSize:'30px',
         color:'#ff0303'
        
      }}/>
      <p>Remove Activities </p>
      </Card>
      </div>

    }
</div>
  )
}

export default ClgActivityes