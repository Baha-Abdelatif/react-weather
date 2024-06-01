import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MeteoCard from "./components/MeteoCard";
import loader from "./assets/loader.svg";
import Browser from "./assets/browser.svg";
const fetchUrl =
  "https://api.airvisual.com/v2/nearest_city?key=" +
  import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherDatas, setWeatherDatas] = useState(null);
  const [errorInfos, setErrorInfos] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: fetchUrl,
    })
      .then((response) => {
        if (400 <= response.status && response.status < 600) {
          throw new Error(`Error ${response.status}: ${response.statusText}.`);
        }
        const datas = {
          city: response.data.data.city,
          country: response.data.data.country,
          temp: response.data.data.current.weather.tp,
          icon: response.data.data.current.weather.ic,
        };
        setWeatherDatas(() => ({ ...datas }));
      })
      .catch((err) => {
        console.log(err);
        setErrorInfos({ msg: err.message, code: err.code });
      });
  }, []);
  return weatherDatas === null ? (
    <main
      style={{
        background: `url(https://loremflickr.com/g/1080/720/weather,point-of-view) no-repeat center/cover`,
        backgroundColor: "rgba(0,0,0,0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      {errorInfos ? (
        <div className='error-screen'>
          <h1 className='error-informations'>{errorInfos.msg}</h1>
          <h2 className='error-informations'>{errorInfos.code}</h2>
          <img src={Browser} alt='an error occured' />
          <p>
            Try refresh the page or contact the{" "}
            <a href='mailto:webmaster@abdevweb.com'>webmaster</a>
          </p>
        </div>
      ) : (
        <div className='loading-screen'>
          <div className='loader-container'>
            <img src={loader} alt='loading in progress' />
          </div>
          <h1>Loading...</h1>
        </div>
      )}
    </main>
  ) : (
    <main
      style={{
        background: `url(https://loremflickr.com/g/1080/720/${weatherDatas.country},point-of-view) no-repeat center/cover`,
      }}
    >
      <MeteoCard weatherDatas={weatherDatas} />
    </main>
  );
}

export default App;
