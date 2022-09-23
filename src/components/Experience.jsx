import React from 'react'
import { useState ,useEffect} from 'react'
import uniqid from 'uniqid'
import { Button } from '@mui/material'
import { useContext } from 'react'
import { UserContext } from '../userContext'
import { toast } from 'react-toastify'
import { uuidv4 } from '@firebase/util'
function Experience({   profileForm,setprofieFrom, edit}) {
    const {pForm,setpFrom,change} = useContext(UserContext)
    const [profileExperience,setProfileExperience] = useState(pForm.Experience)
    let LastElement =   pForm.Experience.length-1




    useEffect(()=>{
      

        pForm.Experience[LastElement].isLast=true;

      },[pForm.Experience.length,pForm.Experience]);

useEffect(()=>{
setProfileExperience(pForm.Experience);
},[change,pForm])

      const addEducation = ()=>{
    
        const temp =  {
            id:uuidv4(),
            experience__title:'Virtual Internship',
            experience__company:'FutureReadyTalent | Microsoft',
            experience__description:'10/2021 - 01/2022.'
    
          };
   
        profileExperience.push(temp)
        LastElement = profileExperience.length-1
        const a = profileExperience.map((data,index)=>{
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

        setProfileExperience(a);

        setpFrom(pre=>({...pre,Experience:a}))
        console.log(pForm.Experience)
        

        
  }


const removeEducation = ()=>{
if(profileExperience.length>1){
    profileExperience.pop();
    const a = profileExperience.map((data,index)=>{
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
    setProfileExperience(a);

        
    
       
    setpFrom(pre=>({...pre,Experience:profileExperience}))
}else {
    toast.warning("you should have atleat one feild in experience");
}
    
 
}


const handleChange = (e,id)=>{
     console.log(e.currentTarget.getAttribute('name'))
      const newState =  pForm.Experience.map(obj => {
      
        if (obj.id === id) {
          return {...obj,[e.currentTarget.getAttribute('name')]:e.currentTarget.textContent};
        }

        // 👇️ otherwise return object as is
        return obj;
      });

      setpFrom(pre=>({...pre,Experience:[...newState]}))
    //   console.log("profileEducation : ",profileEducation)
   console.log(pForm.Experience);
}


// const educationupdate =(e,id)=>{
//   setstate((pre=>({...pre,[e.currentTarget.getAttribute('name')]:e.currentTarget.textContent})))

// }



  return (
    <div className="experience__container bd-grid">
        {
            profileExperience.map(data=>{
                const {experience__title,experience__description,experience__company,isLast,id} =data
                return  <div key={id} className="experience__content">
                <div className="experience__time">
                    <span className="experience__rounder"></span>
                   {!isLast && <span className="experience__line"></span>}
                </div>
        
                <div className="experience__data bd-grid">
                    <h3 className="experience__title"
                    name="experience__title"
                     contentEditable={edit} 
                     suppressContentEditableWarning={true}
                    //  onInput={(e)=>handleChange(e,id)}
                     onBlur={(e)=>handleChange(e,id)}
                     
                     dangerouslySetInnerHTML={{__html:experience__title}}
                    ></h3>
                    <span className="experience__company"
                    name='experience__company'
                     contentEditable={edit} 
                     suppressContentEditableWarning={true}
                    //  onInput={(e)=>handleChange(e,id)}
                     onBlur={(e)=>handleChange(e,id)}
                     
                     dangerouslySetInnerHTML={{__html:experience__company}}
                    ></span>
                    <p className="experience__description"
                    name="experience__company"
                     contentEditable={edit} 
                     suppressContentEditableWarning={true}
                    //  onInput={(e)=>handleChange(e,id)}
                     onBlur={(e)=>handleChange(e,id)}
                     
                     dangerouslySetInnerHTML={{__html:experience__description}}
                    ></p>
                </div>
            </div>
            })
        }
           {edit && <>
                        
                        <Button variant='outlined' onClick={addEducation}>Add Experience</Button>
                        <Button variant='outlined' onClick={removeEducation}>Remove Experience</Button>
                        </>
                        }
   
    {/* <!-- <div className="experience__content">
        <div className="experience__time">
            <span className="experience__rounder"></span>
            <span className="experience__line"></span>
        </div>

        <div className="experience__data bd-grid">
            <h3 className="experience__title">MODEL DEPLOYMENT</h3>
            <span className="experience__company">From 2025 to 2029 | SIM</span>
            <p className="experience__description">Work in this company dedicating the best responsibility in the area that corresponds, delivering the best results for the company and improving productivity.</p>
        </div>
    </div> --> */}
    {/* <div className="experience__content">
        <div className="experience__time">
            <span className="experience__rounder"></span> */}
            {/* <!-- <span className="experience__line"></span>  --> */}
        {/* </div> */}

        {/* <div className="experience__data bd-grid">
            <h3 className="experience__title">Coordinated National Level Tech Fest</h3>
            <span className="experience__company">Coordinated National level Debugging Event . </span>
            <p className="experience__description">08/2022 </p>
        </div>
    </div> */}
</div>
  )
}

export default Experience