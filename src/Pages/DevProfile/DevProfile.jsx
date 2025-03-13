import { Backdrop, Checkbox, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import ReactFlagsSelect from 'react-flags-select';
import PhoneInput from 'react-phone-number-input';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import closeIcon from "../../Assets/Icons/close-button.svg";
import editPen from "../../Assets/Icons/edit-pen.svg";
import emailIcon from "../../Assets/Icons/email-icon.svg";
import linkedin from "../../Assets/Icons/linkedin.svg";
import phoneIcon from "../../Assets/Icons/phone-icon-2.svg";
import pictureIcon from "../../Assets/Icons/picture.svg";
import errorIcon from "../../Assets/Icons/error.svg";
import { DropDownMenu } from "../../Components";
import { BlueButton } from "../../Components/BlueButton/BlueButton";
import { TextInput } from "../../Components/TextInput";
import { homeActions } from "../../Redux/HomeSlice";
import { userActions } from "../../Redux/UserSlice";
import { countryList } from "./Components/countryList";
import langList from "./Components/langList/langList";
import 'react-phone-number-input/style.css';
import "react-datepicker/dist/react-datepicker.css";
import "./DevProfile.scss";
import { DevHeader } from "./Components/DevHeader";
import { DevActions } from "../../Redux/DeveloperSlice";




export const DevProfile = ()=>{

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, userData, loading, error } = useSelector((state) => state.user);
  const {jobs, homeLoading, homeError} = useSelector((state)=>state.home)

  //To trigger useEffect for get, while submitting post, put, delete forms
  const [trigger, setTrigger] = useState(false)

  //Exception, couldn't access if declare after 
  const available = userData?.available

  const [avia, setAvia] = useState(available)


  //can be removed
  // const [menu, setMenu] = useState(false)

  //Modals
  const [genModal, setGenModal] = useState(false)
  const [expModal, setExpModal] = useState(false)
  const [aviaModal, setAviaModal] = useState(false)
  const [roleModal, setRoleModal] = useState(false)
  const [skillsModal, setSkillsModal] = useState(false)
  const [workExpModal, setWorkExpModal] = useState(false)
  const [eduModal, setEduModal] = useState(false)
  const [workExpProjectModal, setWorkExpProjectModal] = useState(false)
  //
  
  const [phoneCode, setPhoneCode] = useState()
  const [currentSalary, setCurrentSalary] = useState(0);

  //Detect button data-types and id

  const [btnType, setBtnType] = useState()
  const [clickedId, setClickedId] = useState()
  const [clickedIdAlpha, setClickedIdAlpha] = useState()


  //Managing inputs adding

  const [educationsList, setEducationsList] = useState()

  const [workSkill, setWorkSkillList] = useState()

  const [projectSkill, setProjectSkillList] = useState()


  //Work Modal Checkbox
  const [isWorkChecked, setIsWorkChecked] = useState(false)

  const [isProjectChecked, setIsProjectChecked] = useState(false)

  const [worksList, setWorksList] = useState()



const [agree, setAgree] = useState(false)

const [profilePicture, setProfilePicture] = useState()


const [inputs, setInputs] = useState([]);
const [langInputs, setLangInputs] = useState([]);

  // Input values

  //refs
const roleRef = useRef(null); //for role and salary dropdown


  //

  //Mock datas
  const langLevelOptions = [
    {value: "Beginner", label: "Beginner"},
    {value: "Experienced", label: "Experienced"},
    {value: "Advanced", label: "Advanced"},
    {value: "Expert", label: "Expert"},
    {value: "Native", label: "Native"}
  ]


  const competencyOptions = [
    {value: "Beginner", label: "Beginner"},
    {value: "Experienced", label: "Experienced"},
    {value: "Advanced", label: "Advanced"},
    {value: "Expert", label: "Expert"},
  ]


  const years = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40
  ]

 const yearsList =  years.map(opt => ({ label: opt, value: opt }));

 const degrees = [
  "Bachelors", "Master", "Doctorate", "MBA", "Secondary High school"
]

const degreeList =  degrees.map(opt => ({ label: opt, value: opt }));

const skills = [
  ".NET", "ABAP", "Android", "ReactJs", "ReactNative", "Flutter"
]

const skillsList =  skills.map(opt => ({ label: opt, value: opt }));


 //Variables------------

  //resume file name
  const fileName = userData?.resume?.filePath
  const filePath = `https://job-px4t.onrender.com/resumes/${fileName}`

  //User data from server

  const userName = userData?.fullName
  const userEmail = userData?.email

  
  const nationalityInfo = userData?.nationality

  const phoneNumber = userData?.phoneNumber
  const aboutyourself = userData?.aboutyourself
  const linkedIn = userData?.linkedIn
  const experience = userData?.experience?.experience
  const remoteExperience = userData?.experience?.remoteExperience
  const preferredRole = userData?.roleAndSalary?.preferredRole
  const monthlySalary = userData?.roleAndSalary?.monthlySalary
  const expectedSalary = userData?.roleAndSalary?.expectedSalary

  const workExperience = userData?.workExperience

  const skillsListData = userData?.skills
  const langListData = userData?.lang
  
  const [nationality, setNationality] = useState("");

  const [residance, setResidance] = useState("");

  const [location, setLocation] = useState("");
 
  //
  //Logics--------------------------


  const selectedEdu = educationsList?.find(item => item?._id === clickedId)

  const selectedWork = worksList?.find(item => item?._id === clickedId)


  const selectedProject = selectedWork?.projects?.find(item => item?._id === clickedIdAlpha)

  

//This code was written for inserting date to DatePicker in education and work exp. modals which comes from backend

// const eduStartDateString = selectedEdu?.startDate
// console.log(eduStartDateString);
// const [month, year] = (eduStartDateString ?? "").split("/");
// const eduModalStartDate = new Date(`${year}-${month}-01`);

//State for date formats

const [startDateWorkExp, setStartDateWorkExp] = useState(new Date()); //DatePicker start date Work Experience

const [endDateWorkExp, setEndDateWorkExp] = useState(new Date()); //DatePicker end date  Work Expirience

const [startDateProject, setStartDateProject] = useState(new Date()); //DatePicker start date project

const [endDateProject, setEndDateProject] = useState(new Date()); //DatePicker end date  project

const [startDateEdu, setStartDateEdu] = useState(new Date()); //DatePicker start date education

const [endDateEdu, setEndDateEdu] = useState(new Date()); //DatePicker end date  education

   const url = "https://job-px4t.onrender.com/api"

  //
  //Handles and integration
//First form upload resume


