import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
//import "defaultImage" from "./radio.jpg"

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Cdata from "./country.json";

import Grid from "@material-ui/core/Grid";
export default function Radio() {
  const [stations, setStations] = useState([]);

  const [isData, setIsData] = useState(false);
  const [stationFilter, setStationFilter] = useState("all");
  const [Rdata, setRdata] = useState({
    adata: "",
  });

  const [age, setAge] = React.useState("");

  useEffect(() => {
    setupApi(stationFilter).then((data) => {
      setStations(data);

      if (stations.length != 0) {
        setIsData(true);
      } else {
        setIsData(false);
      }
    });
  }, [stationFilter, stations]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

    const stations = await api
      .searchStations({
        countryCode: age,
        tag: stationFilter,
        limit: 100,
      })
      .then((data) => {
        return data;
      });

    return stations;
  };

  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];
  // const handleChange = (type, event) => {
  //   let temp = { ...Rdata };
  //   temp[type] = event.target.value;

  //   if (temp.adata === "undefined") {
  //    console.log("data nhi ah raha")
  //     } else {
  //       setRdata(temp);
  //     }
  // };
  // const setDefaultSrc = event => {
  //   event.target.src = defaultImage
  // }
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // console.log(Rdata,"uuuuuuuuuuuuuuu")
  let gData = [];
  Cdata.forEach((obj) => {
    let temp = Object.values(obj);
    gData[temp[0]] = temp[1];
  });
  let xCoordinates = Object.keys(gData);
  xCoordinates.sort((a, b) => a - b);

  const [CountryData, setCountryData] = React.useState(gData);

  return (
    <Grid container direction="row" justify="center" alignItems="flex-start">
      {/* <div className="filters">
        {filters.map((filter, index) => (
          <span
            key={index}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div> */}
      <Grid item xs={12}>
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Country
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={age}
            onChange={handleChange}
            label="Country"
            style={{ width: "300px" }}
          >
            {/* <Menu> <MenuItem >
        {data}
      </MenuItem></Menu> */}

            {Object.keys(CountryData).map((val) => (
              <MenuItem value={val} data={CountryData[val]}>
                {CountryData[val]}
              </MenuItem>
            ))}

            {/* {CountryData.map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))} */}
            {/* {data.map(option => (  
                      <MenuItem key={data.keys} >  
                        {option}  
                      </MenuItem>  
                    ))}   */}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={10} sm={10}>
        {isData ? (
          stations &&
          stations.map((station, index) => {
            return (
              <div className="station" key={index}>
                <div className="stationName">
                  {/* <img
                    className="logo"
                    src={station.favicon}
                    alt="station logo"
                    //onError={setDefaultSrc}
                  /> */}
                  <div className="name">{station.name}</div>
                </div>

                <AudioPlayer
                  className="player"
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout="stacked"
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                  style={{
                    backgroundColor: "rgb(0,0,0,0.7)",
                  }}
                />
              </div>
            );
          })
        ) : (
          <h5>There are no free radio station in this country </h5>
        )}

        {}
      </Grid>
    </Grid>
  );
}
