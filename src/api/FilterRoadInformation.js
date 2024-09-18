import axios from "axios";

const roadInfoUrl = import.meta.env.VITE_ROAD_INFORMATION_URL;

export const getFilterRoad = async (selectedButton) => {
    if (selectedButton === "전체") {
        const [response1, response2] = await Promise.all([
            axios.get(`${roadInfoUrl}/bicycle_road`),
            axios.get(`${roadInfoUrl}/amenities`),
        ]);
        const response = [...response1.data, ...response2.data];

        console.log(response);
        return response;
    } else if (selectedButton === "자전거길") {
        const response = await axios.get(`${roadInfoUrl}/bicycle_road`);
        return response.data;

    } else {
        const response = await axios.get(`${roadInfoUrl}/amenities?Classification=${selectedButton}`);
        return response.data;
    }

};

export const getSearchRoad = async (searchValue, selectedButton) => {
    console.log("searchValue => ", searchValue);
    console.log("selectedButton => ", selectedButton);
    if (selectedButton === "전체") {
        const [response1, response2] = await Promise.all([
            axios.get(`${roadInfoUrl}/bicycle_road?BICYCLE_PATH_like=${searchValue}`),
            axios.get(`${roadInfoUrl}/amenities?name_like=${searchValue}`),
        ]);
        const response = [...response1.data, ...response2.data];

        console.log(response);
        return response;
    } else if (selectedButton === "자전거길") {
        const response = await axios.get(`${roadInfoUrl}/bicycle_road?BICYCLE_PATH_like=${searchValue}`);
        return response.data;

    } else {
        const response = await axios.get(`${roadInfoUrl}/amenities?Classification=${selectedButton}&name_like=${searchValue}`);
        return response.data;
    }
};