useEffect(()=>{
  dispatch(userActions.setLoading(true))
  axios.get(`${url}/user/token`, {
    headers: {
    token
    }
  }).then((data)=>{  
    dispatch(userActions.setUserData(data.data))

    setProfilePicture(data.data?.profilePicture)
    setNationality(data.data?.nationality)
    setResidance(data.data?.residence)
    setPhoneCode(data.data?.phoneNumber?.split(" ")[0])
    setEducationsList(data?.data?.education)
    setWorksList(data?.data?.workExperience)

  
    //Skills and languages modal

   
 setInputs([...data.data?.skills?.map((item)=>({
    skill: { value: item.skill,
     label: item.skill},
    experience: { value: item.experience,
     label: item.experience},
    level: { value: item.level,
     label: item.level}
   })), {skill: { value: "",
       label: ""},
      experience: { value: "",
       label: ""},
      level: { value: "",
       label: ""}}])

  setLangInputs([...data.data?.lang?.map((item)=>({
        language: { value: item.language,
         label: item.language},
         level: { value: item.level,
         label: item.level},
       })), {language: { value: "",
           label: ""},
           level: { value: "",
           label: ""}}])


    //Work experience modal
    
   const selectedWorkExp =  data?.data?.workExperience?.find((item)=>item._id === clickedId)

  

     
    const selectedProject = selectedWorkExp?.projects?.find((item)=>item._id === clickedIdAlpha)


  setLocation(selectedWorkExp?.location)

  setIsWorkChecked(selectedWorkExp?.workingNow)

 setWorkSkillList(selectedWorkExp?.skill?.map((item)=>({
  value: item,
  label: item
})))


setProjectSkillList(selectedProject?.skill?.map((item)=>({
  value: item,
  label: item
})))

setStartDateWorkExp(selectedWorkExp?.startDate)

    //---------
  
  }).catch((err)=>{
    console.log(err);
    dispatch(userActions.setError(true))
  }).finally(()=>{
    dispatch(userActions.setLoading(false))
  })
}, [clickedId, clickedIdAlpha, trigger])




  useEffect(() => {
    axios
      .get(`${url}/category`)
      .then((data) => {
        dispatch(homeActions.setJobs(data.data));
      })
      .catch(() => {
        dispatch(homeActions.setHomeError(true));
      });
  }, [userData]);

//Skills and Languages modal handle

const handleInputChange = (index, inputName, selectedOption) => {
  const newInputs = [...inputs];

  if (inputName === "skill" && selectedOption !== "" && newInputs[index].skill === "") {
    newInputs[index].experience = yearsList[0];
    newInputs[index].level = competencyOptions[0];
    setInputs(newInputs);
  } else if (inputName === "experience" && selectedOption !== '' && newInputs[index].experience === "") {
    newInputs[index].skill = skillsList[0];
    newInputs[index].level = competencyOptions[0];
    setInputs(newInputs);
  } else if (inputName === "level" && selectedOption !== "" && newInputs[index].level === "") {
    newInputs[index].skill = skillsList[0];
    newInputs[index].experience = yearsList[0];
    setInputs(newInputs);
  }

  newInputs[index][inputName] = selectedOption;
  setInputs(newInputs);

  // Add a new div with three inputs if the last div is filled
  if (index === inputs.length - 1 && selectedOption !== '') {
    setInputs([...inputs, { skill: '', experience: '', level: '' }]);
  }


};

const handleLangInputChange = (index, inputName, selectedOption) => {
  const newInputs = [...langInputs];

  if (inputName === "language" && selectedOption !== '' &&  newInputs[index].language === '') {
    newInputs[index].level = langLevelOptions[0];
    setLangInputs(newInputs);
  } else if (inputName === "level" && selectedOption !== '' &&  newInputs[index].level === '') {
    newInputs[index].language = langList[0];
    setLangInputs(newInputs);
  } 

  newInputs[index][inputName] = selectedOption;
  setLangInputs(newInputs);

  // Add a new div with three inputs if the last div is filled
  if (index === langInputs.length - 1 && selectedOption !== '') {
    setLangInputs([...langInputs, { language: '', level: '' }]);
  }
};


const handleSkillDelete = (index, evt)=>{
  evt.preventDefault()
  if (inputs.length === 1) {
    // Do not delete the last row
    return;}

    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
}

const handleLangDelete = (index, evt)=>{
  evt.preventDefault()
  if (langInputs.length === 1) {
    // Do not delete the last row
    return;}

    const newInputs = [...langInputs];
    newInputs.splice(index, 1);
    setLangInputs(newInputs);
}



const handleSkillsModalSubmit = (evt)=>{
evt.preventDefault()
dispatch(userActions.setLoading(true))

inputs.pop()
langInputs.pop()

const newInputs = inputs.map((item)=>({
  skill: item.skill.value,
  experience: item.experience.value,
  level: item.level.value,
}))

const newLangInputs = langInputs.map((item)=>({
  language: item.language.label,
  level: item.level.value,
}))


const body = {
  skills: newInputs,
  language: newLangInputs
}



axios.post(`${url}/skillAndLanguages`, body, {
  headers: {
    token
  }
}).then((res)=>{ 
  console.log(res);
  setSkillsModal(false)
}).catch((err)=>{
  console.log(err);
  // setError(true)
}).finally(()=>{
  // setLoading(false)
  setTrigger(!trigger)
  dispatch(userActions.setLoading(false))

})


}



const handleResumeUpload = (evt)=> {

  const formData = new FormData()

  formData.append("resume", evt.target.files[0])


  axios.post(`${url}/resume`, formData, {
    headers: {
      token
    }
  }).then((res)=>{ 
    console.log(res);
  }).catch((err)=>{
    console.log(err);
    // setError(true)
  }).finally(()=>{
    // setLoading(false)
    setTrigger(!trigger)
  })

}

const handleResumeEdit = (evt)=>{

  const formData = new FormData()

  formData.append("resume", evt.target.files[0])

  axios.put(`${url}/resume/${userData?.resume?._id}`, formData, {
    headers: {
      token
    }
  }).then((res)=>{ 
    console.log(res);
  }).catch((err)=>{
    console.log(err);
    // setError(true)
  }).finally(()=>{
    // setLoading(false)
  })
}

const handleResumeDelete = ()=>{
  axios.delete(`${url}/resume/${userData?.resume?._id}`, {
    headers: {
    token
    }
  }).then((res)=>{
console.log(res);
  }).catch((err)=>{
    console.log(err);
    // setError(true)
  }).finally(()=>{
    // setLoading(false)
  })
}




