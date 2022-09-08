import React, { useEffect,useState } from 'react'
import uniqid from 'uniqid';
import { Button } from '@mui/material';
function EducationInProfile({   profileForm,setprofieFrom, edit}) {
    const [profileEducation,setProfileEducation] = useState(profileForm.Education)
    let LastElement =   profileForm.Education.length-1
    console.log(LastElement)
    useEffect(()=>{
      

     
        
        profileForm.Education[LastElement].isLast=true;
        
      },[profileForm.Education.length,profileForm.Education]);

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
        const a = profileEducation.map((data,index)=>{
            console.log("index :",index ,"length :",LastElement+1)
            if(index===LastElement+1){
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
        

       
        setprofieFrom(pre=>({...pre,Education:profileEducation}))

        console.log(profileEducation)
        
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
        
    
       
    setprofieFrom(pre=>({...pre,Education:profileEducation}))
}else {
    alert("Oops you can't delete those feilds")
}
    
 
}
const handleChange = (e,id)=>{
  

    
    const newState = profileEducation.map(obj => {

        if (obj.id === id) {
          return {...obj,[e.target.getAttribute('name')]:e.target.innerText};
        }

        // 👇️ otherwise return object as is
        return obj;
      });
    
      console.log('newState:',newState)
      setProfileEducation(newState)
      console.log("profileEducation:",profileEducation)


      setprofieFrom(pre=>({...pre,Education:profileEducation}))
  
    
     console.log(profileForm.Education)

}



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
                                     onBlur={(e)=>handleChange(e,id)}

                                     
                                     >{educationTitle}</h3>
                                    <span
                                     className="education__studies"
                                     contentEditable={edit} 
                                     suppressContentEditableWarning={true}
                                     onBlur={(e)=>handleChange(e,id)}
                                     name='instuteName'>{instuteName}</span>
                                    <span 
                                    className="education__year"
                                    name='mark'
                                    contentEditable={edit} 
                                     suppressContentEditableWarning={true}
                                     onBlur={(e)=>handleChange(e,id)}
                                    >
                                        {mark}</span>
                                    <span 
                                    className="education__year" 
                                    name='duration'
                                    contentEditable={edit} 
                                    suppressContentEditableWarning={true}
                                    onBlur={(e)=>handleChange(e,id)}
                                    >{duration}</span>
                                </div>
                            </div>

    )
})}

 

<div>
                        {edit && <>
                        
                        <Button onClick={addEducation}>Add Education</Button>
                        <Button onClick={removeEducation}>Remove Education</Button>
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