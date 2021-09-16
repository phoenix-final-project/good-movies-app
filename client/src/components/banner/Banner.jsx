import React from 'react';

import { Link } from "react-router-dom";

// importing text banner
import TextBanner from '../text-banner/TextBanner';

// importing data banner
import { changeBackgroundImage, textData } from "./DataBanner";

import './Banner.scss';

// let intervalID;

export default function Banner() {
    // const [index, setIndex] = React.useState(0);
    // // const [indexText, setIndexText] = React.useState(0);

    // React.useEffect(() => {
    //     // window.scrollTop = 0;
    //     indexFunction();
    //     return () => clearInterval(intervalID);
    // }, [index]); // , [index]

    // const indexFunction = () => {
    //     intervalID = setInterval(() => {
    //         setIndex(index => {
    //             index = index + 1;
    //             if (index === 3) {
    //                 index = 0
    //             }
    //             return index;
    //         });

    //         // setIndexText(indexText => {
    //         //     indexText = indexText + 1;
    //         //     if (indexText === 3) {
    //         //         indexText = 0
    //         //     }
    //         //     return indexText;
    //         // });
    //     }, 6000);
    // }

    return (
        <React.Fragment>
            <div className="banner">
                <img className='img' src={changeBackgroundImage[1]} alt="cinema" />
                <TextBanner title='Hello World' paragraph={textData[0]}/>
                <div className="button-container">
                    <div className="discover-button">
                        <h3 className='check-h3'>Want first to discover the app?</h3>
                        <span className="span-discover">
                            <Link className='discover' to='/movies'>discover</Link>
                        </span>
                    </div>
                    <Link to='/registration'>
                        <button className="get-button" title='Feel free to register yourself'>sign up</button>
                    </Link>
                </div>
            </div>
        </React.Fragment>
    )
}
