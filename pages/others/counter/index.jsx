import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/others/counter/index.module.css";
import { useState,useCallback,useRef } from "react";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const audioDownloaded = "/audio/click-button.mp3";

const CounterApp = ({lang}) => {
    const audioControl = useRef();
    const [counter,setCounter] = useState(0);
    const addCount = useCallback((e) => {
        e.preventDefault();
        window.navigator && window.navigator.vibrate && navigator.vibrate(10);
        setCounter(prev=>prev+1);
        const player = audioControl.current;
        player.currentTime = 0;
        player.play();
        setTimeout(function(){
            player.pause();
            player.currentTime = 0;
        }, 500);
    },[]);
    const resetCount = useCallback((e) => {
        e.preventDefault();
        window.navigator && window.navigator.vibrate && navigator.vibrate(100);
        setCounter(prev=>prev=0);
        const player = audioControl.current;
        player.play();
        setTimeout(function(){
            player.pause();
            player.currentTime = 0;
        }, 100);
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
                <audio ref={audioControl} src={audioDownloaded} controls />
            </div>
        </div>
    </>)
};

export default CounterApp;