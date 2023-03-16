/*jshint esversion: 6 */
import dynamic from "next/dynamic";
import "/styles/globals.css";
import "/styles/preloader.css";

const Preloader = dynamic(()=>import("/modules/preloader"),{ssr:false});

const AppModule = dynamic(()=>import('/modules/app_module'));
const DocumentResult = dynamic(()=>import("/start/document"),{loading:Preloader});

const MyApp = ({ Component, pageProps, session }) => {
    const [result,setResult] = useState(prev=>prev=false);
    return(
            <AppModule change={(res)=>setResult(prev=>prev=res)} session={session}>
                <DocumentResult>
                    {result? <Preloader/>:<Component {...pageProps} />}
                </DocumentResult>
            </AppModule>
    )
}

export default MyApp;