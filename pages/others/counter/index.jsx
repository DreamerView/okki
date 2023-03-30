import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/others/counter/index.module.css";
import { useState,useCallback } from "react";

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const audioDownloaded = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU5LjMwLjEwMQAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAUAAARtgApKSkpUlJSUlJqampqan5+fn5+kJCQkJCkpKSkpLOzs7Ozubm5ubm/v7+/v8XFxcXFy8vLy8vR0dHR0dbW1tbW3Nzc3Nzi4uLi4ujo6Ojo7u7u7u709PT09Pr6+vr6//////8AAAAATGF2YzU5LjQyAAAAAAAAAAAAAAAAJAJAAAAAAAAAEbZc/4rgAAAAAAAAAAAAAAAAAAAAAP/7oEQAD/AAAH+AAAAIAAAP8AAAAQBYAygUAAAgAAA/woAABP/4gTMyN0SAJjMTMA4FAWAgAAO9/A5EA2Bz9fw7CA3FbPPDI/Wo6iDTgZ0CLjXWpSjcAAYBnEWyNK4BxwBQOQYiH1rXgYIQBigwCgQUcRx/Q3iwF4LJAGAAtwas/+g8tDPiC4gmDeAQQPf//kAIItAhhECDk+n///5poLdDMy///35SA5LPLDLZALJKHQcBgMAM0twVYsf0yMjnEp7e96CChyEgtO7qZNP0GeS4mBKLU1dHXBaA5hoTCU/TfzQcA9DRZf/+nucLgwgTstNP//3oJnCgtND///3ZNTOXGcuEpNXdy1tULExSL9bVKmRI92U1AGRDJBJUgiAWDlQeMaC0fioSweYiAmICCAwxInQHqUIAHRITyAN4ggO5w0IGAR2SLvtlY6tQwYEFBznDQcaAIwmCwhpkbvsPUYfhr5MQgtoKoloPY+8DNToJmkpmmQ+5ECZSl72UTjvK4qRBx/lEflkA5wiEuGu+OSe06asYOCO41ZrbvuvAVDOXoo/dNb/lPk/9rOxv8a+UNOpD+rHcsb8NNzjj/v3lL8uVv+xxW9i8ofBrk5bw+Izy93ij8GVYpP1LEpkVJG33deUTkbaZZjcU5bqXX4gBcC15C3ORKneN33mc2ncduEXtTuq+GdBN1K1LP//7wGTxgAQIT89+aoAAXKn6jce0kCGNmXf5vSIDWbLvfzOEQH6v/+CH/+6Kzr897MxZpmaaNuEoCEyMPOJQg59QQRxOzD5rNwlAYWRMrSP23eQrJrGfQOmvTF0FbkJ9ump4pKIfexf5mNK4Gtv9GJfHnEooBcpgcVnIYg24/Edk8NOR2HHcgJ+KSV2K8g7y9u7cnNzleepnDsU0xLNRilzt1opOSu3MU8nxmYxP9y/dPbjff7rC9T36etzv18cdUUFSGxSWKTn1P/DOBLdjle3//zBqOX6s67h/95Xr28N581+5f3P71JSxeX/SXqucjpPvZ27dWY5lN549yzsVT3/9Srz9hjYkFRpOCdBOZt4ZsjyLBBwxMNSRLF/WNQ071qGamiADjigAQlDo1NUamjUIgDiYkm/qraHZps6k6hz/mt6VbNZDn/7nIcaul/odU1X6Oo1Gpz/6wVDWoGgp9ZuxSIiURdHcDVX/EG5sXjRSByqHpLiykpHyHQSaCxWg1165iLXiw8kdPDMDo4QTBYaq/V/+vNcRf6rrqtf+zc7OOlyTf//5+ev6rj9mhvlWckVFRxQNgbCqiIGvxKCvxcFfiIGntPIa3O7WFjYce/zkCebJaD7gEgVTBNwMKhMGxwTAkHz/LK6hY3aWymIvXEIZDAkJhTIxxI5gdSQisi9xMVRRQcJoRUHhYNHbWaB4eJCIedWxH7T3/8gWLD3ETYql8BAZFKHKuaEBJoyW1OKjIxGWGgDTbUi/ifhr+rh9AssEzeyMXiRjJ1GS2y4NWQBGc2IgBHXE5xRUf//lYpSMYytev/9233///9yoZ8SCowRKNFt66FWoaFQCatEAF9BBGh3MxJTaMI5jqaiFHQkUjGgPs0tuDO3XqkXMlq6PMLSIUQssLxfJvHAQhodSHSZD1l8qsFOAxjaGszXTtNLXM5dWMn/9kOeWzA1maPaJltrDpVv7+DhFQcCM//uQZOyAAy8/339k4ABlKAwP56ABCwRLa6YxIMFDra28gIrglUEocvdUVdsqgaSJEu7kEABevEihNB8CpVZtKy7rlv6fN8Xs7hKWufM73mv/9aZZI5J5w5MidJISrStlE2fVecK0dShjL1Qy0Pfb/1bRDmBM4J4rr4sz71/6WdXl6ARodXQTISNlqBtKswdn+iEWiVkyJUUeyHOdGpTGEFOCFPYh3CiVXzPyfaHfVryj5jV6qXysR3Zf/68UVjGJa3uylLMxxJwQo5xjv3ngnRyLMbtoQrKKjoCpZ6z9ESxknFpSTEusu6//QUzAbsxHP/yjbWPqzMpxuLVI2Pcpsp9ql0+Xb2gI58P/zL7NUtICcRf81Qbt7EndqkJQKAyRgsIYfCGFQHEowGg2NOJCrKIyyLJ4bhJMEVGhkuLnE2AZrgqVdLoduFXYbdxcDtuI7GsPtOAccYX+j2IR0vzDRjYICAZWyQvB82BMJSclQQnlN7LFzXRMQxEPIxxE2GzrBuf/MwkQg5cmarciwan2VW1aDp8F1M/3f9QI9O7siG5K//uAZPEAA1E/WvnjFbhY6AtPMMJ+CfT9Z+eMT2EMH6v0dIzY23AoC1MhHEpR5Sm8TU1xkWSQWDk6RNPdGCZ7Ss5aB2VkkSy5SzryLTMcU1Ua+l+sndne+l9vZ7er+rM5lKUUD6ip703jVOMgTzMzDLFkrjcA+tXulWOMO1S7CXLXPLQ9mhCmDhoesaedsLI6Xn+6/L4sZW1y8r69aaXpEzFzxJgDubVhpMsMBdj3pu/pbVbQKAOGlHZjR/SSNhlH2XhXnMTY5EPMIW40GHmiwjXBBTlOttLnCsI+JEPECuIdtMzL/9oa/EOXyc5sfKZ+Wx9y3sVeH5Hz1hwHgoePDlaq9vu+hQBBMLozLda2mhXTDAdsAvOWYNvVhYwDhJ4uCrxUAgkRPJFWE1pEgZFIuKXYuTVllRQoJk2dniYEiyAE/41/pApVUNjIq2yQCGpOQ7csNJUj40q4Gg4DIBhoQ2MqlzQKoKeKi3g1fJH/+3Bk6oACMhDX4YkZyD6mKu0kI38J0P1j57BHISYYbHw2DGwrX4sdSAirjRILCVIcbIXiBE9Qjdv2fFtbq/70oydnQQS6MqoRyJpOIMkp+VidNia6YHZXG4Fw0lTa0GQN1NVYhEYMynQrn6dsqq6KW6HOx/TVERP7UaiIyuxW/b7b6oWoWcPR0jKDH9EdA2hVdSMnG0i2DeJ0M1vHAuimK5wbH5VH0e21yZ+F3u2H4fHQKCPJJNofCp2KNG4eDRNwd9THubKpZ5HUAj6wQMOhWRCuLPyzTuxDREQNYxKqyRuFEgFfK4ESQ5xffEZjYVwxtyJUDhnRv2DA+ARQsRY9o4YDRpw0y6m/10jEvU9x6jbNfBq9IGtvEupLLKmwArSei0NJ0n8Oo0V2To3zFRyINcbzmNUSY6St//uAZOaAAok8WPnmGxg+oVr/DCghCPxNV+wkxuEpH2p9lIjYsYVVI6WoURHlA01LAlFQVBo8Jfwl52BXY0j1uQoHEQ8GqSVyNAD6h4tfSHPkOq9eIdHYTpoxBLEYGE1Cph/PscpNhgZUHaMx4dUEgaHnSf/5XlVMQU1FMy4xMDBVVVVVVVVQEAAACPHGFaT5mlalTEFNRTMuMTAw";

const CounterApp = ({lang}) => {
    const [counter,setCounter] = useState(0);
    const addCount = (e) => {
        e.preventDefault();
        window.navigator && window.navigator.vibrate && navigator.vibrate(10);
        setCounter(prev=>prev+1);
        const sound = new Audio();
        sound.src = audioDownloaded;
        sound.currentTime = 0;
        sound.play();
    };
    const resetCount = (e) => {
        e.preventDefault();
        window.navigator && window.navigator.vibrate && navigator.vibrate(100);
        setCounter(prev=>prev=0);
        const sound = new Audio();
        sound.src = audioDownloaded;
        sound.currentTime = 0;
        sound.play();
    };
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