//General info modal 2nd form control:
  const handleGenModalSubmit = (evt)=>{
    evt.preventDefault()

    dispatch(userActions.setLoading(true))

const profileImg = document.getElementById('selectedFileImg').files[0]

const target = evt.target

//Can be destructed:
const fullName = `${target.firstNameInput.value} ${target.lastNameInput.value}`
const phoneNumber = target.phoneInput.value
const aboutyourself = target.textAreaGeneral.value
const linkedIn = target.linkedInLink.value


const formData = new FormData()

formData.append("fullName", fullName)
formData.append("profilePicture", profileImg)
formData.append("aboutyourself", aboutyourself)
formData.append("nationality", nationality)
formData.append("residence", residance)
formData.append("phoneNumber", `${phoneCode} ${phoneNumber}`)
formData.append("linkedIn", linkedIn)


axios.put(`${url}/user`, formData, {
  headers: {
    token
  }
} ).then((res)=>{
  console.log(res);
  setGenModal(false)

}).catch((err)=>{
  console.log(err.message);
}).finally(()=>{
  setTrigger(!trigger)
  dispatch(userActions.setLoading(false))
})


  }

  //Overall experience 3rd modal form control

  const handleExpModalSubmit = (evt)=>{
    evt.preventDefault()
    
    dispatch(userActions.setLoading(true))

    const target = evt.target

    const experience = +target.yearOfExp.value
    const remoteExperience = +target.yearRemoteOfExp.value

    const body = {
      experience, remoteExperience
    }

    const type = {"Content-type": "application/json"}

    axios.put(`${url}/experience`, body, {
      headers: {
        token, type
      }
    }).then((res)=>{
      console.log(res);
      setExpModal(false)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })
  }

  ////Overall aviablity 4th modal form control

  const handleAviaInputChange = (evt)=>{
    setAvia(evt.target.value)
  }

  const handleAviaModalSubmit = (evt)=>{
    evt.preventDefault()
    dispatch(userActions.setLoading(true))

const formData = new FormData()

formData.append("available", avia )

    axios.put(`${url}/user`, formData, {
      headers: {
        token
      }
    }).then((res)=>{
      console.log(res);
      setAviaModal(false)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })
  }

  //Fifth modal role modal submit

  const handleRoleModalSubmit = (evt)=>{
    evt.preventDefault()

    dispatch(userActions.setLoading(true))

    const target = evt.target

    const preferredRole = target.roleModalDropdown.value
    const monthlySalary = target.salaryInputCurrent.value
    const expectedSalary = target.salaryInputExp.value

    const body = {
      preferredRole, monthlySalary, expectedSalary 
    }
   

    axios.put(`${url}/roleAndSalary`, body, {
      headers: {
        token
      }
    }).then((res)=>{
      console.log(res);
      setRoleModal(false)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })

  }


  //7th modal Work experience form


  useEffect(()=>{
    if(btnType === "add"){
      setLocation("")
      setWorkSkillList("")
    }
  }, [btnType])



  const handleWorkExpModalSubmit = (evt)=> {

    evt.preventDefault()

    
    dispatch(userActions.setLoading(true))

    const target = evt.target

    const companyName = target.companyName.value
    const jobTitle = target.jobTitle.value
    const description = target.textAreaWorkExp.value
    

    const skill = workSkill?.map((option) => option.value);


       const body = {
      companyName, jobTitle, location, skill, startDate: startDateWorkExp, endDate: isWorkChecked ? "" : endDateWorkExp,
      description, 
      workingNow: isWorkChecked
    }


    axios.post(`${url}/workExperience`, body, {
      headers: {token}
    }).then((res)=>{
      console.log(res);
      setWorkExpModal(false)
    }).catch((err)=>{
      console.log(err.message);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })
    

  
  }

  const handleWorkExpModalUpdate = (evt)=> {
    evt.preventDefault()

    dispatch(userActions.setLoading(true))

    const target = evt.target

    const companyName = target.companyName.value
    const jobTitle = target.jobTitle.value
    const description = target.textAreaWorkExp.value
    

    const skill = workSkill?.map((option) => option.value);

    const body = {
      companyName, jobTitle, location, skill, startDate: startDateWorkExp, endDate: isWorkChecked ? "" : endDateWorkExp,
      description, 
      workingNow: isWorkChecked
    }


    axios.put(`${url}/workExperience/${clickedId}`, body, {
      headers: {token}
    }).then((res)=>{
      console.log(res);
      setWorkExpModal(false)
    }).catch((err)=>{
      console.log(err.message);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })
    

  
  }

  const handleProjectModalSubmit = (evt)=> {

    evt.preventDefault()

    
    dispatch(userActions.setLoading(true))

    const target = evt.target

    const projectName = target.projectName.value

    const description = target.textAreaProject.value
    

    const skill = projectSkill?.map((option) => option.value);

       const body = {
      projectName,  skill, startDate: startDateProject, endDate: isProjectChecked ? "" : endDateProject,
      description, 
      workingNow: isProjectChecked
    }




    axios.post(`${url}/workProject/${clickedId}`, body, {
      headers: {token}
    }).then((res)=>{
      console.log(res);
      setWorkExpProjectModal(false)
    }).catch((err)=>{
      console.log(err.message);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })
    

  
  }

  const handleProjectModalUpdate = (evt)=>{
    evt.preventDefault()

    
    dispatch(userActions.setLoading(true))

    const target = evt.target

    const projectName = target.projectName.value

    const description = target.textAreaProject.value
    

    const skill = projectSkill?.map((option) => option.value);

       const body = {
      projectName,  skill, startDate: startDateProject, endDate: isProjectChecked ? "" : endDateProject,
      description, 
      workingNow: isProjectChecked
    }




    axios.put(`${url}/workProject/${clickedIdAlpha}`, body, {
      headers: {token}
    }).then((res)=>{
      console.log(res);
      setWorkExpProjectModal(false)
    }).catch((err)=>{
      console.log(err.message);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })
    
  }

  //8th Last modal Education form

  const [degree, setDegree] = useState(selectedEdu?.degree)

  const handleEduModalSubmit = (evt)=>{
    evt.preventDefault()

    dispatch(userActions.setLoading(true))

    const target = evt.target

    const name = target.schoolInput.value
    const fieldOfStudy = target.fieldOfStudy.value
    let startDate = target.eduStartDate.value
    let endDate = target.eduEndDate.value


      const body ={
      name, degree, fieldOfStudy,startDate, endDate
    }


    axios.post(`${url}/education`, body, {
      headers: {
        token
      }
    }).then((res)=>{
      console.log(res);
      setEduModal(false)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })


  }

  const handleEduModalUpdate = (evt)=>{
    evt.preventDefault()

    dispatch(userActions.setLoading(true))

    const target = evt.target

    const name = target.schoolInput.value
    const fieldOfStudy = target.fieldOfStudy.value
    let startDate = target.eduStartDate.value
    let endDate = target.eduEndDate.value


      const body ={
      name, degree, fieldOfStudy,startDate, endDate
    }


    axios.put(`${url}/education/${clickedId}`, body, {
      headers: {
        token
      }
    }).then((res)=>{
      console.log(res);
      setEduModal(false)
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })


  }


  const handleAgreementSubmit = (evt)=>{
    evt.preventDefault()

    dispatch(userActions.setLoading(true))

    axios.put(`${url}/user`, {checked: true},  {
      headers: {
        token
      }
    }).then((res)=>{
      console.log(res);
      navigate("/jobs")
    }).catch((err)=>{
      console.log(err);
    }).finally(()=>{
      setTrigger(!trigger)
      dispatch(userActions.setLoading(false))
    })
  }

  if (error) return <p className="error"> <img src={errorIcon} alt="error" /> Something went wrong. Try again...</p>;

