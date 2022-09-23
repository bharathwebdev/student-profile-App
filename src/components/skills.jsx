import { Edit } from '@mui/icons-material'
import React from 'react'
import uniqid from 'uniqid';
import CustomizedHook from './Skillinput'
function Skills({profileForm,edit,setprofieFrom}) {
    const {skills} = profileForm

  return (
    <div className="skills_container">
                            <div className="skills__data">
                                {skills.map(data=>{
                                return   <p key={uniqid()} className="skills__name">
                              {/* <span className='skills__circle'></span>  {data} */}{data}
                            </p>
                                })}
                              

                            </div>
                            {edit &&  <CustomizedHook skills ={skills} setprofieFrom={setprofieFrom}/>}

                        </div>
  )
}

export default Skills