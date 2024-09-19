import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import landing_background from "../../assets/landing_background.png";
import downScroll from "../../assets/downScroll.png";

const Landing = () => {
  const [weatherIconURL, setWeatherIconURL] = useState("");
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
      <section>
        <LandingTop>
          <p>
            <span>오늘 [</span>
            <img src={weatherIconURL} />
            <span>] 한데...</span>
          </p>
          <p>
            <span>[RIDERS] 어때? 🚴</span>
          </p>
          <RedirectButton>바로가기</RedirectButton>
          <DownScrollButton>
            <img src={downScroll} />
          </DownScrollButton>
        </LandingTop>
      </section>

      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
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
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0px;
`;

const LandingTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 50px;
  font-weight: bold;
  color: white;
  gap: 30px;
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
  &:hover {
    box-shadow: rgba(255, 255, 255, 0.16) 0px 10px 36px 0px, rgba(255, 255, 255, 0.06) 0px 0px 0px 1px;
  }
`;

const DownScrollButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
