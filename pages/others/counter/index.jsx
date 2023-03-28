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
    const [loading,setLoading] = useState(false);
    const [counter,setCounter] = useState(0);
    const addCount = useCallback(() => {
        setLoading(prev=>prev=true);
        window.navigator && window.navigator.vibrate && navigator.vibrate(10);
        let promise = new Promise((resolve, reject)=>{
            resolve(new Audio(audioDownloaded).play());  
        });
        promise.then(()=>{
            setCounter(prev=>prev+1);
            setLoading(prev=>prev=false);
        })
    },[]);
    const resetCount = useCallback(() => {
        setLoading(prev=>prev=true);
        window.navigator && window.navigator.vibrate && navigator.vibrate(10);
        new Audio(audioDownloaded).play();
        setCounter(prev=>prev=0);
        setLoading(prev=>prev=false);
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
                        <button type="button" onClick={addCount} className={`${style.counter_main} disable`} disabled={loading===true?true:false}>+</button>
                        <button type="button" onClick={resetCount} className={`${style.counter_reset} disable`} disabled={loading===true?true:false}>Reset</button>
                    </div>
                </div>
            </div>
        </div>
    </>)
};

export default CounterApp;