import React from 'react'
import { Card, TextField } from '@mui/material'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import '../components/clgActivity.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { uuidv4 } from '@firebase/util';
import { useState } from 'react';
function ProfileLanguages({profileForm,setprofieFrom,edit}) {
    const [profileLang,setProfileLang] = useState(profileForm.Languages);
    const handleClick = ()=>{
      const temp = {
        id:uuidv4(),
        lang:'enter the language ',
  
      }
       profileLang.push(temp)
  
       setprofieFrom(pre=>({...pre,Languages:profileLang}))
       
    }
  
    const handleChange = (e,id)=>{
      const newState =  profileForm.Languages.map(obj => {
        
        if (obj.id === id) {
          return {...obj,[e.currentTarget.getAttribute('name')]:e.currentTarget.textContent};
        }
  
  
        return obj;
      });
  
      setprofieFrom(pre=>({...pre,Languages:[...newState]}))
  
  
    }
    const deleteList = ()=>{
        profileLang.pop();
        setprofieFrom(pre=>({
          ...pre,Languages:profileLang
        }))
    }
    // console.log(profileForm.Languages)
  return (
    <div className="languages__container">
    <ul style={{display:'flex',
    justifyContent:'space-around',
    alignItems:'center',
    flexWrap:'wrap'
    }} className="languages__content bd-grid">
        {
            profileLang.map(data=>{
                return <li 
                key={data.id} 
                className=" i_what_i_do profile__descriptioc "
                contentEditable={edit} 
                name='lang'
                suppressContentEditableWarning={true}
                onInput={(e)=>handleChange(e,data.id)}
                onBlur={(e)=>handleChange(e,data.id)}
                dangerouslySetInnerHTML={{__html:data.lang}}
                >

             </li>
            })
        }
  
</ul>
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
      <p>Add Language </p>
      </Card>
      <Card  onClick={deleteList} sx={{
          backgroundColor:'#f29d9d'
      }} className='remove_icon'>
      <DeleteIcon sx={{
        fontSize:'30px',
         color:'#ff0303'
        
      }}/>
      <p>Remove Language </p>
      </Card>
      </div>

    }
</div>
  )
}

export default ProfileLanguages