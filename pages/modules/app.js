import ux from "/translate/ux/action";
import { RWebShare } from "react-web-share";
const AppShow = ({name,translate,Image,lang}) => {
    const pushNotification = async() => {
        const img = "/img/support.webp";
        const text = "Take a look at this brand new t-shirt!";
        const title = "New Product Available";
        const options = {
            body: text,
            icon: "/images/jason-leung-HM6TMmevbZQ-unsplash.jpg",
            vibrate: [200, 100, 200],
            tag: "new-product",
            image: img,
            badge: img,
            actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }]
        };

        navigator!==undefined && navigator.serviceWorker.ready.then(function(serviceWorker) {
        serviceWorker.showNotification(title, options);
        });
    };
    return(
        <div className="main__app_i">
        <div className="main__app_info">
            <Image width={60} height={60} alt="icon" src={"/services/"+name+".webp"}/>
            <div className="main__app_info_block">
                <div className="block_1">
                <h3>{translate}</h3>
                <p className="smaller">Здоровье</p>
                </div>
                <div className="block_2">
                <button onClick={pushNotification} className="main__app_info_action anim_hover">{ux['save'][lang]}</button>
                <RWebShare
                    data={{
                    text: "Like humans, flamingos make friends for life",
                    url: "https://on.natgeo.com/2zHaNup",
                    title: "Flamingos",
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
                <h1>4.8</h1>
                <p className="small">★★★★★</p>
            </div>
            <div className="main__app_info_banner_block">
                <p className="small">Language</p>
                <h1>{lang}</h1>
                <p className="small">+ 2 More</p>
            </div>
            <div className="main__app_info_banner_block">
                <p className="small">Developer</p>
                <h1>✎</h1>
                <p className="small">Okki.kz</p>
            </div>
            <div className="main__app_info_banner_block">
                <p className="small">Release</p>
                <h1>⊙</h1>
                <p className="small">12.08.2022</p>
            </div>
        </div>
        </div>
    );
};
export default AppShow;