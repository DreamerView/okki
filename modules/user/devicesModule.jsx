import style from "/styles/user/index.module.css";
import { useMediaQuery } from 'react-responsive';
import { useEffect,useState } from 'react';
import Image from 'next/image';
const HeaderUser = dynamic(()=>import('/modules/user/headerModule'),{ssr:false});
import ClientJsonFetchReq from "/start/ClientJsonFetchReq";
import { useRouter } from 'next/router';

const DevicesModule = ({ux,getId,data,lang}) => {
    const router = useRouter();
    const [lazy,setLazy] = useState(false);
    const isTabletOrMobile = useMediaQuery({ query: '(min-width:1px) and (max-width:750px)' });
    useEffect(()=>{
        setLazy((lazy)=>lazy=true);
        return()=>{
            return false;
        }
    },[]);
    const ConvertTime = (unix_timestamp) => {
        const date = new Date(unix_timestamp);
        const day = String(date.getDate()).length===1?"0"+String(date.getDate()):date.getDate();
        const month = String(date.getMonth()+1).length===1?"0"+String(date.getMonth()+1):String(date.getMonth()+1);
        const year = date.getFullYear();
        const hours = String(date.getHours()).length===1?"0"+String(date.getHours()):date.getHours();
        const minutes = String(date.getMinutes()).length===1?"0"+String(date.getMinutes()):date.getMinutes();
        return day+"."+month+"."+year+" "+hours+":"+minutes;
    };
    const brandChanger = (event) => {
        let color;
        switch(event) {
            case "chrome":color="orange_background";break;
            case "safari":color="blue_background";break;
            case "firefox":color="red_background";break;
            case "firefoxforios":color="red_background";break;
            case "microsoftedge":color="brand_background";break;
            case "opera":color="red_background";break;
            default: color="brand_background";break;
        }
        return color;
    };
    const brandCheker = (event) => {
        let color;
        switch(event) {
            case "chrome":color="/platforms/chrome.svg";break;
            case "safari":color="/platforms/safari.svg";break;
            case "firefox":color="/platforms/firefox.svg";break;
            case "firefoxforios":color="/platforms/firefox.svg";break;
            case "microsoftedge":color="/platforms/microsoftedge.svg";break;
            case "opera":color="/platforms/opera.svg";break;
            default: color="/img/devices.svg";break;
        }
        return color;
    };
    const signoutDevice = async() => {
        const send = await ClientJsonFetchReq({method:"POST",path:'/signout-device',cookie:document.cookie,body:{clientId:getId}});
        if(send.accept===true) return router.push("/user/device", undefined, { shallow: true });
    };
    return(
        <div className="main_app">
            <div className={style.user__main}>
                {lazy===true&&isTabletOrMobile?"":<HeaderUser lang={lang}/>}
                <div className={style.main__user_action}>
                    <h1>{ux['devices'][lang]}</h1>
                    <p className='sub_content'>{ux['client_selected'][lang]}</p>
                    {data!==null&&data!==undefined&&getId!==undefined&&getId!==null&&data.result.filter((e)=>e.clientId===getId).map((e,index)=>
                    <div key={index} className={style.standalone_device}>
                        <div className={style.standalone_device_block_1}>
                            <div className={`${style.standalone_device_block_1_image} ${JSON.parse(e.clientInfo).name===null?'blue_background':brandChanger(JSON.parse(e.clientInfo).name.toLowerCase().split(' ').join(''))}`}>
                                <Image priority src={JSON.parse(e.clientInfo).name===null?"/img/devices.svg":brandCheker(JSON.parse(e.clientInfo).name.toLowerCase().split(' ').join(''))} width={40} height={40} alt="icon" />
                            </div>
                        </div>
                        <div className={style.standalone_device_block_2}>
                            <div className={style.standalone_device_block_row}>
                            <p className={style.subber}>{ux['client'][lang]}</p>
                            <h4>{JSON.parse(e.clientInfo).name+" v."+JSON.parse(e.clientInfo).version}</h4>
                            </div>
                            <div className={style.standalone_device_block_row}>
                            <p className={style.subber}>{ux['ip_address'][lang]}</p>
                            <h4>{JSON.parse(e.ipInfo).ip!==null&&JSON.parse(e.ipInfo).ip!==undefined&&JSON.parse(e.ipInfo).ip}</h4>
                            </div>
                            <div className={style.standalone_device_block_row}>
                            <p className={style.subber}>{ux['geoposition'][lang]}</p>
                            <h4>{JSON.parse(e.ipInfo).cityName!==null&&JSON.parse(e.ipInfo).cityName!==undefined&&JSON.parse(e.ipInfo).cityName}, {JSON.parse(e.ipInfo).countryName!==null&&JSON.parse(e.ipInfo).countryName!==undefined&&JSON.parse(e.ipInfo).countryName}</h4>
                            </div>
                            <div className={style.standalone_device_block_row}>
                            <p className={style.subber}>{ux['devices'][lang]}</p>
                            <h4>{JSON.parse(e.clientInfo).product!==null?JSON.parse(e.clientInfo).product:ux['unknown'][lang]}</h4>
                            </div>
                            <div className={style.standalone_device_block_row}>
                            <p className={style.subber}>{ux['operating_system'][lang]}</p>
                            <h4>{JSON.parse(e.clientInfo).os!==null&&" "+JSON.parse(e.clientInfo).os.family+" "+JSON.parse(e.clientInfo).os.version}</h4>
                            </div>
                            <div className={style.standalone_device_block_row}>
                            <p className={style.subber}>{ux['activity'][lang]}</p>
                            <h4>{ConvertTime(JSON.parse(e.getTime))}</h4>
                            </div>
                        </div>
                    </div>)}
                    {data!==null&&data!==undefined&&data!==undefined&&data!==null&&data.result.filter(e=>e.clientId===getId).map((e,index)=><div onClick={()=>signoutDevice()} key={index} className={`${style.session_signout} anim_hover`}>Завершить сеанс</div>)}
                </div>
            </div>
        </div>
    )
};

export default DevicesModule;