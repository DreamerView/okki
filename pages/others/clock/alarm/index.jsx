import dynamic from "next/dynamic";
import NavPreloader from "@/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('@/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import AppPreloader from "@/modules/app_store/app_preloader";
const AppShow =  dynamic(()=>import("@/modules/app_store/app"),{loading: AppPreloader});
import style from "@/styles/technology/clock/index.module.css";
import Link from "next/link";
import { useState,useRef } from "react";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const AlarmApp = ({lang}) => {
    const inputAlarm = useRef();
    const [alarm,setAlarm] = useState([]);
    const addAlarm = (e) => {
        e.preventDefault();
        setAlarm([...alarm,{time:inputAlarm.current.value}]);
    };
    const resetAlarm = (e) => {
        e.preventDefault();
        inputAlarm.current.value = "00:00";
    };
    return(<>
    <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app ">
            <div className="main_block_row">
                <AppShow name="clock" lang={lang} />
                <div className="nav__block_m">
                    <div className={`nav__block_menu apps_list`}>
                        <Link className='block_background' prefetch={false} href="/others/clock">
                              Clock
                        </Link>
                        <Link className='red_background white_font' prefetch={false} href="/others/clock/alarm">
                                Alarm
                        </Link>
                        <Link className='block_background' prefetch={false} href="/others/clock/stopwatch">
                                Stopwatch
                        </Link>
                        <Link className='block_background' prefetch={false} href="/business/markup-prime-calculator">
                                Timer
                        </Link>
                    </div>
                </div>
                <div className={style.clock}>
                    <div className={style.clock_panel}>
                        <input ref={inputAlarm} type="time" className={`${style.alarm} time`} name="appt" defaultValue="00:00" />
                    </div>
                    <div className={style.clock_panel}>
                        Alarm
                    </div>
                </div>
                <div className={style.alarm_block}>
                    <button type="button" onClick={addAlarm} className={style.add_alarm}>Add alarm</button>
                    <button className={style.more} onClick={resetAlarm}>Reset</button>
                </div>
                <div className={style.clock_info}>
                    {alarm.length!==0&&alarm.map((res,index)=>
                    <div key={index}>
                        <div className={style.alarm_clock}>
                            <div className={style.alarm_clock_block}>
                                <h1>{res.time}</h1>
                                <span>No name</span>
                            </div>
                            <div className={style.alarm_clock_block}>
                                <input className="apple-switch" type="checkbox" defaultChecked={true} />
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    </>);
};

export default AlarmApp;