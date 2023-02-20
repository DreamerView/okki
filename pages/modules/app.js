const AppShow = ({name,translate,Image}) => {
    return(
        <div className="main__app_info">
            <Image width={60} height={60} alt="icon" src={"/services/"+name+".webp"}/>
            <div className="main__app_info_block">
                <h3>{translate}</h3>
                <p className="smaller">Здоровье</p>
                <button className="main__app_info_action anim_hover">Сохранить</button>
            </div>
        </div>
    );
};
export default AppShow;