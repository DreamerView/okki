import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/technology/image-editor/index.module.css";
import { useState,useRef,useEffect,useMemo } from "react";
import Image from "next/image";
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
        const navText = [{text:"Коррекция",nav:"correction"},{text:"Фильтры",nav:"filter"},{text:"Выпрямление",nav:"rotate"}];
        return(
            <div className={style.editor_nav}>
                {navText.map((result,index)=><div key={index} onClick={()=>setSelectChoice({...selected,nav:result.nav})} className={selected.nav===result.nav?style.editor_nav_block_active:style.editor_nav_block}>
                    {result.text}
                </div>)}
            </div>
        );
    },[selected]);
    const correctionMenu = useMemo(()=>{
        const correctionText = [
            {
                text:"Blur",
                image:"/img/blur.svg",
                key:"blur" 
            },
            {
                text:"Brightness",
                image:"/img/brightness.svg",
                key:"brightness"
            },
            {
                text:"Contrast",
                image:"/img/contrast.svg",
                key:"contrast",
            },
            {
                text:"Grayscale",
                image:"/img/contrast.svg",
                key:"grayscale"
            },
            {
                text:"Hue-rotate",
                image:"/img/hue.svg",
                key:"hue"
            },
            {
                text:"Invert",
                image:"/img/hue.svg",
                key:"invert"
            },
            {
                text:"Saturate",
                image:"/img/saturate.svg",
                key:"saturate"
            },
            {
                text:"Saturate",
                image:"/img/saturate.svg",
                key:"saturate"
            },
            {
                text:"Sepia",
                image:"/img/sepia.svg",
                key:"sepia"
            }
        ]
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
                    {selected.correction==="blur"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Blur</label>
                        <input onChange={(e)=>setRange({...range,blur:e.target.value})} id="cowbell" type="range" min={0} max={16}  value={range.blur}/>
                        <input className={style.enter_number} type="tel" value={range.blur} pattern="(16)|[0-9]\d?" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,blur:e.target.value} : v))}} />
                    </div>}
                    {selected.correction==="brightness"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Brightness</label>
                        <input onChange={(e)=>setRange({...range,brightness:e.target.value})} value={range.brightness} id="cowbell" type="range" min="0" max="200"/>
                        <input className={style.enter_number} type="tel" value={range.brightness} pattern="^([0-9]|[1-9][0-9]|[1][0-9][0-9]|20[0-0])$" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,brightness:e.target.value} : v))}} />
                    </div>}
                    {selected.correction==="contrast"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Contrast</label>
                        <input onChange={(e)=>setRange({...range,contrast:e.target.value})} value={range.contrast} id="cowbell" type="range" min="0" max="200"/>
                        <input className={style.enter_number} type="tel" value={range.contrast} pattern="^([0-9]|[1-9][0-9]|[1][0-9][0-9]|20[0-0])$" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,contrast:e.target.value} : v))}} />
                    </div>}
                    {selected.correction==="grayscale"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Grayscale</label>
                        <input onChange={(e)=>setRange({...range,grayscale:e.target.value})} value={range.grayscale} id="cowbell" type="range" min="0" max="100"/>
                        <input className={style.enter_number} type="tel" value={range.grayscale} pattern="(100)|[0-9]\d?" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,grayscale:e.target.value} : v))}} />
                    </div>}
                    {selected.correction==="hue"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Hue-rotate</label>
                        <input onChange={(e)=>setRange({...range,hue:e.target.value})} value={range.hue} id="cowbell" type="range" min="0" max="360"/>
                        <input className={style.enter_number} type="tel" value={range.hue} pattern="^([1-9][0-9]?|[12][0-9][0-9]|3[0-5][0-9]|36[0-5])$" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,hue:e.target.value} : v))}} />
                    </div>}
                    {selected.correction==="invert"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Invert</label>
                        <input onChange={(e)=>setRange({...range,invert:e.target.value})} value={range.invert} id="cowbell" type="range" min="0" max="100"/>
                        <input className={style.enter_number} type="tel" value={range.invert} pattern="(100)|[0-9]\d?" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,invert:e.target.value} : v))}} />
                    </div>}
                    {selected.correction==="saturate"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Saturate</label>
                        <input onChange={(e)=>setRange({...range,saturate:e.target.value})} value={range.saturate} id="cowbell" type="range" min="0" max="100"/>
                        <input className={style.enter_number} type="tel" value={range.saturate} pattern="(100)|[0-9]\d?" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,saturate:e.target.value} : v))}} />
                    </div>}
                    {selected.correction==="sepia"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Sepia</label>
                        <input onChange={(e)=>setRange({...range,sepia:e.target.value})} value={range.sepia} id="cowbell" type="range" min="0" max="100"/>
                        <input className={style.enter_number} type="tel" value={range.sepia} pattern="(100)|[0-9]\d?" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,sepia:e.target.value} : v))}} />
                    </div>}
                </div></>
        );
    },[selected,range]);
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