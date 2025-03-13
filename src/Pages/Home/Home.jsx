import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Swiper from 'swiper/bundle'
import 'swiper/css/bundle'
import { register } from 'swiper/element/bundle'
import dotsImage from "../../Assets/Images/dots.png"
import img1 from "../../Assets/Images/img1.jpg"
import img2 from "../../Assets/Images/img2.jpg"
import img3 from "../../Assets/Images/img3.jpg"
import img4 from "../../Assets/Images/img4.jpg"
import rectangle from "../../Assets/Images/Rectangle1.png"
import womanImage from "../../Assets/Images/NGO 1 (2).jpg"
import { BlueButton, FeedbackItem } from "../../Components"
import { homeActions } from "../../Redux/HomeSlice"
import { Footer } from "../../Widgets"
import Header from "../../Widgets/Header/Header"
import "./Home.scss"



export const Home =  ()=>{

  const {jobs, homeLoading, homeError} = useSelector((state)=>state.home)
  register()



 const dispatch = useDispatch()

  const url = "https://jobas.onrender.com/api";



  useEffect(() => {
    axios
      .get(`${url}/category`)
      .then((data) => {
        dispatch(homeActions.setJobs(data.data));
      })
      .catch(() => {
        dispatch(homeActions.setHomeError(true));
      });
  }, []);


useEffect(()=>{
  new Swiper('.swiper', {
    direction: 'horizontal',
    spaceBetween: 103,
    slidesPerView: 3.4,
    loop: false,
    
  });
})

if (homeError) return <p className="error">Something went wrong. Try again...</p>

return (
  <div className="home">
    <div className="home__header-wrapper">
      <Header inputStyle={{ backgroundColor: "#FFFFFF" }} className />
    </div>
    <main>
      <section className="home__hero">
        <div className="top-container">
          <div className="home__hero-wrapper">
            <div className="home__hero-left">
              <h1 className="home__hero-title">
                Help the ones
                who are needy
              </h1>
              <p className="home__hero-text">
                The website helps you land your dream social Work, the ones done on
                site or remote.
              </p>
              <BlueButton to={"/jobs"}>Find me a SocialWork</BlueButton>
            </div>
            <div className="home__hero-right">
              <img width={429} height={489} src={dotsImage} alt="dots" />
              <img
                className="home__hero-img1"
                width={429}
                height={489}
                src={womanImage}
                alt="dots"
              />
            </div>
          </div>
          <div className="hero-stats">
            <ul className="hero-stats__list">
              <li className="hero-stats__item">
                <div className="hero-stats__item-text-wrapper">
                  <p className="hero-stats__text">120+</p>
                  <p className="hero-stats__sub-text">Career opportunities</p>
                </div>
                <div className="hero-stats__div"></div>
              </li>
              <li className="hero-stats__item">
                <div className="hero-stats__item-text-wrapper">
                  <p className="hero-stats__text">700+</p>
                  <p className="hero-stats__sub-text">SocialWork seekers</p>
                </div>
                <div className="hero-stats__div"></div>
              </li>
              <li className="hero-stats__item">
                <div className="hero-stats__item-text-wrapper">
                  <p className="hero-stats__text">100+</p>
                  <p className="hero-stats__sub-text">Remote SocialWork</p>
                </div>
                <div className="hero-stats__div"></div>
              </li>
              <li className="hero-stats__item">
                <div className="hero-stats__item-text-wrapper">
                  <p className="hero-stats__text">20+</p>
                  <p className="hero-stats__sub-text">NGO Requirements</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="home__careers">
        <div className="top-container">
          <div className="home-careers__wrapper">
            <div className="home-careers__pictures">
              <ul className="home-careers__list">
                <li className="home-careers__item">
                  <img src={img1} width={212} height={195} alt="laptop" />
                </li>
                <li className="home-careers__item">
                  <img src={img2} width={212} height={195} alt="laptop" />
                </li>
                <li className="home-careers__item">
                  <img src={img3} width={212} height={195} alt="laptop" />
                </li>
                <li className="home-careers__item">
                  <img src={img4} width={212} height={19} alt="laptop" />
                </li>
              </ul>
              <img
                width={627}
                height={634}
                className="home-careers__rectangle"
                src={rectangle}
                alt="rectangle"
              />
            </div>
            <div className="home-careers__text-wrapper">
              <h2 className="sub-title-text">All social gigs, one portal</h2>
              <p className="home-careers__text">
                Whatever you are, a social worker, an NGO owner
                we got you. We have all types of social works
                ready for you.
              </p>
              <BlueButton to={"/jobs"}>Show me all available SocialWork</BlueButton>
            </div>
          </div>
        </div>
      </section>
     
      <section className="home__why-section">
        <div className="middle-container why-section__wrapper">
          <h3
            style={{ color: "#FFF" }}
            className="sub-title-text why-section__title"
          >
            Why choose us
          </h3>
          <p className="text why-section__text">Why not choose us</p>
          <ul className="why-section__list">
            <li className="why-section__item">
              <div className="why-section__cubes">
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube why-section__cube-blue"></span>
                <span className="why-section__cube"></span>
              </div>
              <p className="why-section__item-title">NGO works</p>
              <p className="text why-section__item-text">
                NGO provides certificate
              </p>
            </li>
            <li className="why-section__item">
              <div className="why-section__cubes">
                <span className="why-section__cube why-section__cube-blue"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>

                <span className="why-section__cube"></span>
              </div>
              <p className="why-section__item-title">We’re here to help</p>
              <p className="text why-section__item-text">
                Would you say no to somebody who needs help?
                That’s impossible.
              </p>
            </li>
            <li className="why-section__item">
              <div className="why-section__cubes">
                <span className="why-section__cube"></span>
                <span className="why-section__cube why-section__cube-blue"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>
              </div>
              <p className="why-section__item-title">We’re a large community</p>
              <p className="text why-section__item-text">
                Do you know the first thing you need in your career? The people
                you do the same thing. Find them here
              </p>
            </li>
            <li className="why-section__item">
              <div className="why-section__cubes">
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube"></span>
                <span className="why-section__cube why-section__cube-blue"></span>
              </div>
              <p className="why-section__item-title">We’re a large community</p>
              <p className="text why-section__item-text">
                Do you know the first thing you need in your career? The people
                you do the same thing. Find them here
              </p>
            </li>
          </ul>
          <p style={{ textAlign: "center", marginBottom: 60 }} className="text">
            Convinced ?
          </p>
          <div style={{ textAlign: "center" }}>
            <BlueButton to={"/jobs"}>Get started</BlueButton>
          </div>
        </div>
      </section>
      <section className="home__feedbacks">
        <div className="feedback-container">
          <h5 style={{ color: "#2F2F2F" }} className="sub-title-text">
            What others say about us
          </h5>
          <p className="text home-feedbacks__text">
            Not yet convinced to get started? Here are what other social Workers
            say about us.
          </p>
          <div className="swiper">
            <div className="swiper-wrapper swiper-wrapper-custom">
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
              <div className="swiper-slide slide-feedback">
                <FeedbackItem />
              </div>
            </div>
            <div className="swiper-shadow"></div>
          </div>
        </div>
      </section>
    </main>
    <div className="middle-container">
      <Footer></Footer>
    </div>
  </div>
);
}