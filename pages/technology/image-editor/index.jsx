import dynamic from "next/dynamic";
import NavPreloader from "/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/technology/image-editor/index.module.css";
import { useState,useRef,useEffect } from "react";
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
        imageEditor.current.style.cssText = `filter:blur(${range.blur}px) brightness(${range.brightness}%) contrast(${range.contrast}%) grayscale(${range.grayscale}%) hue-rotate(${range.hue}deg) invert(${range.invert}%) saturate(${range.saturate+1}) sepia(${range.sepia}%);transform:rotate(${range.rotate}deg)`;
    },[range]);
    return(
        <>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app">
            <div className="main_block_row">
                <div className={style.image_block}>
                    <Image ref={imageEditor} className={style.check} src="/img/editor.jpg" width={600} height={300} alt="editor" />
                </div>
                <div className={style.editor_nav}>
                    <div onClick={()=>setSelectChoice({...selected,nav:"correction"})} className={selected.nav==="correction"?style.editor_nav_block_active:style.editor_nav_block}>
                        Коррекция
                    </div>
                    <div onClick={()=>setSelectChoice({...selected,nav:"filter"})} className={selected.nav==="filter"?style.editor_nav_block_active:style.editor_nav_block}>
                        Фильтры
                    </div>
                    <div onClick={()=>setSelectChoice({...selected,nav:"rotate"})} className={selected.nav==="rotate"?style.editor_nav_block_active:style.editor_nav_block}>
                        Выпрямление
                    </div>
                </div>
                {selected.nav==="correction"&&<><div className={`${style.editor_block} block_animation`}>
                    <div onClick={()=>setSelectChoice({...selected,correction:'blur'})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction==="blur"?style.editor_block_button_icon_active:Number(params.blur)===Number(range.blur)?style.editor_block_button_icon:style.editor_block_button_icon_changed}>
                            <Image src="/img/blur.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Blur</h6>
                    </div>
                    <div onClick={()=>setSelectChoice({...selected,correction:'brightness'})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction==="brightness"?style.editor_block_button_icon_active:Number(params.brightness)!==Number(range.brightness)?style.editor_block_button_icon_changed:style.editor_block_button_icon}>
                            <Image src="/img/brightness.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Brightness</h6>
                    </div>
                    <div onClick={()=>setSelectChoice({...selected,correction:'contrast'})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction==="contrast"?style.editor_block_button_icon_active:Number(params.contrast)!==Number(range.contrast)?style.editor_block_button_icon_changed:style.editor_block_button_icon}>
                            <Image src="/img/contrast.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Contrast</h6>
                    </div>
                    <div onClick={()=>setSelectChoice({...selected,correction:'grayscale'})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction==="grayscale"?style.editor_block_button_icon_active:Number(params.grayscale)!==Number(range.grayscale)?style.editor_block_button_icon_changed:style.editor_block_button_icon}>
                            <Image src="/img/contrast.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Grayscale</h6>
                    </div>
                    <div onClick={()=>setSelectChoice({...selected,correction:'hue'})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction==="hue"?style.editor_block_button_icon_active:Number(params.hue)!==Number(range.hue)?style.editor_block_button_icon_changed:style.editor_block_button_icon}>
                            <Image src="/img/hue.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Hue-rotate</h6>
                    </div>
                    <div onClick={()=>setSelectChoice({...selected,correction:'invert'})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction==="invert"?style.editor_block_button_icon_active:Number(params.invert)!==Number(range.invert)?style.editor_block_button_icon_changed:style.editor_block_button_icon}>
                            <Image src="/img/hue.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Invert</h6>
                    </div>
                    <div onClick={()=>setSelectChoice({...selected,correction:'saturate'})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction==="saturate"?style.editor_block_button_icon_active:Number(params.saturate)!==Number(range.saturate)?style.editor_block_button_icon_changed:style.editor_block_button_icon}>
                            <Image src="/img/saturate.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Saturate</h6>
                    </div>
                    <div onClick={()=>setSelectChoice({...selected,correction:'sepia'})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction==="sepia"?style.editor_block_button_icon_active:Number(params.sepia)!==Number(range.sepia)?style.editor_block_button_icon_changed:style.editor_block_button_icon}>
                            <Image src="/img/sepia.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Sepia</h6>
                    </div>
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
                </div></>}
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