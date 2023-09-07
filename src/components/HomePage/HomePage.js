import React from "react";
import './HomePage.css'

function HomePage() {


    const signOutHandler = () => {
        localStorage.removeItem('userData');
        window.location.reload();
    }

    return (
        <React.Fragment>
            <h1>Home Page</h1>
            <button onClick={signOutHandler}>Sign Out</button>
        </React.Fragment>
    );
}

export default HomePage;