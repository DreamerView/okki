import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import AppPreloader from "/modules/app_store/app_preloader";
const AppShow =  dynamic(()=>import("/modules/app_store/app"),{loading: AppPreloader});
import style from "/styles/technology/clock/index.module.css";
import { useState,useEffect } from "react";
import Link from "next/link";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const ClockApp = ({lang}) => {
    const [clock,setClock] = useState({
        dayWeek:"",
        hour:"00",
        min:"00",
        sec:"00",
        day:"00",
        month:"00",
        year:"0000",
        utc:0
    });
    useEffect(() => {
        function time() {
            const weekday = ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"];
            const date = new Date();
            const utc = date.getUTCHours();
            const dayWeek = weekday[date.getDay()];;
            const day = String(date.getDate()).length===1?"0"+String(date.getDate()):date.getDate();
            const month = String(date.getMonth()+1).length===1?"0"+String(date.getMonth()+1):String(date.getMonth()+1);
            const year = date.getFullYear();
            const hours = String(date.getHours()).length===1?"0"+String(date.getHours()):date.getHours();
            const minutes = String(date.getMinutes()).length===1?"0"+String(date.getMinutes()):date.getMinutes();
            const sec = String(date.getSeconds()).length===1?"0"+String(date.getSeconds()):date.getSeconds();;
            setClock({...clock,hour:hours,min:minutes,sec:sec,day:day,month:month,year:year,dayWeek:dayWeek,utc:utc})
          }
          
          let intervalId = setInterval(time, 1000);
    
      return () => {
        clearInterval(intervalId);
      }
    }, [clock]);
    
    return(<>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app ">
            <div className="main_block_row">
                <AppShow name="clock" lang={lang} />
                <div className="nav__block_m">
                    <div className={`nav__block_menu apps_list`}>
                        <Link className='red_background white_font' prefetch={false} href="/technology/clock">
                              Worldwide clock
                        </Link>
                        <Link className='block_background' prefetch={false} href="/business/margin-cost-calculator">
                                Alarm
                        </Link>
                        <Link className='block_background' prefetch={false} href="/business/margin-cost-calculator">
                                Stopwatch
                        </Link>
                        <Link className='block_background' prefetch={false} href="/business/markup-prime-calculator">
                                Timer
                        </Link>
                    </div>
                </div>
                <div className={style.clock}>
                    <div className={style.clock_panel}>
                        <span>{clock.hour}:</span>
                        <span>{clock.min}:</span>
                        <span>{clock.sec}</span>
                    </div>
                    <div className={style.clock_panel}>
                        <p>{clock.day+"."+clock.month+"."+clock.year}</p>
                    </div>
                </div>
                <div className={style.clock_info}>
                    <div><span>Дата</span><p>{clock.day+"."+clock.month+"."+clock.year}</p></div>
                    <div><span>Сейчас</span><p>{clock.dayWeek}</p></div>
                    <div><span>UTC часы</span><p>{clock.utc}</p></div>
                </div>
            </div>
        </div>
    </>);
};
export default ClockApp