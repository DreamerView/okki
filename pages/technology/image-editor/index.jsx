import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/technology/image-editor/index.module.css";
import { useState,useRef,useEffect,useMemo } from "react";
import Image from "next/image";
import correctionText from "/pages/technology/image-editor/correctionDatabase.json";
import navText from "/pages/technology/image-editor/navDatabase.json";
export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const ImageEditor = ({lang}) => {
    const imageEditor = useRef();
    const params = {
        blur:0,
        brightness:100,
        contrast:100,
        grayscale:0,
        hue:0,
        invert:0,
        saturate:0,
        sepia:0,
        rotate:0
    };
    const selectParams = {
        nav:"correction",
        correction:"blur"
    };
    const [range,setRange] = useState(params);
    const [selected,setSelectChoice] = useState(selectParams);
    useEffect(()=>{
        if(imageEditor!==undefined) imageEditor.current.style.cssText = `filter:blur(${range.blur}px) brightness(${range.brightness}%) contrast(${range.contrast}%) grayscale(${range.grayscale}%) hue-rotate(${range.hue}deg) invert(${range.invert}%) saturate(${range.saturate+1}) sepia(${range.sepia}%);transform:rotate(${range.rotate}deg);`;
    },[range]);
    const navMenu = useMemo(()=>{
        return(
            <div className={style.editor_nav}>
                {navText.map((result,index)=><div key={index} onClick={()=>setSelectChoice({...selected,nav:result.nav})} className={selected.nav===result.nav?style.editor_nav_block_active:style.editor_nav_block}>
                    {result.text}
                </div>)}
            </div>
        );
    },[selected]);
    const correctionMenu = useMemo(()=>{
        return(
            selected.nav==="correction"&&<><div className={`${style.editor_block} block_animation`}>
                {correctionText.map((result,index)=>
                    <div key={index} onClick={()=>setSelectChoice({...selected,correction:result.key})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction===result.key?style.editor_block_button_icon_active:Number(params[result.key])===Number(range[result.key])?style.editor_block_button_icon:style.editor_block_button_icon_changed}>
                            <Image src={result.image} width="36" height="36" alt="icon" />
                        </div>
                        <h6>{result.text}</h6>
                    </div>
                )
                    }
                </div>
                <div className={style.editor}>
                    {correctionText.map((result,index)=>
                        selected.correction===result.key&&<div key={index} className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">{result.text}</label>
                        <input onChange={eval(result.func)} id="cowbell" type="range" min={result.min} max={result.max}  value={range[result.key]}/>
                        <input className={style.enter_number} type="tel" value={range[result.key]}  onChange={eval(result.input)} />
                    </div>
                    )}
                </div></>
        );
    },[selected,range,params]);
    return(
        <>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app">
            <div className="main_block_row">
                <div className={style.image_block}>
                    <Image ref={imageEditor} className={style.check} src="/img/editor.jpg" width={600} height={300} alt="editor" />
                </div>
                {navMenu}
                {correctionMenu}
                {selected.nav==="rotate"&&<div className={style.editor}>
                <div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Rotated</label>
                        <input onChange={(e)=>setRange({...range,rotate:e.target.value})} id="cowbell" type="range" value={range.rotate} min="0" max="360"/>
                        <input className={style.enter_number} type="tel" value={range.rotate} pattern="-?[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,rotate:e.target.value} : v))}} />
                    </div>
                    </div>}
            </div>
        </div>
        </>
    );
};

export default ImageEditor;