import {useState} from "react";
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
    const startScript = async() => {
        try{
        setResult({...result,loading:true,show:false});
        const userImageLink = "https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2019/11/02060940/Untitled-design-16.png?version="+Date.now();
        let startTime, endTime;
        const downloadSize = 686067*8;
        const downloadImgSrc = new Image();
        
        startTime = new Date().getTime();
        downloadImgSrc.src = userImageLink;
        downloadImgSrc.onload = async() => {
            endTime = new Date().getTime();
            displaySpeed();
        };
        downloadImgSrc.onerror = async() => {
            setResult({...result,loading:false,show:false});
        };
        const displaySpeed = () => {
            const timeDuration = (endTime - startTime) / 1000;
            const loadedBits = downloadSize * 8;
            const bps = (loadedBits / timeDuration);
            const speedInKbps = (bps / 1024);
            const speedInMbps = (speedInKbps / 1024).toFixed(0);
            const resultSpeed = Number(endTime)-Number(startTime);
            setResult({...result,loding:false,time:resultSpeed,bps:bps,kbps:speedInKbps,mbps:speedInMbps,show:true});
        };
    }
    catch(e){
        console.log(e);
    }
    }
    return(<>
        <NavbarApp lang={lang} choice="alone" />
        <div className="main_app">
            <div className="main_block_row">
                <button onClick={()=>startScript()}>Проверить</button>
                {result.loading===true&&"Loading"}
                {result.show===true&&result.mbps}
            </div>
        </div>
    </>);
};

export default InternetConnection;