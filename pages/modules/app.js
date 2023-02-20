import ux from "/translate/ux/action"
const AppShow = ({name,translate,Image,lang}) => {
    return(
        <div className="main__app_i">
        <div className="main__app_info">
            <Image width={60} height={60} alt="icon" src={"/services/"+name+".webp"}/>
            <div className="main__app_info_block">
                <div>
                <h3>{translate}</h3>
                <p className="smaller">Здоровье</p>
                </div>
                <button className="main__app_info_action anim_hover">{ux['save'][lang]}</button>
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
        </div>
        </div>
    );
};
export default AppShow;