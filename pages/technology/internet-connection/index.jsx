import {useState} from "react";
const FastSpeedtest = require("fast-speedtest-api");
import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const InternetConnection = ({lang}) => {
    const params = {
        show:false,
        loading:false,
        time:0,
        mbps:0,
        kbps:0,
        gbps:0,
        bps:0
    };
    const [result,setResult] = useState(params);
    const checkSpeed = () => {
        let speedtest = new FastSpeedtest({
            token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
            verbose: false, // default: false
            timeout: 5000, // default: 5000
            https: false, // default: true
            urlCount: 5, // default: 5
            bufferSize: 8, // default: 8
            unit: FastSpeedtest.UNITS.Mbps // default: Bps
        });
        setResult({...result,loading:true});
        console.log(speedtest.get());
        speedtest.getSpeed().then(s => {
            setResult({...result,loading:false,show:true,mbps:s});
        }).catch(e => {
            console.error(e.message);
        });
    }
    const startScript = async() => {
        setResult({...result,loading:false});
        const userImageLink = "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
            let time_start, end_time;
            // The size in bytes
            const downloadSize = 5616998;
            const downloadImgSrc = new Image();
  
            downloadImgSrc.onload = async() => {
                end_time = new Date().getTime();
                displaySpeed();
            };
            time_start = new Date().getTime();
            downloadImgSrc.src = userImageLink;
  
            const displaySpeed = async() => {
                const timeDuration = (end_time - time_start) / 1000;
                const loadedBits = downloadSize * 8;
                
                /* Converts a number into string
                   using toFixed(2) rounding to 2 */
                const bps = (loadedBits / timeDuration).toFixed(0);
                const speedInKbps = (bps / 1024).toFixed(0);
                const speedInMbps = ((speedInKbps / 1024).toFixed(0))/100;
                const speedInGbps = (speedInMbps / 1024).toFixed(0);
                const resultSpeed = Number(end_time)-Number(time_start);
                setResult({...result,time:resultSpeed,bps:bps,kbps:speedInKbps,mbps:speedInMbps,gbps:speedInGbps,show:true});
            }
    }
    return(<>
        <NavbarApp lang={lang} choice="alone" />
        <div className="main_app">
            <div className="main_block_row">
                <button onClick={()=>checkSpeed()}>Проверить</button>
                {result.loading===true&&"Loading"}
                {result.show===true&&result.mbps}
            </div>
        </div>
    </>);
};

export default InternetConnection;