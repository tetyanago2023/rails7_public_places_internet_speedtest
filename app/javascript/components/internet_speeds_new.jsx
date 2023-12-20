import ReactDOM from "react-dom/client";
import React from "react";

function NewInternetSpeed () {
    return (
        <div>Placeholder page to enter internet speed</div>
    )
}

const internetSpeedPage = ReactDOM.createRoot(document.getElementById("internet-speeds-new"))
internetSpeedPage.render(<NewInternetSpeed />)