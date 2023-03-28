import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/others/counter/index.module.css";
import { useState,useCallback } from "react";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const audioDownloaded = "/audio/click-button.mp3";

const CounterApp = ({lang}) => {
    const [counter,setCounter] = useState(0);
    const addCount = useCallback(() => {
        setCounter(prev=>prev+1),new Audio(audioDownloaded).play();
    },[]);
    const resetCount = useCallback(() => {
        setCounter(prev=>prev=0),new Audio(audioDownloaded).play();
    },[]);
    return(<>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app ">
            <div className="main_block_row">
                <div className={`${style.row} disable`}>
                    <h1>Counter</h1>
                    <div>
                    <h1 className={style.counter_header}>{counter}</h1>
                    </div>
                    <div className={style.counter_block}>
                        <button type="button" onClick={addCount} className={style.counter_main}>+</button>
                        <button type="button" onClick={resetCount} className={style.counter_reset}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default CounterApp;