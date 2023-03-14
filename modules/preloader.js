import Head from "next/head";
import translate from "/translate/ux/loading_page";
import { useState,useEffect } from "react";
import { useRouter } from "next/router";

const Preloader = () => {
    const [timer,setTimer] = useState(false),{locale} = useRouter();
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setTimer((prev)=>prev=true);
        },[150]);
        return ()=>clearTimeout(timer);
    },[]);
    return(
        <>
            <Head>
                <title>{translate["loading"][locale]}</title>
            </Head>
            <div className="main__preloader">
                {timer&&
                <svg className="main__preloader_pic" xmlns="http://www.w3.org/2000/svg" style={{ margin: "auto" }} width="200" height="200" display="block" preserveAspectRatio="xMidYMid" viewBox="0 0 100 100">
                    <path d="M10 50a40 40 0 0080 0 40 42 0 01-80 0"><animateTransform attributeName="transform" dur="1s" keyTimes="0;1" repeatCount="indefinite" type="rotate" values="0 50 51;360 50 51"/></path>
                </svg>}
            </div>
        </>
    )
};

export default Preloader;