return  <div className="dev-profile">
  
<Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={loading}
    
  >
    <CircularProgress color="inherit" />
  </Backdrop>
  <DevHeader/>
  <main className="dev-profile__main">
    <section className="dev-container dev-profile__info-section">
    <p className="dev-profile__dev-name">{`Wellcome, ${userName}`}</p>
  {!userData?.checked && <div className="dev-profile__info-wrapper">
      <p className="dev-profile__title">Your Career Profile</p>
      <p className="dev-profile__text">Your Supercoder profile saves your info so you can to jobs quickly, receive personalized jobs recomendations.</p>
    </div>}
    <div className="dev-profile__info-wrapper-2">
    <p className="dev-profile__title dev-profile-control-left-width">Resume</p>
  {fileName ? <a className="dev-profile__text-2 dev-profile-control-middle-width" href={filePath} target="_blank" download="resume-file">{fileName}</a>  : <p className="dev-profile__text-2">"To start your application, upload your resume in English in DOCX or PDF with a max size of 2 MB"</p>}
   <input onChange={!fileName ? handleResumeUpload : handleResumeEdit} accept=".pdf, .docx" type="file" id="selectedFile" style={{display: "none"}} />
   <div className="dev-profile__resume-btn-wrapper">
   {/* {fileName && <button onClick={handleResumeDelete} className="dev-profile__delete-btn">Delete resume</button>} */}
<input className={!fileName ? "dev-profile__upload" :  "dev-profile__edit-btn"} type="button" value={!fileName ? "Upload resume" : "Edit"} 
onClick={()=>{
  document.getElementById('selectedFile').click()
}} />
   </div>
  
    </div>
    {/* General information - can be component*/}
    <div className="dev-profile__info-wrapper-3 dev-profile__info-wrapper-general">
      <div className="dev-profile__gen-info-top-wrapper">
      {!profilePicture & !userName & !nationalityInfo ? <p className="dev-profile__title">General information<span className="dev-profile__required">*</span></p> : <div className="dev-profile__account-wrapper dev-profile__general-account-wrapper dev-profile-control-left-width">
      <img className="dev-profile_general-picture" style={profilePicture && {borderRadius: "50%"}}  width={50} height={50} src={profilePicture ? profilePicture : pictureIcon} alt="preview image" /> 
     
{/* <div className="dev-profile__account-image">B</div> */}
<div className="dev-profile__account-inner-wrapper">
<p className="dev-profile__account-name">{userName}</p>
<p className="dev-profile__account-nation">{countryList[nationalityInfo]}</p>
</div>
</div>}
<div className="dev-profile__gen-info-middle-wrapper dev-profile-control-middle-width">
 <div className="dev-profile__gen-info-middle-inner-wrapper">
  <img width={14} height={14} src={emailIcon} alt="email-icon" /><p>{userEmail}</p>
  </div>
 <div className="dev-profile__gen-info-middle-inner-wrapper">
  {phoneNumber && <><img width={14} height={14} src={phoneIcon} alt="phone-icon" /><p>{phoneNumber.split(" ")[0] === undefined ? phoneNumber.split(" ")[0] : ""}&nbsp;{phoneNumber.split(" ")[1]}</p></>}
  </div>
