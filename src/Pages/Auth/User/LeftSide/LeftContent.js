import mainImg from "../../../../Assets/Images/authenticate-img.svg";
import { useNavigate } from "react-router-dom";

export const LeftContent = () => {
  const navigate = useNavigate();
  return (
    <div className="w-1/4  md:flex bg-[#19378b] p-[50px] relative h-screen hidden flex-col justify-between">
      <div className="w-full  text-white">
        <h2 className="mb-[25px] leading-tight text-[22px] font-bold ">
        Upgrade your life with a social worker NGO platform
        </h2>
        <p className="tracking-tight leading-tight">
        Access to a wide range of social works, allowing for a better
                lifestyle of other people, as well as reduced poverty levels in
                the world. Join today and start experiencing the benefits of social
                work.
        </p>
        <img
          src={mainImg}
          alt="creative_image"
          className="w-[420px] absolute bottom-[75px] h-[305px]"
        />
      </div>
    </div>
  );
};
