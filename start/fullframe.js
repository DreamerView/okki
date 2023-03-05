/*jshint esversion: 6 */
import ux from "/translate/ux/action";
import { memo } from "react";

const FullFrame = ({item,router,useDispatch,Image}) => {
    const lang = router.locale;
    const send = useDispatch();
    return(
        <div className="fullscreen__result">
            <div className="fullscreen__result_block red_background" onClick={()=>{send({type:"setFullFrame",set:false});send({type:"setUrlFrame",set:false});}}>
                <div className="fullscreen__result_button"><Image src={'/img/fullscreen_exit.svg'} width={22} height={22}/></div>
                <p className="small">{ux['fullframe_close'][lang]}</p>
            </div>
            <iframe id="frame_f" title="converter result" src={item}>
                Your browser does not support floating frames!
            </iframe>
        </div>
    )
};

export default memo(FullFrame);