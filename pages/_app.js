/*jshint esversion: 6 */
import dynamic from "next/dynamic";
import { useState } from "react";
import "/styles/colorPallete.css";
import "/styles/globals.css";
import "/styles/preloader.css";
import "/styles/animation.css";

const Preloader = dynamic(()=>import("/modules/preloader"),{ssr:false});

const AppModule = dynamic(()=>import('/modules/app_module'));
const DocumentResult = dynamic(()=>import("/start/document"),{loading:Preloader});

const MyApp = ({ Component, pageProps, session }) => {
    const [result,setResult] = useState(prev=>prev=false);
    return(
            <AppModule change={(res)=>setResult(prev=>prev=res)} session={session}>
                <DocumentResult>
                    {result? <Preloader/>:<div className="block_animation"><Component {...pageProps} /></div>}
                </DocumentResult>
            </AppModule>
    )
}

export default MyApp;