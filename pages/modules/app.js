import ux from "/translate/ux/action"
const AppShow = ({name,translate,Image,lang}) => {
    return(
        <div className="main__app_info">
            <Image width={60} height={60} alt="icon" src={"/services/"+name+".webp"}/>
            <div className="main__app_info_block">
                <div>
                <h2>{translate}</h2>
                <p className="smaller">Рейтинг 5.0 ★</p>
                </div>
                <button className="main__app_info_action anim_hover">{ux['save'][lang]}</button>
            </div>
        </div>
    );
};
export default AppShow;