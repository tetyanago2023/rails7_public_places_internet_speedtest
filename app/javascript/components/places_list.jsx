import React from "react";
import ReactDOM from "react-dom/client";

class PlaceList extends React.Component {
    render() {
        return (
            <div>Place list rendered in React!</div>
        )
    }
}

const placesList = ReactDOM.createRoot(document.getElementById("place-list-container"))
placesList.render(<PlaceList />)



