/*jshint esversion: 6 */
/*jshint esversion: 9 */
import dynamic from 'next/dynamic';
import NavbarApp from '/pages/navbar_app/nav';
import style from "/styles/user/index.module.css";
import { useMediaQuery } from 'react-responsive';
import { useEffect,useState } from 'react';
import Image from 'next/image';
import ux from "/translate/user/index_translate";
import Head from 'next/head';
const HeaderUser = dynamic(()=>import('/pages/user/headerModule'),{ssr:false});
import { useRouter } from 'next/router';
const AesEncryption = require('aes-encryption');

export const getServerSideProps = async (context) => {
    context.res.setHeader('Cache-Control','public, s-maxage=10, stale-while-revalidate=59');
    const path = '/get-devices';
    const locale = context.locale,cookie = context.req.headers.cookie;
    const ReturnBack = () => {return {redirect: {permanent: false,destination: '/signin',}};};
    const GetRequest = ({auth})=> {return{method:'GET',headers:{"Authorization": `Bearer ${auth}`,"Accept":"application/json; charset=utf-8","Content-Type": "application/json; charset=utf-8","Accept-Encoding":"gzip"},cache: "no-store"};};
    if(cookie!==undefined) {
            const aes = new AesEncryption();
            aes.setSecretKey(process.env.aesKey);
            const getCookie = (cookieName) => {let cookies = {};cookie.split(';').forEach(function(el) {let [key,value] = el.split('=');cookies[key.trim()] = value;});return cookies[cookieName];};
            const userAccessToken = getCookie("accessToken"),userClientId = getCookie("clientId");
            if(userAccessToken!==undefined&&userAccessToken!==null&&userClientId!==undefined&&userClientId!==null) {
                const accessToken = aes.encrypt(userAccessToken),clientId = aes.encrypt(userClientId),requestOptions = GetRequest({auth:accessToken+" "+clientId}),login = await fetch(process.env.backend+path, requestOptions);
                if (login.status === 406) {
                    const tokenOptions = {
                        method: 'POST',
                        headers: {"Accept":"application/json; charset=utf-8","Content-Type": "application/json; charset=utf-8"},
                        cache: "no-store",
                        body: JSON.stringify({accessToken:accessToken,clientId:clientId})
                    };
                    const send = await fetch(process.env.backend+"/generate-token",tokenOptions);
                    if(send.status === 409) {
                        context.res.setHeader('set-cookie', ["clientId=;Max-Age=0;path=/","accessToken=;Max-Age=0;path=/"]);
                        return ReturnBack();
                    } else {
                        const result = await send.json();
                        if(result.accessToken!==undefined) {
                            const response = aes.decrypt(result.accessToken),getClientId = aes.decrypt(result.clientId),today = new Date(),expire = new Date();
                            expire.setTime(today.getTime() + 3600000*24*14);
                            context.res.setHeader('set-cookie', ["accessToken="+response+";path=/;secure;expires="+expire.toGMTString()+"","clientId="+getClientId+";path=/;secure;expires="+expire.toGMTString()+""]);
                            console.log("token updated, new token is "+response);
                            const sendReqOpt =  GetRequest({auth:aes.encrypt(response)+" "+clientId}),send = await fetch(process.env.backend+path, sendReqOpt);
                            const result = send.json();
                            return {props:{locale:locale,data:result}}
                        }
                    }
                } else if(login.status === 409) {
                    context.res.setHeader('set-cookie', ["clientId=;Max-Age=0;path=/","accessToken=;Max-Age=0;path=/"]);
                    return ReturnBack();
                } 
                else {
                    console.log(login)
                    // const send = login.json()
                    return {props:{locale:locale,data:login}};
                }
            } else {
                context.res.setHeader('set-cookie', ["clientId=;Max-Age=0;path=/","accessToken=;Max-Age=0;path=/"]);
                return ReturnBack();
            }
    } 
    return ReturnBack();
};

