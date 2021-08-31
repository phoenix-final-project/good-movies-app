// importing styling scss
import './Cookies.scss';

// importing react
import React, { useState, useEffect } from "react";

export default function Cookies() {
    const [cookies, setCookies] = useState('cookies-container-hide');

    let CheckCookies = () => {
        setCookies('cookies-container-hide');
        localStorage.setItem('cookies has been accepted', true);
    };

    useEffect(() => {
        let cookiesAcceptance = localStorage.getItem('cookies has been accepted');

            if (!cookiesAcceptance) {
                setTimeout(() => {
                setCookies('cookies-container-active')
            }, 3000);
        }
    }, []);

    return (
        <React.Fragment>
            <div className={cookies}>
                <div className="cookies-sub-container">
                    <h1>Manage cookie preferences</h1>
                    <p>This website uses cookies, by clicking <b>"Accept"</b> you agree with the use of analytical cookies (which are used to gain insight on website usage and which are used to improve our site and services) and tracking cookies (including from trusted partners) that help decide which product to show you on and off our site, measure the audience visiting our websites, and enable you to like or share things directly on social media. By clicking  <a href="..">here</a>, you can manage your consent and find more information about the cookies we use.</p>
                </div>
                <div className="manage">
                    <button className="btn" onClick={CheckCookies}>Accept</button>
                    <a href="..">Manage setting</a>
                </div>
            </div>
        </React.Fragment>
    )
}
