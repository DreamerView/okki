import ux from "/translate/ux/action";
import { RWebShare } from "react-web-share";
import { memo } from "react";
const AppShow = ({name,translate,Image,lang}) => {
    return(
        <div className="main__app_i">
        <div className="main__app_info">
            <Image priority={true} width={60} height={60} alt="icon" src={"/services/"+name+".webp"}/>
            <div className="main__app_info_block">
                <div className="block_1">
                <h3>{translate}</h3>
                <p className="smaller">{ux['service'][lang]}</p>
                </div>
                <div className="block_2">
                <button className="main__app_info_action anim_hover">{ux['save'][lang]}</button>
                <RWebShare
                    data={{
                    text: "Здоровье",
                    url: typeof Window !== 'undefined'&&window.location.href,
                    title: translate,
                    }}
                    onClick={() => console.log("shared successfully!")}
                >
                    <svg className="share anim_hover" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d="M478.825 709Q466 709 457.5 700.375T449 679V252l-67 67q-8.25 8-20.625 8t-21.766-9.053q-8.609-9.052-8.609-21.5Q331 284 340 275l118-118q5-5 10.217-7 5.218-2 10.783-2 5.565 0 10.783 2Q495 152 500 157l119 119q8 8 8.5 20.5t-8.553 21.5q-9.052 9-21.5 9Q585 327 576 318l-67-66v427q0 12.75-8.675 21.375-8.676 8.625-21.5 8.625ZM220 1016q-24 0-42-18t-18-42V447q0-24 18-42t42-18h139q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T359 447H220v509h520V447H599q-12.75 0-21.375-8.675-8.625-8.676-8.625-21.5 0-12.825 8.625-21.325T599 387h141q24 0 42 18t18 42v509q0 24-18 42t-42 18H220Z"/></svg>
                </RWebShare>
                </div>
            </div>
        </div>
        <div className="main__app_info_banner">
            <div className="main__app_info_banner_block">
                <p className="small">Rating</p>
                <h1>5.0</h1>
                <p className="small">★★★★★</p>
            </div>
            <div className="main__app_info_banner_block">
                <p className="small">Language</p>
                <h1>{lang}</h1>
                <p className="small">+ 2 More</p>
            </div>
            <div className="main__app_info_banner_block">
                <p className="small">Developer</p>
                <svg className="banner" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M12,6c1.93,0,3.5,1.57,3.5,3.5 c0,1.93-1.57,3.5-3.5,3.5s-3.5-1.57-3.5-3.5C8.5,7.57,10.07,6,12,6z M19,19H5v-0.23c0-0.62,0.28-1.2,0.76-1.58 C7.47,15.82,9.64,15,12,15s4.53,0.82,6.24,2.19c0.48,0.38,0.76,0.97,0.76,1.58V19z"/></g></svg>
                <p className="small">Okki.kz</p>
            </div>
            <div className="main__app_info_banner_block">
                <p className="small">Release</p>
                <svg className="banner" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><path d="M17,2c-0.55,0-1,0.45-1,1v1H8V3c0-0.55-0.45-1-1-1S6,2.45,6,3v1H5C3.89,4,3.01,4.9,3.01,6L3,20c0,1.1,0.89,2,2,2h14 c1.1,0,2-0.9,2-2V6c0-1.1-0.9-2-2-2h-1V3C18,2.45,17.55,2,17,2z M19,20H5V10h14V20z M11,13c0-0.55,0.45-1,1-1s1,0.45,1,1 s-0.45,1-1,1S11,13.55,11,13z M7,13c0-0.55,0.45-1,1-1s1,0.45,1,1s-0.45,1-1,1S7,13.55,7,13z M15,13c0-0.55,0.45-1,1-1s1,0.45,1,1 s-0.45,1-1,1S15,13.55,15,13z M11,17c0-0.55,0.45-1,1-1s1,0.45,1,1s-0.45,1-1,1S11,17.55,11,17z M7,17c0-0.55,0.45-1,1-1 s1,0.45,1,1s-0.45,1-1,1S7,17.55,7,17z M15,17c0-0.55,0.45-1,1-1s1,0.45,1,1s-0.45,1-1,1S15,17.55,15,17z"/></g></svg>
                <p className="small">12.08.2022</p>
            </div>
        </div>
        </div>
    );
};
export default memo(AppShow);