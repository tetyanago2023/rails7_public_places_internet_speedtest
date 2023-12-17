import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";


function PlacesList () {
    const [loading, setLoading] = useState(true);
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    useEffect(() => {
        // Hit the server and get places list
        const apiEndpoint = "/api/places";
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLoadedPlaces(data["places"]);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching places:", error);
                setLoading(false);
            });
    }, []); // Ensure the dependency array is provided to run the effect only once

    const loadingSection = (<div>Loading...</div>)
    const spanClass = "text-gray-100 font-semibold"
    const textSizeClass = "px-16 py-2"
    const dataSection = (
        <div>
            <table className={"mx-auto table-auto"}>
                <thead>
                <tr className={"bg-gradient-to-r from-gray-400 to-gray-700"}>
                    <th className={textSizeClass}><span className={spanClass}>Name</span></th>
                    <th className={textSizeClass}><span className={spanClass}>City</span></th>
                    <th className={textSizeClass}><span className={spanClass}>Recent Upload Speed</span></th>
                    <th className={textSizeClass}><span className={spanClass}>Recent Upload Speed Units</span></th>
                    <th className={textSizeClass}><span className={spanClass}>Number of Measurements</span></th>
                </tr>
                </thead>
                <tbody className={"bg-gray-200"}>
                {loadedPlaces.map((place, index) => (
                    <tr className={"bg-white border-b-2 border-gray-200"} key={index}>
                        <td className={textSizeClass}>{place.name}</td>
                        <td className={textSizeClass}>{place.city}</td>
                        <td className={textSizeClass}>{place.most_recent_download_speed}</td>
                        <td className={textSizeClass}>{place.most_recent_download_speed_unit}</td>
                        <td className={textSizeClass}>{place.number_measurements}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
    if (loading) {
        return loadingSection
    } else {
        return dataSection
    }
}

const placesList = ReactDOM.createRoot(document.getElementById("place-list-container"))
placesList.render(<PlacesList />)



