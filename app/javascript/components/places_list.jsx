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
    console.log(loadedPlaces)
    const dataSection = (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>City</th>
                    <th>Recent Upload Speed</th>
                    <th>Recent Upload Speed Units</th>
                    <th>Number of Measurements</th>
                </tr>
                </thead>
                <tbody>
                {loadedPlaces.map((place, index) => (
                    <tr key={index}>
                        <td>{place.name}</td>
                        <td>{place.city}</td>
                        <td>{place.most_recent_download_speed}</td>
                        <td>{place.most_recent_download_speed_unit}</td>
                        <td>{place.number_measurements}</td>
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



