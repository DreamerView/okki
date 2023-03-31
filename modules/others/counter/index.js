import style from "/styles/others/counter/index.module.css";
import { useState } from "react";
import Image from "next/image";

const ButtonAction = ({action,title,type,prop}) => {
    return(<button type="button" onClick={action} className={`${style[type]} ${prop}`}>{title}</button>);
};

const audioDownloaded = "data:audio/mpeg;base64,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";
let sound = new Audio(audioDownloaded);
sound.load();
const params = {
    volume:0,
    vibration:0,
    tune:0,
    color:"",
    colorChange:0,
    result:"Available"
};
const CounterModule = () => {
    const [counter,setCounter] = useState(0);
    const [limit,setLimit] = useState(0);
    const [word,setWord] = useState("Counter");
    const [setting,setSetting] = useState(params);
    const addCount = () => {
        if(setting.volume===1) {
            sound.pause();
            sound.currentTime = 0;
            sound.play();
        }
        if(setting.colorChange===1) {
            const getRandomInt = (max) => {
                return Math.floor(Math.random() * max);
            };
            let colorPick;
            switch(getRandomInt(6)) {
                case 0: colorPick="red_font";break;
                case 1: colorPick="green_font";break;
                case 2: colorPick="blue_font";break;
                case 3: colorPick="purple_font";break;
                case 4: colorPick="orange_font";break;
                case 5: colorPick="";break;
                default: colorPick="";
            };
            setSetting({...setting,color:colorPick});
        }
        setCounter(prev=>prev+1);
        limit!==0&&setLimit(prev=>prev-1);
        setSetting(limit===0?{...setting,result:"Limit reached"}:{...setting,result:"Available"});
        if(setting.vibration===1) {
            window.navigator && window.navigator.vibrate && navigator.vibrate(100);
        }
    };
    const resetCount = () => {
        if(setting.volume===1) {
            sound.pause();
            sound.currentTime = 0;
            sound.play();
        }
        if(setting.colorChange===1) {
            setSetting({...setting,color:""});
        }
        setCounter(prev=>prev=0);
        if(setting.vibration===1) {
            window.navigator && window.navigator.vibrate && navigator.vibrate(100);
        }
    };
    return(
        <>
            <div className={`${style.row} disable`}>
                <h1 className={style.counter_head}>{word}</h1>
                <div>
                    <h1 className={`${style.counter_header} ${setting.color}`}>{counter}</h1>
                    <span className={style.counter_content}>{setting.result}: {limit}</span>
                </div>
                <div className={style.counter_block}>
                    <ButtonAction type={"counter_main"} title={"+"} action={addCount} prop="disable glow" />
                    <ButtonAction type={"counter_reset"} title={"Reset"} action={resetCount} prop="disable" />
                </div>
            </div>
            <div className={`${style.row_editor} disable`}>
                <div title="Volume" className={style.row_editor_block} onClick={()=>setSetting(setting.volume===0?{...setting,volume:1}:{...setting,volume:0})}>
                    <div className={`${style.row_editor_block_icon} ${setting.volume===0?"red_background":"green_background"}`}>
                        <Image title="Volume" src={setting.volume===0?"/img/volume_off.svg":"/img/volume.svg"} alt="icon" width={32} height={32} />
                    </div>
                    <span>Volume</span>
                </div>
                <div title="Vibration" className={style.row_editor_block} onClick={()=>setSetting(setting.vibration===0?{...setting,vibration:1}:{...setting,vibration:0})}>
                    <div className={`${style.row_editor_block_icon} ${setting.vibration===0?"red_background":"blue_background"}`}>
                        <Image title="Vibration" src="/img/vibration.svg" alt="icon" width={32} height={32} />
                    </div>
                    <span>Vibration</span>
                </div>
                <div title="Vibration" className={style.row_editor_block} onClick={()=>setSetting(setting.colorChange===0?{...setting,colorChange:1}:{...setting,colorChange:0})}>
                    <div className={`${style.row_editor_block_icon} ${setting.colorChange===0?"red_background":"green_background"}`}>
                        <Image title="Vibration" src="/img/color_lens.svg" alt="icon" width={32} height={32} />
                    </div>
                    <span>Color</span>
                </div>
                <div title="Setting" className={style.row_editor_block} onClick={()=>setSetting(setting.tune===0?{...setting,tune:1}:{...setting,tune:0})}>
                    <div className={`${style.row_editor_block_icon} ${setting.tune===0?"red_background":"blue_background"}`}>
                        <Image title="Setting" src="/img/settings.svg" alt="icon" width={32} height={32} />
                    </div>
                    <span>Setting</span>
                </div>
            </div>
            {setting.tune===1&&<div className={`${style.row_editor_1} disable`}>
                <h1>Settings</h1>
                <div className={style.row_editor_1_row}>
                    <div className={style.row_editor_1_row_block}>
                        <h1>Set Count</h1>
                        <input type="tel" pattern="[0-9,.]*" onChange={(e)=>{setCounter((v) => (e.target.validity.valid ? Number(e.target.value) : v))}} value={counter} />
                    </div>
                    <div className={style.row_editor_1_row_block}>
                        <h1>Set Limit</h1>
                        <input type="tel" pattern="[0-9,.]*" onChange={(e)=>{setLimit((v) => (e.target.validity.valid ? Number(e.target.value) : v))}} value={limit} />
                    </div>
                    <div className={style.row_editor_1_row_block}>
                        <h1>Set Word</h1>
                        <input type="text" onChange={e=>setWord(prev=>prev=e.target.value)} />
                    </div>
                </div>
            </div>}
        </> 
                );
};

export default CounterModule;