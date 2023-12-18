import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

function Link(props) {
    return null;
}

function renderPlacesPage(body) {
    return (
        <div className="bg-white p-8 rounded-md w-full">
            <div className="flex items-center justify-between pb-6">
                <div>
                    <h2 className="text-4xl text-gray-600 font-semibold">Places</h2>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex bg-gray-50 items-center p-2 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            />
                        </svg>
                        <input
                            className="bg-gray-50 outline-none ml-1 block w"
                            type="text"
                            name=""
                            id=""
                            placeholder="search..."
                            // onChange={onSearchTextChange}
                        />
                    </div>
                    <div className="lg:ml-40 ml-10 space-x-8">
                        <Link to="/new-internet-speed">
                            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Log</button>
                        </Link>
                    </div>
                </div>
            </div>
            {body}
        </div>
    )
}
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
    const toolbarSection = (
        <div className="flex items-center justify-between pb-6">
            <div>
                <h2 className="text-4xl text-gray-600 font-semibold">Places</h2>
            </div>
        </div>
    )
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
        return renderPlacesPage(loadingSection)
    } else {
        return renderPlacesPage(dataSection)
    }
}

const placesList = ReactDOM.createRoot(document.getElementById("page-places"))
placesList.render(<PlacesList />)



