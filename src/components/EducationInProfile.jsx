import React, { useEffect,useState } from 'react'
import uniqid from 'uniqid';
import { Button } from '@mui/material';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { Html } from '@mui/icons-material';
import { useContext } from 'react';
import { UserContext } from '../userContext';
function EducationInProfile({edit}) {
    const {pForm,setpFrom,change} = useContext(UserContext)
    const [profileEducation,setProfileEducation] = useState(pForm.Education)
    let LastElement =   pForm.Education.length-1




    useEffect(()=>{
      

        pForm.Education[LastElement].isLast=true;

      },[pForm.Education.length,pForm.Education]);

useEffect(()=>{
setProfileEducation(pForm.Education);
},[change,pForm])

      const addEducation = ()=>{
    
        const temp =  {
            id:uniqid(),
            educationTitle:'10TH',
            instuteName:'Sri Jayendra Golden Jubilee School,Kanchipuram.',
            mark:'CGPA - 9.4',
            duration:'2016 - 2017',
            isLast:true,
        };
   
        profileEducation.push(temp)
        LastElement = profileEducation.length-1
        const a = profileEducation.map((data,index)=>{
            console.log(`
                        ${index} , ${LastElement}
            `)
            if(index===LastElement){
                return {
                    ...data,
                isLast:true
                }
            }else {

                return {
                    ...data,
                    isLast:false
                }
            }
            
        })

        setProfileEducation(a);

        setpFrom(pre=>({...pre,Education:a}))
        console.log(pForm.Education)
        

        
  }


const removeEducation = ()=>{
if(profileEducation.length>3){
    profileEducation.pop();
    const a = profileEducation.map((data,index)=>{
        console.log("index :",index ,"length :",LastElement-1)
        if(index===LastElement-1){
            return {
                ...data,
            isLast:true
            }
        }else {
    
            return {
                ...data,
                isLast:false
            }
        }
        
    })
    setProfileEducation(a);

        
    
       
    setpFrom(pre=>({...pre,Education:profileEducation}))
}else {
    alert("Oops you can't delete those feilds")
}
    
 
}


const handleChange = (e,id)=>{
     
      const newState =  pForm.Education.map(obj => {
      
        if (obj.id === id) {
          return {...obj,[e.currentTarget.getAttribute('name')]:e.currentTarget.textContent};
        }

        // 👇️ otherwise return object as is
        return obj;
      });

      setpFrom(pre=>({...pre,Education:[...newState]}))
    //   console.log("profileEducation : ",profileEducation)
   console.log(pForm.Education);
}


// const educationupdate =(e,id)=>{
//   setstate((pre=>({...pre,[e.currentTarget.getAttribute('name')]:e.currentTarget.textContent})))

// }



  return (
  <>
{profileEducation.map(data=>{
  const {educationTitle,instuteName,mark,duration,isLast,id} = data;
    return (
    <div className="education__content" key={id}>
                                <div className="education__time">
                                    <span className="education__rounder"></span>
                                  {!isLast && <span className="education__line"></span>}
                                </div>

                                <div className="education__data bd-grid">
                                     <h3 className="education__title" 
                                     name='educationTitle'
                                     contentEditable={edit} 
                                     suppressContentEditableWarning={true}
                                    //  onInput={(e)=>handleChange(e,id)}
                                     onBlur={(e)=>handleChange(e,id)}
                                     
                                     dangerouslySetInnerHTML={{__html:educationTitle}}

                                    

                                     ></h3>
                                    <span
                                     className="education__studies"
                                     contentEditable={edit} 
                                     suppressContentEditableWarning={true}
                                    //  onInput={(e)=>handleChange(e,id)}
                                     onBlur={(e)=>handleChange(e,id)}
                                     dangerouslySetInnerHTML={{__html:instuteName}}
                                     name='instuteName'></span>
                                     
                                    <span 
                                    className="education__year"
                                    name='mark'
                                    contentEditable={edit} 
                                     suppressContentEditableWarning={true}
                                    //  onInput={(e)=>handleChange(e,id)}
                                     onBlur={(e)=>handleChange(e,id)}
                                     
                                     dangerouslySetInnerHTML={{__html:mark}}
                                    >
                                    </span>
                                    <span 
                                    className="education__year" 
                                    name='duration'
                                    contentEditable={edit} 
                                    // onInput={(e)=>handleChange(e,id)}
                                     onBlur={(e)=>handleChange(e,id)}
                                     
                                     dangerouslySetInnerHTML={{__html:duration}}
                                    suppressContentEditableWarning={true}
                                    ></span>
                                </div>
                            </div>

    )
})}

 

<div>
                        {edit && <>
                        
                        <Button variant='outlined'  sx={{margin:'10px'}} onClick={addEducation}>Add Education</Button>
                        <Button variant='outlined'  sx={{margin:'10px'}} onClick={removeEducation}>Remove Education</Button>
                        </>
                        }

                        </div>


                            {/* <div className="education__content">
                                <div className="education__time">
                                    <span className="education__rounder"></span>
                                    <span className="education__line"></span>
                                </div>

                                <div className="education__data bd-grid">
                                    <h3 className="education__title">12TH</h3>
                                    <span className="education__studies">Sri Jayendra Golden Jubilee School,Kanchipuram.</span>
                                    <span className="education__year">Percentage - 74%</span>
                                    <span className="education__year">2018 - 2019</span>
                                </div>
                            </div>

                            <div className="education__content">
                                <div className="education__time">
                                    <span className="education__rounder"></span>

                                </div>

                                <div className="education__data bd-grid">
                                    <h3 className="education__title">10TH</h3>
                                    <span className="education__studies">Sri Jayendra Golden Jubilee School,Kanchipuram.</span>
                                    <span className="education__year">CGPA - 9.4</span>
                                    <span className="education__year">2016 - 2017</span>
                                </div>
                            </div> */}
                            </>

  )
}

export default EducationInProfile