import React from 'react'
import '../components/Certificate.css'
import { useState } from 'react';
import {Box, Card} from '@mui/material';
import {TextField} from '@mui/material';
import '../pages/Profile.css'

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import {Button} from '@mui/material';
import {Input} from '@mui/material';
// import AlertDialog from './Makesure';
import { toast } from 'react-toastify';
import { Title } from '@mui/icons-material';
import { upload } from '@testing-library/user-event/dist/upload';
import { getStorage ,ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../userContext';
import { uuidv4 } from '@firebase/util';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularColor from './loading';
import { useEffect } from 'react';
import {Dialog} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {DialogTitle }from '@mui/material';


function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
  
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };

function Certificates({profileForm,setprofieFrom,edit}) {
     
    const {User,setLoading,loading,change,setChange,pForm,setpFrom}=useContext(UserContext)
    // const [change,setChange] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentCertificateDeleteId,setcurrentUserDeteleId] = useState('');
  const [imgLink,setimgLink] = useState('');
    const handleClickOpen = () => {
      // setOpen(true)
    };

    const handleClose = () => {
      setOpen(false);
    };
 const [Progress,setProgress] = useState(0);
 const {certificates}=pForm
 console.log("tis is ",certificates)
 const [profileCertificate,setprofileCertificate]=useState(pForm.certificates)
 const [certificateForm, setCertificateForm] =useState({});
 const [imgloading,setimgloading]=useState(false)

 const handleChange = (e) => {
   setCertificateForm(pre=>({
     ...pre,[e.target.getAttribute('name')]:e.target.value
    }))
    console.log(certificateForm);
  };
  useEffect(()=>{
    setprofileCertificate(profileForm.certificates)
  },[certificateForm,change])
const handleChangeEdit = (e,id)=>{

     
    const newState =  profileForm.certificates.map(obj => {
    
      if (obj.id === id) {
        return {...obj,[e.currentTarget.getAttribute('name')]:e.currentTarget.textContent};
      }

      // 👇️ otherwise return object as is
      return obj;
    });

    setprofieFrom(pre=>({...pre,certificates:[...newState]}))
  //   console.log("profileEducation : ",profileEducation)
  // console.log("this is certificate",profileForm.certificates)

}
// console.log("profile: ",profileForm.certificates)
  const imgupload  = (e)=>{
   const a = e
      setimgloading(true);
      console.log(imgloading)
    const  image  = e.target.files[0];
    const uploadProfileImg =async(e)=>{
       
        return new Promise((resolve,reject)=>{
           const storage = getStorage();
           const fileName = `${User.uid}-${image.name}-${uuidv4()}`
           const storageRef = ref(storage,'images/'+User.uid+'/certificates/'+fileName)
   
           const uploadTask = uploadBytesResumable(storageRef, image);
           uploadTask.on('state_changed', 
        (snapshot) => {
       // Observe state change events such as progress, pause, and resume
       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       setProgress(progress)
       console.log('Upload is ' + progress + '% done');
       switch (snapshot.state) {
         case 'paused':
           console.log('Upload is paused');
           break;
         case 'running':
           console.log('Upload is running');
           break;
       }
     }, 
     (error) => {
      reject(error)
     }, 
     () => {
       // Handle successful uploads on complete
       // For instance, get the download URL: https://firebasestorage.googleapis.com/...
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const auth = getAuth()
            resolve(downloadURL);
            certificateForm.link=downloadURL
            setimgloading(false);
            a.target.value=null
       });
     }
   );
           
        })
    }
    
    uploadProfileImg(image)
        
}


const handleSubmit=(e)=>{
  e.preventDefault();
  
  console.log("certificate from : " , certificateForm)
   certificateForm.id=uuidv4()
    if(Progress===100){

        setprofieFrom(pre=>({
            ...pre,certificates:[
                ...profileForm.certificates,
                certificateForm
            ]
        }))
        setprofileCertificate(profileForm.certificates);
        setCertificateForm({});
        document.getElementById('new_certificate_form').reset()
    }else {
        alert('Upload certificate image')
        return false
    }


    setProgress(0)
  }
  
