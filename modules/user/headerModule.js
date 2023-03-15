/*jshint esversion: 6 */
import style from "/styles/user/index.module.css";
import Image from 'next/image';
import Link from 'next/link';
import translate from "/translate/user/index_translate";
import ClientJsonFetchReq from "/start/ClientJsonFetchReq";
import { useEffect,useState,memo } from "react";


const HeaderUser = ({lang}) => {
    const [data,setData] = useState(null);
    useEffect(()=>{
        if(typeof window !== "undefined") setData(prev=>prev=JSON.parse(localStorage.getItem('loginParams')));
        return () =>{
            return false;
        };
    },[]);
    const logOut = async() => {
        const send = await ClientJsonFetchReq({method:"GET",path:'/signout',cookie:document.cookie})
            if(send.accept===true) {
                document.cookie = 'accessToken' + '=;Max-Age=0;path=/';
                document.cookie = 'clientId' + '=;Max-Age=0;path=/';
                window.location.href="/";
            }
    };
    return(
        <div className={style.user__main_row}>
            <div className={style.no_center}>
                    <div className={style.user__main_portfolio}>
                        <div className={`${style.user__main_portfolio_avatar} ${data===null&&"skeleton"}`}>
                            {data!==null&&<Image className={style.user__main_portfolio_avatar_image} priority width={80} height={80} alt="avatar" src={data.avatar}/>}
                        </div>
                        <div className={style.user__main_portfolio_row}>
                            <div className={`${style.header_text_preloader_1} ${data===null&&"skeleton"}`}><h3 className={style.need_center}>{data!==null&&data.name+" "+data.surname}</h3></div>
                            <div className={`${style.header_text_preloader_2} ${data===null&&"skeleton"}`}><p className={`${style.portfolio_sub} ${style.need_center}`}>{data!==null&&"@"+data.login}</p></div>
                        </div>
                    </div>
                    <div className={`${style.main__block_user_row}`}>
                        <Link shallow={true} href="/user/history" prefetch={false}>
                        <div className={`${style.main__block_user} anim_hover`}>
                            <div className={`${style.main__block_user_image} blue_background`}>
                                <div className={style.main__block_user_image_row}>
                                    <Image priority width={24} height={24} alt="icon" src="/img/history.svg"/>
                                </div>
                            </div>
                            <p>{translate['recent'][lang]}</p>
                        </div>
                        </Link>
                        <Link shallow={true} href="/user/favourite" prefetch={false}>
                        <div className={`${style.main__block_user} anim_hover`}>
                            <div className={`${style.main__block_user_image} red_background`}>
                                <div className={style.main__block_user_image_row}>
                                    <Image priority width={24} height={24} alt="icon" src="/img/heart.svg"/>
                                </div>
                            </div>
                            <p>{translate['favorites'][lang]}</p>
                        </div>
                        </Link>
                        <Link shallow={true} href="/user/device" prefetch={false}>
                        <div className={`${style.main__block_user} anim_hover`}>
                            <div className={`${style.main__block_user_image} green_background`}>
                                <div className={style.main__block_user_image_row}>
                                    <Image priority width={24} height={24} alt="icon" src="/img/devices.svg"/>
                                </div>
                            </div>
                            <p>{translate['devices'][lang]}</p>
                        </div>
                        </Link>
                        <div className={`${style.main__block_user} anim_hover`}>
                            <div className={`${style.main__block_user_image} grey_background`}>
                                <div className={style.main__block_user_image_row}>
                                    <Image priority width={24} height={24} alt="icon" src="/img/manage_accounts.svg"/>
                                </div>
                            </div>
                            <p>{translate['settings'][lang]}</p>
                        </div>
                        <div onClick={()=>logOut()} className={`${style.main__block_user} anim_hover`}>
                            <div className={`${style.main__block_user_image} orange_background`}>
                                <div className={style.main__block_user_image_row}>
                                    <Image priority width={24} height={24} alt="icon" src="/img/logout.svg"/>
                                </div>
                            </div>
                            <p>{translate['logout'][lang]}</p>
                        </div>
                    </div>
                </div>
            </div>
    );
};
export default memo(HeaderUser); 