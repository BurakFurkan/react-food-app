// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import MenuItem from "../components/MenuItem";
import ClipLoader from "react-spinners/ClipLoader";
import { useState, useEffect } from "react";
import styled from "styled-components";
import "swiper/css";
import { useSelector, useDispatch } from "react-redux";
import { getUserMeals } from "../features/userSlice";
import Rodal from "rodal";

export default function Carousel() {
  const dispatch = useDispatch();
  const { userMenu, meals } = useSelector((reduxStore) => reduxStore.user);
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  if (userMenu.length === 0) {
    return <div>Empty Chart</div>;
  } else
    return (
      <CarouselWrapper>
        <button onClick={() => show()}>a</button>
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          style={{ width: "85%", padding: "2rem" }}
        >
          {meals.map((meal) => {
            return (
              <SwiperSlide key={meal.id}>
                <MenuItem  {...meal} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Rodal visible={isVisible} onClose={hide}>
          <div>Content</div>
        </Rodal>
      </CarouselWrapper>
    );
}

const CarouselWrapper = styled.div`
  width:100%;
  height: 100%;

`
