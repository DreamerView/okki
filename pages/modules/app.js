const AppShow = ({name,translate,Image}) => {
    return(
        <div className="main__app_info">
            <Image width={60} height={60} alt="icon" src={"/services/"+name+".webp"}/>
            <div className="main__app_info_block">
                <h5>{translate}</h5>
                <p className="smaller">Здоровье</p>
            </div>
            <button className="main__app_info_action anim_hover">Сохранить</button>
        </div>
    );
};
export default AppShow;