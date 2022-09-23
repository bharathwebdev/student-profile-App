import React from 'react'

import { Card, TextField } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import '../components/clgActivity.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { uuidv4 } from '@firebase/util';
import { useState } from 'react';
import '../pages/Profile.css'

function Achivements({profileForm,setprofieFrom,edit}) {
    const [profileAchievement,setprofileAchievemtnt] = useState(profileForm.Achivements);
  const handleClick = ()=>{
    const temp = {
      id:uuidv4(),
      achived:'dummy text edit this',

    }
     profileAchievement.push(temp)

     setprofieFrom(pre=>({...pre,Achivements:profileAchievement}))
     
  }

  const handleChange = (e,id)=>{
    const newState =  profileForm.Achivements.map(obj => {
      
      if (obj.id === id) {
        return {...obj,[e.currentTarget.getAttribute('name')]:e.currentTarget.textContent};
      }


      return obj;
    });

    setprofieFrom(pre=>({...pre,Achivements:[...newState]}))


  }
  const deleteList = ()=>{
      profileAchievement.pop();
      setprofieFrom(pre=>({
        ...pre,Achivements:profileAchievement
      }))
  }
//   console.log(profileForm.Achivements)

  return (
    <div className="certificate__container bd-grid">
    {
        profileAchievement.map(data=>{
       return  <div key={data.id} className="certificate__content">
            {/* <!-- <h3 className="certificate__title">Awards & Honours</h3> --> */}
             <li className = "li_what_i_do profile__description"
             contentEditable={edit} 
             name='achived'
             suppressContentEditableWarning={true}
             onInput={(e)=>handleChange(e,data.id)}
             onBlur={(e)=>handleChange(e,data.id)}
             
             dangerouslySetInnerHTML={{__html:data.achived}}>

             </li>
         </div>

        })
    }

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
      <p>Add achievement </p>
      </Card>
      <Card  onClick={deleteList} sx={{
          backgroundColor:'#f29d9d'
      }} className='remove_icon'>
      <DeleteIcon sx={{
        fontSize:'30px',
         color:'#ff0303'
        
      }}/>
      <p>Remove achievement </p>
      </Card>
      </div>

    }
     
</div>
  )
}

export default Achivements