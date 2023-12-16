import React, { useState } from "react";
import ReactDOM from "react-dom/client";


function PlacesList () {
    const [loading, setLoading] = useState(true);
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    const loadingSection = (<div>Loading...</div>)
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



