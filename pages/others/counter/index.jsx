import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/others/counter/index.module.css";
import { useState,useCallback } from "react";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const audioDownloaded = "data:audio/mpeg;base64,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";

const CounterApp = ({lang}) => {
    const [counter,setCounter] = useState(0);
    const addCount = useCallback((e) => {
        e.preventDefault();
        window.navigator && window.navigator.vibrate && navigator.vibrate(10);
        setCounter(prev=>prev+1);
        const sound = new Audio();
        sound.src = audioDownloaded;
        sound.currentTime = 0;
        sound.play();
    },[]);
    const resetCount = useCallback((e) => {
        e.preventDefault();
        window.navigator && window.navigator.vibrate && navigator.vibrate(100);
        setCounter(prev=>prev=0);
        const sound = new Audio();
        sound.src = audioDownloaded;
        sound.currentTime = 0;
        sound.play();
    },[]);
    return(<>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app ">
            <div className="main_block_row">
                <div className={`${style.row} disable`}>
                    <h1 className={style.counter_head}>Counter</h1>
                    <div>
                    <h1 className={style.counter_header}>{counter}</h1>
                    </div>
                    <div className={style.counter_block}>
                        <button type="button" onClick={addCount} className={`${style.counter_main} disable glow`}>+</button>
                        <button type="button" onClick={resetCount} className={`${style.counter_reset} disable`}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default CounterApp;