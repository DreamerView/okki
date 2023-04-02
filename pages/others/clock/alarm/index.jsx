import dynamic from "next/dynamic";
import NavPreloader from "@/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('@/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import AppPreloader from "@/modules/app_store/app_preloader";
const AppShow =  dynamic(()=>import("@/modules/app_store/app"),{loading: AppPreloader});
import style from "@/styles/technology/clock/index.module.css";
import Link from "next/link";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const AlarmApp = ({lang}) => {
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
                        <input type="time" className={style.alarm} name="appt" defaultValue="00:00" />
                    </div>
                    <div className={style.clock_panel}>
                        Alarm
                    </div>
                </div>
                <div className={style.alarm_block}>
                    <button className={style.add_alarm}>Add alarm</button>
                </div>
                <div className={style.stopwatch_action}>
                    {/* <button type="button" className={action===false?style.stopwatch_action_stop:style.stopwatch_action_reset} onClick={()=>action===true?writeResult():resetSec()}>{action===true?"Round":"Reset"}</button>
                    <button type="button" className={action===false?style.stopwatch_action_start:style.stopwatch_action_stop} onClick={()=>setAction(action===false?true:false)}>{action===false?"Start":"Stop"}</button> */}
                </div>
                <div className={style.clock_info}>
                    {/* {result!==0&&result.map((res,index)=><div key={index}><span>Круг {index+1}</span><p>{res}</p></div>)} */}
                </div>
            </div>
        </div>
    </>);
};

export default AlarmApp;