const UserInterface = ({data,locale}) => {
    const [lazy,setLazy] = useState(false);
    const router = useRouter();
    const lang = locale;
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
    const colorChanger = (event) => {
        let color;
        switch(event) {
            case 0:color="grey_background";break;
            case 1:color="brand_background";break;
            case 2:color="green_background";break;
            case 3:color="red_background";break;
            case 4:color="purple_background";break;
            case 5:color="orange_background";break;
            default: color="brand_background";break;
        }
        return color;
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
    const titleHead = `${ux['devices'][lang]} | Okki.kz`;
    return(
    <>
        <Head>
                <title>{titleHead}</title>
        </Head>
        <NavbarApp lang={lang} to={{href:"/user"}} choice="alone" mode="standalone"/>
        <div className="main_app">
            <div className={style.user__main}>
                {lazy===true&&isTabletOrMobile?"":<HeaderUser lang={lang}/>}
                <div className={style.main__user_action}>
                    <h1>{ux['devices'][lang]}</h1>
                    <p className='sub_content'>Текущий сеанс</p>
                    <div className={style.devices_row_main}>
                            {data!==null&&data!==undefined&&data.result.filter(e=>e.clientId===data.clientId).map((e,index)=><div onClick={()=>router.push('/user/devices/'+e.clientId)} key={index} className={`${style.devices} anim_hover`}>
                                <div onClick={()=>router.push('/user/devices/'+e.clientId)} key={index} className={`${style.devices_row}`}>
                                    <div className={`${style.devices_row_image} ${JSON.parse(e.clientInfo).name===null?'blue_background':brandChanger(JSON.parse(e.clientInfo).name.toLowerCase().split(' ').join(''))}`}><Image priority width={30} height={30} src={JSON.parse(e.clientInfo).name===null?"/img/devices.svg":brandCheker(JSON.parse(e.clientInfo).name.toLowerCase().split(' ').join(''))} alt="device"/></div>
                                    <div className={style.devices_row_block}>
                                        <h4>{JSON.parse(e.clientInfo).name===null?"Неизвестно":JSON.parse(e.clientInfo).name} - {JSON.parse(e.clientInfo).product!==null&&JSON.parse(e.clientInfo).product}{JSON.parse(e.clientInfo).os!==null&&" "+JSON.parse(e.clientInfo).os.family+" "+JSON.parse(e.clientInfo).os.version}</h4>
                                        {/* <p className={style.subber}>{JSON.parse(e.clientInfo).name+" "+JSON.parse(e.clientInfo).version}</p> */}
                                        <p className={style.sub}>{JSON.parse(e.ipInfo).cityName!==null&&JSON.parse(e.ipInfo).cityName!==undefined&&JSON.parse(e.ipInfo).cityName}, {JSON.parse(e.ipInfo).countryName!==null&&JSON.parse(e.ipInfo).countryName!==undefined&&JSON.parse(e.ipInfo).countryName}</p>
                                        <p className={style.sub}>{ConvertTime(JSON.parse(e.getTime))}</p>
                                    </div>
                                </div>
                            </div>)}
                    </div>
                    <p className={style.subber}>Активные сеансы</p>
                    <div className={style.devices_row_main}>
                            {data!==null&&data!==undefined&&data.result.filter(e=>e.clientId!==data.clientId).map((e,index)=>
                                <div onClick={()=>router.push('/user/devices/'+e.clientId)} key={index} className={`${style.devices} anim_hover`}>
                                    <div key={index} className={style.devices_row}>
                                        <div className={`${style.devices_row_image} ${JSON.parse(e.clientInfo).name===null?colorChanger(Math.floor(Math.random() * 6)):brandChanger(JSON.parse(e.clientInfo).name.toLowerCase().split(' ').join(''))}`}><Image priority alt="icon" width={30} height={30} src={JSON.parse(e.clientInfo).name===null?"/img/devices.svg":brandCheker(JSON.parse(e.clientInfo).name.toLowerCase().split(' ').join(''))}/></div>
                                        <div className={style.devices_row_block}>
                                            <h4>{JSON.parse(e.clientInfo).name===null?"Неизвестно":JSON.parse(e.clientInfo).name} - {JSON.parse(e.clientInfo).product!==null&&JSON.parse(e.clientInfo).product}{JSON.parse(e.clientInfo).os!==null&&" "+JSON.parse(e.clientInfo).os.family+" "+JSON.parse(e.clientInfo).os.version}</h4>
                                            {/* <p className={style.subber}>{JSON.parse(e.clientInfo).name+" "+JSON.parse(e.clientInfo).version}</p> */}
                                            <p className={style.sub}>{JSON.parse(e.ipInfo).cityName!==null&&JSON.parse(e.ipInfo).cityName!==undefined&&JSON.parse(e.ipInfo).cityName}, {JSON.parse(e.ipInfo).countryName!==null&&JSON.parse(e.ipInfo).countryName!==undefined&&JSON.parse(e.ipInfo).countryName}</p>
                                            <p className={style.sub}>{ConvertTime(JSON.parse(e.getTime))}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        
                    </div>
                </div>
            </div>
        </div>
    </>
    );
};

export default UserInterface;