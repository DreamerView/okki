import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import AppPreloader from "/modules/app_store/app_preloader";
const AppShow =  dynamic(()=>import("/modules/app_store/app"),{loading: AppPreloader});
import style from "/styles/technology/clock/index.module.css";
import { useState,useEffect } from "react";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const ClockApp = ({lang}) => {
    const [clock,setClock] = useState({
        hour:0,
        min:0,
        sec:0,
        day:0,
        month:0,
        year:0
    });
    useEffect(() => {
        function time() {
            const date = new Date();
            const day = String(date.getDate()).length===1?"0"+String(date.getDate()):date.getDate();
            const month = String(date.getMonth()+1).length===1?"0"+String(date.getMonth()+1):String(date.getMonth()+1);
            const year = date.getFullYear();
            const hours = String(date.getHours()).length===1?"0"+String(date.getHours()):date.getHours();
            const minutes = String(date.getMinutes()).length===1?"0"+String(date.getMinutes()):date.getMinutes();
            const sec = String(date.getSeconds()).length===1?"0"+String(date.getSeconds()):date.getSeconds();;
            setClock({...clock,hour:hours,min:minutes,sec:sec,day:day,month:month,year:year})
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
            </div>
        </div>
    </>);
};
export default ClockApp