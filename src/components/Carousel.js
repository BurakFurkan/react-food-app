// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import MenuItem from "../components/MenuItem";
import ClipLoader from "react-spinners/ClipLoader";
import {useState,useEffect} from "react"
import "swiper/css";
import { useSelector, useDispatch } from "react-redux";
import { getUserMeals, resetMeals } from "../features/userSlice";


export default function Carousel() {
  const dispatch = useDispatch();
  const { userMenu, meals } = useSelector((reduxStore) => reduxStore.user);
  
  useEffect(() => {
    userMenu.forEach((item) => dispatch(getUserMeals(item)))

  }, []);

  if (userMenu.length === 0) {
    return <div>Empty Chart</div>;
  } else
    return (
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        style={{ width: "85%", padding: "2rem" }}
      > 
        {meals.map((meal) => {
          return <SwiperSlide key={meal.id}><MenuItem {...meal} /></SwiperSlide>
        })}
      </Swiper>
    );
}
