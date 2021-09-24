import React from 'react';

import { Link } from "react-router-dom";

// importing text banner
import TextBanner from '../text-banner/TextBanner';

// importing data banner
import { changeBackgroundImage } from "./DataBanner";

import './Banner.scss';

export default function Banner() {

    return (
        <React.Fragment>
            <div className="banner">
                <img className='img' src={changeBackgroundImage[1]} alt="cinema" />

                <TextBanner />

                <div className="button-container">
                    <div className="discover-button">
                        <h3 className='check-h3'>Want first to discover the app?
                            <span className="span-discover">
                                <Link className='discover' to='/movies'>discover</Link>
                            </span></h3>
                    </div>

                    <Link to='/registration'>
                        <button className="get-button" title='Feel free to register yourself'>sign up</button>
                    </Link>
                </div>

            </div>
        </React.Fragment>
    )
}