</div>
      <button className={phoneNumber && "dev-profile__edit-btn"} onClick={()=>setGenModal(true)} type="button">{!phoneNumber && <img width={18} height={18} src={editPen} alt="edit pen" />}{phoneNumber && "Edit"}</button>
      </div>
    {aboutyourself &&  <div className="dev-profile__gen-info-bottom-wrapper">{aboutyourself}</div>}
    </div>
    {/* Overall experience - can be component */}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title dev-profile-control-left-width">Overall experience<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
    <p className="dev-profile-control-middle-width">{experience && `${experience} year(s)`}  {remoteExperience ? `/${remoteExperience} year(s) remote` : ""}</p>
  <button className={experience && "dev-profile__edit-btn"} onClick={()=>setExpModal(true)} type="button">{!experience && <img width={18} height={18} src={editPen} alt="edit pen" />}{experience && "Edit"}</button>
    </div>
    {/*Avaibility*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title dev-profile-control-left-width">Avaibility<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
    <p className="dev-profile-control-middle-width">{available ? "Available" : "Not Available"}</p>
  <button className={available && "dev-profile__edit-btn"} onClick={()=>setAviaModal(true)} type="button">{!available && <img width={18} height={18} src={editPen} alt="edit pen" />}{available && "Edit"}</button>
    </div>
    {/*Role and salary*/}
    <div className="dev-profile__info-wrapper-3">
    <p className="dev-profile__title dev-profile-control-left-width">Role and Salary<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
    {preferredRole && <div className="dev-profile-control-middle-width">
    <strong>{preferredRole}</strong>
    <p>Current salary: ${monthlySalary}</p>
   {expectedSalary && <p>Expected salary: ${expectedSalary}</p>}
    </div>}
  <button className={preferredRole && "dev-profile__edit-btn"} onClick={()=>setRoleModal(true)} type="button">{!preferredRole && <img width={18} height={18} src={editPen} alt="edit pen" />}{preferredRole && "Edit"}</button>
    </div>
    {/*Skills and Languages */}
    <div className="dev-profile__info-wrapper-3 dev-profile__info-wrapper-3a">
      <div className="dev-profile__education-top-wrapper">
      <p className="dev-profile__title dev-profile-control-left-width">Skills and languages<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
  <button className={skillsListData?.length !== 0 && "dev-profile__edit-btn"} onClick={()=>setSkillsModal(true)} type="button">{skillsListData?.length === 0 && <img width={18} height={18} src={editPen} alt="edit pen" />}{skillsListData?.length !== 0 && "Edit"}</button>
      </div>
      <div className="dev-profile__skills-inner-info">
        <ul className="dev-profile__skills-inner-list">{skillsListData?.map((item)=>(
          <li
          key={item._id} 
          className="dev-profile__skills-inner-item">
        <strong className="dev-profile__skills-inner-level">{item.level}</strong>
        <p>
        <p className="dev-profile__skills-inner-text"><strong>{item.skill}&nbsp;</strong>|&nbsp;{item.experience}&nbsp;year(s)</p>
        </p>
          </li>
        ))
          }
        </ul>
      </div>
      <div className="dev-profile__skills-inner-info dev-profile__skills-inner-info-2">
      {langListData?.length !== 0  && <strong className="dev-profile__skills-inner-level">Language</strong>}
        <ul className="dev-profile__skills-lang-inner-list"> 
        {langListData?.map((item)=>(
          <li 
          key={item._id}
          className="dev-profile__skills-lang-inner-item">
         <strong>{item.language}</strong>&nbsp;|&nbsp; {item.level}
          </li>
        ))  }
        </ul>
      </div>
 
    </div>
    {/*Work experience */}
    <div className="dev-profile__info-wrapper-3 dev-profile__info-wrapper-3a">
      <div className="dev-profile__education-top-wrapper">
      <p className="dev-profile__title dev-profile-control-left-width">Work experience<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
 {workExperience?.length !== 0 ? <button data-type="edu-add"
   onClick={()=>{setWorkExpModal(true)
    setBtnType("add")
   }} className="dev-profile__edit-btn dev-profile__edit-btn-2">&#43;&nbsp;Add Company</button> :  <button onClick={()=>{setWorkExpModal(true)
    setBtnType("add")
   }} type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button>}
      </div>
 
  <ul className="dev-profile__work-exp-works-list">
{workExperience?.map((item, index)=>(
  <li key={item._id} className="dev-profile__work-exp-works-item">
    <div className="custom-flex dev-profile__work-exp-inner-wrapper">
      <strong style={{color: "#3a6fff"}}>{item.companyName}</strong>
      <button type="button" 
  onClick={()=>{
    setClickedId(item._id)
    setBtnType("edit")
    setWorkExpModal(true)
  }}
      className="dev-profile__edit-btn">Edit Company</button>
      </div>
      <div className="custom-flex dev-profile__work-exp-inner-wrapper">
      <strong>{item.jobTitle}</strong>
      <p style={{color: "#989898"}}>{countryList[item.location]} | {item.startDate.split("-")[0]}-{item.startDate.split("-")[1]} - {item.endDate ? `${item.endDate.split("-")[0]}-${item.endDate.split("-")[1]}` : "Current"}</p>
      </div>
      <p style={{marginBottom: 16}}>{item.description}</p>
      <ul className="dev-profile__work-exp-skill-list">
        {item.skill.map((skill, index)=>(
         <li className="dev-profile__work-exp-skill-item" key={index}>{skill}</li> 
        ))}
      </ul>
      <ul>
     {item?.projects?.map((project, index)=>(
      <li 
      key={project._id}
      className="dev-profile__work-exp-project-wrapper">
      <div className="custom-flex"><strong>{project.projectName}</strong><button type="button" 
  onClick={()=>{
    setClickedId(item._id)
    setClickedIdAlpha(project._id)
    setBtnType("edit-project")
    setWorkExpProjectModal(true)
  }}
      className="dev-profile__edit-btn">Edit Project</button></div>
<p style={{color: "#989898", marginBottom: 10}}>{project.startDate.split("-")[0]}-{project.startDate.split("-")[1]} - {project.endDate ? `${project.endDate.split("-")[0]}-${project.endDate.split("-")[1]}` : "Current"}</p>
<p style={{marginBottom: 10}}>{project.description}</p>
<ul className="dev-profile__work-exp-skill-list">
  {project?.skill?.map((skill, index)=>(
    <li key={index} className="dev-profile__work-exp-skill-item">
   {skill}
  </li>
  ))}
</ul>
      </li>
     )) }
      </ul>
      <button
   onClick={()=>{setWorkExpProjectModal(true)
    setClickedId(item._id)
    setBtnType("add-project")
   }} className="dev-profile__edit-btn dev-profile__edit-btn-2 dev-profile__edit-btn-project">&#43;&nbsp;Add Project</button>
  </li>
))  }
    </ul>
    </div>  
       {/*Education */}
       <div className="dev-profile__info-wrapper-3 dev-profile__info-wrapper-3a">
        <div className="dev-profile__education-top-wrapper">
        <p className="dev-profile__title dev-profile-control-left-width">Education<span style={{color: "#5350505f"}} className="dev-profile__required"> - optional</span></p>
   
   {educationsList?.length === 0 ? <button onClick={()=>{setEduModal(true)
    setBtnType("add") 
  }} data-type="edu-add"  type="button"><img width={18} height={18} src={editPen} alt="edit pen" /></button> : <button data-type="edu-add"
   onClick={()=>{setEduModal(true)
    setBtnType("add") 
   }} className="dev-profile__edit-btn dev-profile__edit-btn-2">&#43;&nbsp;Add Education</button>}
        </div>
        <ul className="dev-profile__education-list">
    {educationsList?.map((item, index)=>(
      <li key={index} className="dev-profile__education-middle-wrapper"> 
      <div>
      <strong>{item.name}</strong>
      <p>{item.fieldOfStudy}&nbsp;/&nbsp;{item.degree}</p>
      <p>{item.startDate.split("T")[0]}&nbsp;-&nbsp;{item.endDate.split("T")[0]}</p>
      </div>
    <button onClick={()=>{
      setClickedId(item._id)
      setBtnType("edit") 
      setEduModal(true)}} data-id={item._id} data-type="edu-edit" className="dev-profile__edit-btn">Edit Education</button>
    </li>
    ))}

    </ul>
    </div>{!userData?.checked && 
<form onSubmit={handleAgreementSubmit}>
    <div  className="dev-profile__bottom">
    <div className="dev-profile__input-wrapper">
<Checkbox 
        onChange={() => setAgree(!agree)}
       /> 
    <p> I understand that the information I provide will be used in accordance with Supercoder's applicant and candidate privacy policy. I content the processing of my information as described in the policy including the, unlimited circumstances, Supercoder may share my contact information with
trusted parties, to assist in certain phases of the hiring process (such as conducting
ducting background checks).</p>
    </div>
<BlueButton disabled={!agree || !phoneNumber && true}  style={{padding: "8px 60px", borderRadius: 4, marginBottom: 20}}>Submit</BlueButton>
    </div>
</form>
    }
    
    </section>
  </main>
  {/* Modals */}
  {/*General information modal */}
  {genModal &&
  <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">General information</p>
    <button type="button" onClick={()=>setGenModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
         {/*same title-1*/}
         <form onSubmit={handleGenModalSubmit}>
         <p className="dev-profile__general-modal-title">Profile picture<span className="dev-profile__general-modal-s">&nbsp;&nbsp;Optional</span></p>
      <div className="dev-profile_general-modal-picture-wrapper"><img className="dev-profile_general-picture" style={profilePicture && {borderRadius: "50%"}}  width={50} height={50} src={profilePicture ? profilePicture : pictureIcon} alt="preview image" /> 
      <input 
      // onChange={handleImgUpload} 
      accept="image/jpg, image/jpeg, image/png" type="file" id="selectedFileImg" style={{display: "none"}} />
<input style={{color: "#0050c8", border: "1px solid #0050c8", backgroundColor: "transparent", padding: "3px 10px"}} className="dev-profile__upload" type="button"  value="Upload profile photo" onClick={()=>{
  document.getElementById('selectedFileImg').click()
}} />
{/* <button onClick={()=>{
}
  } className="dev-profile__general-modal-delete-button">Delete profile photo</button> */}
      </div>
      <div className="dev-profile__general-modal-input-wrapper">
      <TextInput defaultValue={userName?.split(" ")[0] || ""} required forId={"firstNameInput"}>First name</TextInput>
      <TextInput defaultValue={userName?.split(" ")[1] || ""} required forId={"lastNameInput"}>Last name</TextInput>
      </div>
      <div className="dev-profile__general-modal-input-wrapper">
        <div className="select-flags-wrapper">
        <span className="select-flags-label">Nationality&nbsp;<span style={{color: "blue"}}>*</span></span>
      <ReactFlagsSelect 
      selected={nationality}
      onSelect={(country)=>{
        setNationality(country)}}
      placeholder=""
      searchable
      className="menu-flags"
      showOptionLabel
      />
        </div>
<div className="select-flags-wrapper">
<span className="select-flags-label">Residance&nbsp;<span style={{color: "blue"}}>*</span></span>
<ReactFlagsSelect  selected={residance}
      onSelect={(country) => setResidance(country)
        }
      placeholder=""
      searchable
      className="menu-flags"
      />
</div>
      
      </div>
      <div className="dev-profile__general-modal-input-wrapper dev-profile__general-modal-input-wrapper-2">
      <PhoneInput
  className="phone-input"
  international
  
  // defaultCountry="KR"
  value={phoneNumber?.split(" ")[0]}
  onChange={setPhoneCode}/>
  <TextInput defaultValue={phoneNumber?.split(" ")[1]} required forId={"phoneInput"} type="tel">Phone number</TextInput>
      </div>
      {/*same title-1*/}
      <div className="dev-profile__general-modal-wrapper-2">
      <p className="dev-profile__general-modal-title">Introduce yourself briefly<span className="dev-profile__general-modal-s">&nbsp;&nbsp;Optional</span></p>
      <button className="dev-profile__general-modal-generator-btn">Auto generate</button>
      </div>
      <TextInput defaultValue={aboutyourself} wrapperStyle={{marginBottom: 30}} textarea={true} maxLength={
        3000 
      } rows={
        3
      } forId={"textAreaGeneral"}>Summarize about yourself</TextInput>
       <p className="dev-profile__general-modal-title">Linkedin username<span className="dev-profile__general-modal-s">&nbsp;&nbsp;Optional</span></p>
       <div className="dev-profile__general-modal-linkedin-wrapper">
        <span className="dev-profile__general-modal-linkedin-icon-wrapper">
        <img width={14}
         height={14} src={linkedin} className="dev-profile__general-modal-in-icon"/>
        </span>
        <input
        defaultValue={linkedIn}
        id="linkedInLink" 
        className="dev-profile__general-modal-linkedin-input" type="text" />
        <button className="dev-profile__general-modal-linkedin-btn">import</button>
       </div>
       <div>
       <p className="dev-profile__general-modal-linkedin-text">We're importing your Linkedin data! you can keep going when we do it!</p>
       <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
       </div>
      
         </form>

      </div>
    </div>
    </div>
  </div>
  }
  {/*Experience modal */}
{ expModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Overall experience</p>
    <button type="button" onClick={()=>setExpModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
        <form onSubmit={handleExpModalSubmit}>
        <div className="dev-profile-exp-modal-input-wrapper">
        <TextInput defaultValue={experience} min={0} max={50} required type={"number"} forId={"yearOfExp"}>Years of experience</TextInput>
        <TextInput defaultValue={remoteExperience} min={0} max={50}  type={"number"} forId={"yearRemoteOfExp"}>Years of remote experience (Optional)</TextInput>
        {/*Error, requier must be removed */}
        </div>
        <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading}  style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
       </form>
      </div>
  
    </div>
    </div>
  </div>}
  {aviaModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Aviability</p>
    <button type="button" onClick={()=>setAviaModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
        <form onSubmit={handleAviaModalSubmit}>
           <div className="dev-profile__avia-modal-main-wrapper">
     <label className="dev-profile__avia-modal-label" htmlFor="aviaInput">
        <input onChange={handleAviaInputChange}   value={true}  defaultChecked={available===true} className="dev-profile__avia-modal-input" id="aviaInput" name="aviaInput" type="radio" />
    <div className="dev-profile__avia-modal-text-wrapper">
    <span className="dev-profile__avia-modal-text">Available for Jobs</span>
    <span className="dev-profile__avia-modal-text-2">I am looking for a remote job.</span>
    </div>
   </label>
   <label className="dev-profile__avia-modal-label" htmlFor="aviaInput2">
        <input defaultChecked={available===false} onChange={handleAviaInputChange} value={false} className="dev-profile__avia-modal-input" id="aviaInput2" name="aviaInput" type="radio" />
    <div className="dev-profile__avia-modal-text-wrapper">
   <span className="dev-profile__avia-modal-text">Unavailable for Jobs</span>
    <span className="dev-profile__avia-modal-text-2">I am not looking for a remote job.</span>
    </div>
   </label>
     </div>
     <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
        </form>
      </div>
    </div>
    </div>
  </div>}
  {roleModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Role and salary</p>
    <button type="button" onClick={()=>setRoleModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body dev-profile-role-modal-body">
        <form onSubmit={handleRoleModalSubmit}>
        <DropDownMenu defaultValue={preferredRole} forId={"roleModalDropdown"} menuRef={roleRef} options={jobs}  labelText={"Preffered role"}></DropDownMenu>
       <div className="dev-profile-role-modal-inputs-wrapper">
    <div className="dev-profile-role-modal-input-wrapper">
   <input defaultValue={monthlySalary} type="number" id="salaryInputCurrent"    className="dev-profile-role-modal-salary-input" required="required"/>
      <label htmlFor="salaryInputCurrent" className="dev-profile-role-modal-salary-label">Current monthly salary&nbsp;
        <span style={{color: "blue"}}>*</span>
      </label>
    </div>
    <div  className="dev-profile-role-modal-input-wrapper">
   <input type="number" defaultValue={expectedSalary}  id="salaryInputExp"  className="dev-profile-role-modal-salary-input" required="required"/>
      <label htmlFor="salaryInputExp" className="dev-profile-role-modal-salary-label" >Expected salary&nbsp;
        <span style={{color: "blue"}}>*</span>
      </label>
    </div>
    </div>
     <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
        </form>

      </div>
    </div>
    </div>
  </div>}
  {skillsModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">Skills and Languages</p>
    <button type="button" onClick={()=>setSkillsModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
        <form onSubmit={handleSkillsModalSubmit}>
   {inputs?.map((input, index)=>(
  <div key={input._id} className="dev-profile__modal-inputs-wrapper dev-profile__skills-modal-wrapper-1">
  <div className="dev-profile__skills-modal-skills-wrapper">
  <p className="dev-profile__skills-modal-label">Skill&nbsp;
  <span style={{color: "blue"}}>*</span></p>
  {/*React library*/}
  <Select 
   required={index !== inputs.length - 1}
  menuPortalTarget={document.body} 
  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 })}}
  classNamePrefix="mySelect" 
  options={skillsList}
  placeholder="Skill name"
  className="select" 
  menuPlacement="auto"
  // onChange={handleSkillSelect}
  value={input.skill}
  // defaultInputValue={input.skill}
  onChange={(selectedOption) => handleInputChange(index, "skill", selectedOption )}
  //  onChange={opt => console.log(opt.label, opt.value)}
  />
  
  </div>
  <div className="dev-profile__skills-modal-skills-wrapper">
  <p className="dev-profile__skills-modal-label">Years of experience&nbsp;
  <span style={{color: "blue"}}>*</span></p>
  {/*React library*/}
  <Select 
   required={index !== inputs.length - 1}
    menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999}) }}
  classNamePrefix="mySelect" 
  options={yearsList}
  placeholder="Years of experience"
  className="select" 
  menuPlacement="auto"
  onChange={(selectedOption) => handleInputChange(index, "experience", selectedOption )}
    // defaultInputValue={input.experience}
    value={input.experience}
  // onChange={handleSkillYearSelect}
  //  onChange={opt => console.log(opt.label, opt.value)}
  />
  </div>

  <div className="dev-profile__skills-modal-skills-wrapper">
  <p className="dev-profile__skills-modal-label">Years of experience&nbsp;
  <span style={{color: "blue"}}>*</span></p>
  {/*React library*/}
  <Select 
  required={index !== inputs.length - 1}
    menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
  classNamePrefix="mySelect" 
  options={competencyOptions}
  placeholder="Enter competency"
  className="select" 
  menuPlacement="auto"
  value={input.level}
  // defaultInputValue={input.level}
  onChange={(selectedOption) => handleInputChange(index, "level",selectedOption, )}
  // onChange={handleSkillCompetencySelect}
  //  onChange={opt => console.log(opt.label, opt.value)}
  />
  
  </div>
  {index !== inputs.length - 1 && inputs.length !== 1 ? 
      <button 
      type="button" 
      onClick={(evt)=>handleSkillDelete(index, evt)}
      // data-id={index}
      
      className="dev-profile-skills-modal-delete">&#10005;</button> 
    : <button 
    style={{pointerEvents: "none", opacity: 0}}
    className="dev-profile-skills-modal-delete">&#10005;</button> }
  </div>
  ))
  }
     {langInputs?.map((input, index)=>(
      <div
      key={input._id} 
      className="dev-profile__modal-inputs-wrapper">
     <div className="dev-profile__skills-modal-lang-wrapper">
<p className="dev-profile__skills-modal-label">Language (Optional)</p>
<Select 
 value={input.language}
 onChange={(selectedOption) => handleLangInputChange(index, "language", selectedOption )}
  menuPortalTarget={document.body} 
  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
classNamePrefix="mySelect" 
 menuPlacement="auto"  className="select"  placeholder="Enter language" options={langList}  isSearchable={true}  />
     </div>
<Select 
  value={input.level}
  onChange={(selectedOption) => handleLangInputChange(index, "level", selectedOption )}
  menuPortalTarget={document.body} 
  styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
classNamePrefix="mySelect"  menuPlacement="auto" placeholder="Proficiency"  className="select"  options={langLevelOptions}/>
   {index !== langInputs.length - 1 && langInputs.length !== 1  ? 
          <button 
          type="button" 
          onClick={(evt)=>handleLangDelete(index, evt)}
          // data-id={index}
          className="dev-profile-skills-modal-delete dev-profile-skills-modal-delete-2">&#10005;</button>
         : <button 
        style={{pointerEvents: "none", opacity: 0}}
        className="dev-profile-skills-modal-delete">&#10005;</button>}
        </div>
       
     ))   }
      <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
        </form>
      
      </div>
    </div>
    </div>
  </div>
  }
   {workExpModal && <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">{btnType==="add" ? "Add" : "Edit"} Work Experience</p>
    <button type="button" onClick={()=>setWorkExpModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
        <form onSubmit={btnType === "add"  ?handleWorkExpModalSubmit : handleWorkExpModalUpdate}>
       <div className="dev-profile__modal-inputs-wrapper">
       <TextInput
       required
       defaultValue={btnType==="edit" ? selectedWork.companyName : ""} 
       forId={"companyName"}>Company name</TextInput>
      <TextInput
      required 
      defaultValue={btnType==="edit" ? selectedWork.jobTitle : ""} forId={"jobTitle"}>Job title</TextInput>
       </div>
       <div className="dev-profile__modal-inputs-wrapper">
        <div className="dev-profile__modal-date-wrapper">
       <p className="dev-profile__skills-modal-label">Start date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
       <DatePicker
       wrapperClassName="dev-profile__modal-date-picker-wrapper"
       className="dev-profile__work-exp-modal-date-picker-input"
       popperClassName="datepicker-calendar"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  selected={startDateWorkExp} 
  onChange={(date) =>{ setStartDateWorkExp(date)
    console.log(date);
  }
  } 
  
/>
        </div>
        <div className="dev-profile__modal-date-wrapper">
        <p className="dev-profile__skills-modal-label">End date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
<DatePicker
popperClassName="datepicker-calendar"
disabled={isWorkChecked}
wrapperClassName="dev-profile__modal-date-picker-wrapper"
className="dev-profile__work-exp-modal-date-picker-input"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  selected={endDateWorkExp} onChange={(date) => setEndDateWorkExp(date) }
/>
        </div>

       </div>
       <div className="dev-profile__work-exp-modal-checkbox-wrapper">
       <Checkbox 
       checked={isWorkChecked}
        onChange={(event) => setIsWorkChecked(!isWorkChecked)}
       /> <p className="dev-profile__work-exp-modal-checkbox-text">I am currently working in this role</p>
       </div>
       <div className="select-flags-wrapper dev-profile__work-exp-modal-flags-wrapper">
<p className="select-flags-label">Location (Optional)</p>
<ReactFlagsSelect  
selected={location}
onSelect={(code) => setLocation(code)}    
      placeholder=""
      searchable
      className="menu-flags"
      menuPlacement="auto"
      />
</div>
<div className="dev-profile__auto-gen-btn-wrapper">
<button className="dev-profile__general-modal-generator-btn">Auto generate</button>
</div>
<div>

</div>
<div className="dev-profile__work-exp-modal-textarea-wrapper">
<TextInput
defaultValue={btnType === "edit" ? selectedWork?.description : ""} wrapperStyle={{marginBottom: 30}} textarea={true} maxLength={
        3000 
      } rows={
        3
      } forId={"textAreaWorkExp"}>Description</TextInput>
</div>
<Select
value={workSkill}
onChange={(list) => setWorkSkillList(list)}
isMulti
 styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
 classNamePrefix="mySelect"  
menuPlacement="auto" 
options={skillsList} 
className="select dev-profile__work-exp-modal-react-select" placeholder="Skill (optional)"/>
      <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
        </form>
      </div>
    </div>
    </div>
  </div>
  }
  {
    workExpProjectModal && 
    <div className="dev-profile__modal">
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">{btnType==="add-project" ? "Add" : "Edit"}&nbsp;Project</p>
    <button type="button" onClick={()=>setWorkExpProjectModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
        <form onSubmit={btnType==="add-project" ? handleProjectModalSubmit : handleProjectModalUpdate}>
       <div className="dev-profile__modal-inputs-wrapper">
       <TextInput
       defaultValue={btnType==="edit-project" ? selectedProject.projectName : ""} 
       forId={"projectName"}>Project name</TextInput>
       </div>
       <div className="dev-profile__modal-inputs-wrapper">
        <div className="dev-profile__modal-date-wrapper">
       <p className="dev-profile__skills-modal-label">Start date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
       <DatePicker
       popperClassName="datepicker-calendar"
       wrapperClassName="dev-profile__modal-date-picker-wrapper"
       className="dev-profile__work-exp-modal-date-picker-input"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  selected={startDateProject} 
  onChange={(date) =>{ setStartDateProject(date)
  }
  } 
/>
        </div>
        <div className="dev-profile__modal-date-wrapper">
        <p className="dev-profile__skills-modal-label">End date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
<DatePicker
popperClassName="datepicker-calendar"
disabled={isProjectChecked}
wrapperClassName="dev-profile__modal-date-picker-wrapper"
className="dev-profile__work-exp-modal-date-picker-input"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  selected={endDateProject} 
  onChange={(date) => setEndDateProject(date) }
/>
        </div>

       </div>
       <div className="dev-profile__work-exp-modal-checkbox-wrapper">
       <Checkbox 
       checked={isProjectChecked}
        onChange={(event) => setIsProjectChecked(!isProjectChecked)}
       /> <p className="dev-profile__work-exp-modal-checkbox-text">I am currently working in this project</p>
       </div>
       <div className="select-flags-wrapper dev-profile__work-exp-modal-flags-wrapper">
</div>
<div>

</div>
<div className="dev-profile__work-exp-modal-textarea-wrapper">
<TextInput
defaultValue={btnType==="edit-project" ? selectedProject?.description : ""}

wrapperStyle={{marginBottom: 30}} textarea={true} maxLength={
        3000 
      } rows={
        3
      } forId={"textAreaProject"}>Description</TextInput>
</div>
<Select
value={projectSkill}
onChange={(list) => setProjectSkillList(list)}
isMulti
 styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
 classNamePrefix="mySelect"  
menuPlacement="auto" options={skillsList} className="select dev-profile__work-exp-modal-react-select" placeholder="Skill (optional)"/>
      <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>
        </form>
      </div>
    </div>
    </div>
  </div>
  }
     {eduModal && <div className="dev-profile__modal">``
    <div className="dev-profile__modal-wrapper">
    <div className="dev-profile__modal-content">
      <div className="dev-profile__modal-header">
    <p className="dev-profile__modal-title">{btnType==="add" ? "Add Education" : "Edit Education"}</p>
    <button type="button" onClick={()=>setEduModal(false)} className="dev-profile__modal-close"><img src={closeIcon} alt="close" /></button>
      </div>
      <div className="dev-profile__modal-body">
        <form onSubmit={btnType==="add" ? handleEduModalSubmit : handleEduModalUpdate}>
      <TextInput defaultValue={btnType==="edit" ?  selectedEdu.name : ""} forId={"schoolInput"}>School</TextInput>
      <div className="dev-profile__modal-inputs-wrapper dev-profile__edu-modal-select-wrapper">
        <div className="dev-profile__skills-modal-lang-wrapper">
        <p className="dev-profile__skills-modal-label">Degree&nbsp;
        <span style={{color: "blue"}}>*</span></p>
      <Select   menuPortalTarget={document.body} 
          styles={{ menuPortal: base => ({ ...base, zIndex: 9999}) }}
        classNamePrefix="mySelect-dev-profile-edu" 
        defaultInputValue={btnType==="edit" ?  selectedEdu.degree : ""}
        options={degreeList}
        placeholder="Degree"
        className="select" 
        menuPlacement="auto"
         onChange={opt => setDegree(opt.value)}/>
        </div>
     
         <div className="dev-profile__skills-modal-lang-wrapper">
        <TextInput defaultValue={btnType==="edit" ?  selectedEdu.fieldOfStudy : ""} forId={"fieldOfStudy"}>Field of study</TextInput>
         </div>
      </div>
      <div className="dev-profile__modal-inputs-wrapper">
        <div className="dev-profile__modal-date-wrapper">
       <p className="dev-profile__skills-modal-label">Start date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
       <DatePicker
popperClassName="datepicker-calendar"
       wrapperClassName="dev-profile__modal-date-picker-wrapper"
       className="dev-profile__work-exp-modal-date-picker-input"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  id="eduStartDate"

  selected={startDateEdu} onChange={(date) => setStartDateEdu(date)} 
  
/>
        </div>
        <div className="dev-profile__modal-date-wrapper">
        <p className="dev-profile__skills-modal-label">End date&nbsp;
        <span style={{color: "blue"}}>*</span></p>
<DatePicker
popperClassName="datepicker-calendar"
wrapperClassName="dev-profile__modal-date-picker-wrapper"
className="dev-profile__work-exp-modal-date-picker-input"
  dateFormat="MM/yyyy"
  showMonthYearPicker
  selected={endDateEdu}
  // showMonthYearDropdown
  id="eduEndDate"
   onChange={(date) => setEndDateEdu(date)} 
/>
        </div>

       </div>
       <div className="dev-profile__modal-save-btn-wrapper">
       <BlueButton loading={loading} style={{padding:"12px 16px", minWidth: 200, borderRadius: 4}}>Save</BlueButton>
       </div>

        </form>
      </div>
    </div>
    </div>
  </div>
  }
</div>
}



