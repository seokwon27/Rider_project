import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import landing_background from "../../assets/landing_background.png";
import downScroll from "../../assets/downScroll.png";
import landing_firstIcon from "../../assets/landing_firstIcon.png";
import landing_firstImg from "../../assets/landing_firstImg.png";
import landing_secondIcon from "../../assets/landing_secondIcon.png";
import landing_secondImg from "../../assets/landing_secondImg.png";

const Landing = () => {
  const targetRef = useRef();
  const navigate = useNavigate();
  const [weatherIconURL, setWeatherIconURL] = useState("");

  const scrollToTargetRef = () => {
    targetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const getWeather = async (lat, lon) => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_KEY
        }&units=metric&lang=kr`
      );
      const icon = response.data.weather[0].icon;
      setWeatherIconURL(`http://openweathermap.org/img/wn/${icon}@2x.png`);
    };
    const success = (position) => {
      const lat = position.coords.latitude || 37.5642135;
      const lon = position.coords.longitude || 127.0016985;
      try {
        getWeather(lat, lon);
      } catch (error) {
        console.log("error :>> ", error);
        alert("날씨정보를 가져올 수 없습니다.");
      }
    };
    const fail = () => {
      try {
        getWeather(37.5642135, 127.0016985);
      } catch (error) {
        console.log("error :>> ", error);
        alert("날씨정보를 가져올 수 없습니다.");
      }
    };
    navigator.geolocation.getCurrentPosition(success, fail);
  }, []);

  return (
    <LandingWrapper $image={landing_background}>
      <TopSection>
        <LandingTop>
          <p>
            <span>오늘 [</span>
            <img src={weatherIconURL} />
            <span>] 한데...</span>
          </p>
          <p>
            <span>[RIDERS] 어때? 🚴</span>
          </p>
          <RedirectButton onClick={() => navigate("/home")}>바로가기</RedirectButton>
          <DownScrollButton onClick={scrollToTargetRef}>
            <img src={downScroll} />
          </DownScrollButton>
        </LandingTop>
      </TopSection>
      <section ref={targetRef}>
        <LandingItemWrapper>
          <img src={landing_firstIcon} />
          <h3>지도로 자전거 길을 볼 수 있습니다.</h3>
          <p>원하는 자전거길을 볼 수 있습니다.에 대한 설명</p>
          <LandingPageImg src={landing_firstImg} />
        </LandingItemWrapper>
      </section>
      <section>
        <LandingItemWrapper>
          <img src={landing_secondIcon} />
          <h3>내가 간 곳을 모아볼 수 있습니다.</h3>
          <p>내 게시물을 모아볼 수 있습니다.에 대한 설명</p>
          <LandingPageImg src={landing_secondImg} />
        </LandingItemWrapper>
      </section>
    </LandingWrapper>
  );
};

export default Landing;

const LandingWrapper = styled.div`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 5%,
      rgba(0, 0, 0, 0.4) 12%,
      rgba(0, 0, 0, 0.6) 15%,
      rgba(0, 0, 0, 0.8) 20%,
      rgba(0, 0, 0, 0.95) 25%,
      rgba(0, 0, 0, 1) 100%
    ),
    url(${(props) => props.$image});
  background-repeat: repeat;
  background-size: contain;
  background-position: top;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
  gap: 100px;
`;

const TopSection = styled.section`
  margin-bottom: 400px;
`;

const LandingTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
  color: white;
  gap: 50px;
  p {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const RedirectButton = styled.button`
  cursor: pointer;
  background-color: black;
  color: white;
  border: none;
  font-size: 25px;
  font-weight: bold;
  border-radius: 20px;
  width: 150px;
  padding: 10px;
  transition: transform 0.2s, box-shadow 0.2s;
  &:hover {
    transform: translateY(-5px);
    box-shadow: rgba(255, 255, 255, 0.16) 0px 10px 36px 0px, rgba(255, 255, 255, 0.06) 0px 0px 0px 1px;
  }
`;

const DownScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const LandingItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  gap: 10px;
  h3 {
    font-size: 25px;
    font-weight: bold;
  }
  p {
    font-size: 16px;
    color: #d6d6d6;
  }
`;

const LandingPageImg = styled.img`
  object-fit: fill;
  width: 980px;
  height: 500px;
`;