// console.log(profileForm.certificates)
const handleDelete  = (e,id)=>{
  // kk()
  if(profileForm.certificates.length>1){
    setOpen(true);
    setcurrentUserDeteleId(id);
    
    // toast.success('cretificate deleted')
  }else {
    // alert("you can't delete this certificate  now create new certificate and delete this")
  toast.warning("you can't delete this certificate  now create new certificate and delete this")
}
}
// console.log(imgloading)
// console.log(Progress)

const handleDeleteYes  = ()=>{

       const newState =  profileForm.certificates.filter(obj => {
      
        if (obj.id !== currentCertificateDeleteId) {
          return  obj;
        }

        // 👇️ otherwise return object as is
        
      });

      setprofieFrom(pre=>({...pre,certificates:[...newState]}))
    //   console.log("profileEducation : ",profileEducation)
    setChange(pre=>!pre);
    
    toast.success('certificate successfully deleted');
    setOpen(false)
      
}
  return (

    <div className="certificate__container bd-grid">
        {
profileCertificate.map(data=>{
    const {id,certificate__title,certificate__description,link}=data
    return <div key={id} className="certificate__content">
      <div className='title_container'>
    <h3 className="certificate__title"
     contentEditable={edit} 
     name='certificate__title'
     suppressContentEditableWarning={true}
     onInput={(e)=>handleChangeEdit(e,id)}
     onBlur={(e)=>handleChangeEdit(e,id)}
     
     dangerouslySetInnerHTML={{__html:certificate__title}}
    
    ></h3>
    <div className='links'>
    {!edit && <a className='section-title bx bx-link bx-tada' target="_blank" href={link}><AttachFileTwoToneIcon  className='linkIn_Certificate'/></a>}
    {edit &&<div className='deleteicon_container' onClick={(e)=>{
      handleDelete(e,id)
      handleClickOpen()}}> <DeleteIcon  className='delete'/> </div>}
      </div>
    </div>
    <p className="certificate__description"
    contentEditable={edit} 
    name='certificate__description'
    suppressContentEditableWarning={true}
    onInput={(e)=>handleChangeEdit(e,id)}
    onBlur={(e)=>handleChangeEdit(e,id)}
    dangerouslySetInnerHTML={{__html:certificate__description}}
    ></p>
</div>
})
        }

    {edit &&
        <Card
        sx={{
            margin:'20px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-evenly'
            
            
        }}
     
      >
     <p style={{color:'gray'}}>Add your certificates here </p>

<form id='new_certificate_form' onSubmit={handleSubmit}>
        <Box sx={{
    margin:'20px',
     display:'grid',
     gridGap:'20px'
    
}}>



<TextField id="outlined-basic" 
label="TITLE" variant="outlined"
name='certificate__title'
onInput={handleChange}
onBlur={handleChange}
required
value={certificateForm.certificate__title}

 />



<TextField InputLabelProps={{ shrink: true }}
name="certificate__description"
onInput={handleChange}
onBlur={handleChange}
required
value={certificateForm.certificate__description}



 sx={{
     
            width:'80%',
        }}  label="DESCRIPTION"  />

<Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input name='img'   onChange={imgupload} hidden accept="image/*" multiple type="file" />
      </Button>
      <IconButton color="primary"  aria-label="upload picture" component="label">
      {(imgloading && Progress<100) && <CircularColor/> }
       {(Progress===100) &&  <CircularProgressWithLabel value={Progress} /> }
       {(!imgloading && Progress<100) && <p>Upload your certificate Image</p>}
      </IconButton>
    </Stack>
        <Button variant='outlined' type='submit' disabled={Progress!==100}>SUBMIT</Button>
        </Box>
</form>

      </Card>
        }
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do you want to delete this certificate from your profile permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={handleDeleteYes} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    
</div>
  )
}

export default Certificates