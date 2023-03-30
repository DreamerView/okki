import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/others/counter/index.module.css";
import { useState,useCallback } from "react";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const audioDownloaded = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjMwLjEwMQAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAUAAAI+gAiIiIiLi4uLi46Ojo6OkVFRUVFUVFRUVFdXV1dXWhoaGhodHR0dHR/f39/f4uLi4uLl5eXl5eioqKioq6urq6uurq6urrFxcXFxdHR0dHR3d3d3d3o6Ojo6PT09PT0//////8AAAAATGF2YzU5LjQyAAAAAAAAAAAAAAAAJAJAAAAAAAAACPol/ujUAAAAAAAAAAAAAAAAAAAAAP/7EGQAD/BvADoAABgQC0L3QAQCTAIYAx4UAYAISAAjwoQgAOLAALUmfMN/Exh+h2g3/peimGEHZ+kLaQgHpPfgRfb83/YAM1/8MPgHzlDhDw/id8och/6SA66c4fWsPvAIBx5Ac8aG//sSZAQAALQWVQYc4AAOAHqgwQgAAkBZfBgigABADy9DAiAAef/iIAB/hIJbu8oCH+IPAxen6GaAf8CO+CF34Yb/z+QR4Hffsc/+ccQ/+Gfygk8vy9f/7k/6mD//IIDCP0E63+pDJBYC//sQZAMBMKQK4acgQAIOoAwc4AABAjQHcwEEYCgtgG5QEIgEYWJu74+GbX2AsJ/44wsXNrQAhAAAFQ0syJl/e3W1Qw0GAg0ayYTT8uCfxzm5hGkNmUgAFiVPJWRX9NVxQZ8rvbw+MYX/+xJkBIMQmBDbgEEYsA/kK0AAI3hCaCdrBZgBgDuAbFQQCAA5bdcwrA7//oSVxH/xf//zlsOHrsatWBqyzF/cIiKxPPMd8Qc4qtxjhELP4lQDoRu54y64JW//9a3lb5Ub+2wATAQGnrT/+xBkBIMwrQnZQSMJuA5AGsAYQwACMBtaB6RgSDaAaxRwiADaXUOUZ4SBUHAXTC1QSHA6mHALQRNp63Rn/9JCAshIaV0osxyEAzCzTtYq/mP0PKicbD8/NL0r//+aQkFmDCOkjLagAf/7EmQFA/CNBlaB6TAACoCqoAwCEQHkE18EmCCoPgGqAIEgAKVJFGMCfY1IcWIrvFn0E1lndAchkBIUHwTug7UKXrvbkQAjsGDbhsa0TXrV6Kv7t6EOgPDq4iL6Ls/LFU9++fUBnhgAB//7EGQKDzB5A1WBiRgCDeBqmAwjAQGkDUgHsEAoNgCoAGAAAIEh4TUPFm8W6k6MEWIxIZ8aZ6394N0DOIkHj08JVO53nf9ksgzixgZKw8jAVNWO8s7/0BQQ9CRd3iI9U/Zs8sryCQ0H//sSZBAP8HcDyQHsMAAOgEjgCEIAAeQA+gCAAAApAR8AEQgAbN+R21Hvr+WBrEVQ8whQE6s7/8SncFYCAAAD///26xRRtgAARTWOAu0NRmUnQroi09VMQU1FMy4xMDB";

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