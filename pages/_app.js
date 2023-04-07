/*jshint esversion: 6 */
import dynamic from "next/dynamic";
import { useState } from "react";
import "@/styles/colorPallete.css";
import "@/styles/globals.css";
import "@/styles/preloader.css";
import "@/styles/animation.css";

const Preloader = dynamic(()=>import("@/modules/preloader"),{ssr:false});
const AppModule = dynamic(()=>import('@/modules/app_module'));

const MyApp = ({ Component, pageProps, session }) => {
    const [result,setResult] = useState(prev=>prev=false);
    return(
            <AppModule change={(res)=>setResult(prev=>prev=res)} session={session}>
                {result? <Preloader/>:<div className="block_animation"><Component {...pageProps} /></div>}
            </AppModule>
    )
}

export default MyApp;