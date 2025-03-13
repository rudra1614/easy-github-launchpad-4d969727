import "./FeedbackItem.scss"
import profileIcon from "../../Assets/Icons/profile.svg"


export const  FeedbackItem = ()=>{
  return <div className="feedback-item">
<img style={{marginBottom: 18}} src={profileIcon} alt="profile image" />
<p className="feedback-item__title">Ishu</p>
<p className="feedback-item__job">NGO</p>
<p style={{color: "#999"}} className="text feedback-item__text">It was great to seek for a SocialWork.
Everything was really great. They were the ones who helped me to get my current work as a social worker at my company I don’t want to mention.</p>
  </div>
}