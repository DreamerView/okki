import dynamic from "next/dynamic";
import NavPreloader from "@/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('@/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import AppPreloader from "@/modules/app_store/app_preloader";
const AppShow =  dynamic(()=>import("@/modules/app_store/app"),{loading: AppPreloader});
import style from "@/styles/technology/clock/index.module.css";
import Link from "next/link";
import {useState,useEffect} from "react";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const params = {hour:"00",min:"00",sec:"00",ms:"00"};

const StopWatch = ({lang}) => {
    const [sec,setSec] = useState(params);
    const [count,setCount] = useState(0);
    const [action,setAction] = useState(false);
    const [result,setResult] = useState([]);
    useEffect(()=>{
        const toDub = (n) => {
            return n < 10 ? "0" + n : "" + n
        };
        let td = setInterval(function () {
            if(action) {
                setCount(prev=>prev+1);
                const ms = toDub(parseInt(count % 60)); 
                const s = toDub(parseInt(count / 60 % 60));
                const min = toDub(parseInt(count / 60**2 % 60)); 
                const hour = toDub(parseInt(count / 60**3 % 60));
                setSec({...sec,hour:hour,min:min,sec:s,ms:ms});
            }
        }, 1000 / 60);
        return () => {
            clearInterval(td);
        };
    },[action,count,sec]);
    const resetSec = () => {
        setAction(false);
        setCount(prev=>prev=0);
        setSec(params);
        setResult([]);
    };
    const writeResult = () => {
        setResult([...result,`${sec.hour}:${sec.min}:${sec.sec}:${sec.ms}`]);
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
                        <Link className='block_background' prefetch={false} href="/others/clock/alarm">
                                Alarm
                        </Link>
                        <Link className='red_background white_font' prefetch={false} href="/others/clock/stopwatch">
                                Stopwatch
                        </Link>
                        <Link className='block_background' prefetch={false} href="/business/markup-prime-calculator">
                                Timer
                        </Link>
                    </div>
                </div>
                <div className={style.clock}>
                    <div className={style.clock_panel}>
                        <span>{sec.hour}:</span>
                        <span>{sec.min}:</span>
                        <span>{sec.sec}:</span>
                        <span>{sec.ms}</span>
                    </div>
                    <div className={style.clock_panel}>
                        <p>Stopwatch</p>
                    </div>
                </div>
                <div className={style.stopwatch_action}>
                    <button type="button" className={action===false?style.stopwatch_action_stop:style.stopwatch_action_reset} onClick={()=>action===true?writeResult():resetSec()}>{action===true?"Round":"Reset"}</button>
                    <button type="button" className={action===false?style.stopwatch_action_start:style.stopwatch_action_stop} onClick={()=>setAction(action===false?true:false)}>{action===false?"Start":"Stop"}</button>
                </div>
                <div className={style.clock_info}>
                    {result!==0&&result.map((res,index)=><div key={index}><span>Круг {index+1}</span><p>{res}</p></div>)}
                </div>
            </div>
        </div>
    </>);
};

export default StopWatch;