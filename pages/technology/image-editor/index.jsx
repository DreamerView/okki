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
    const [range,setRange] = useState({
        blur:0,
        brightness:100,
        contrast:100,
        grayscale:0,
        hue:0,
        invert:0,
        saturate:1,
        sepia:0
    });
    const [rotate,setRotate] = useState(0);
    const [selected,setSelectChoice] = useState("blur");
    const [nav,setNav] = useState('correction');
    useEffect(()=>{
        imageEditor.current.style.filter = `blur(${range.blur}px) brightness(${range.brightness}%) contrast(${range.contrast}%) grayscale(${range.grayscale}%) hue-rotate(${range.hue}deg) invert(${range.invert}%) saturate(${range.saturate}) sepia(${range.sepia}%)`;
    },[range]);
    useEffect(()=>{
        imageEditor.current.style.transform = `rotate(${rotate}deg)`;
    },[rotate])
    return(
        <>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app">
            <div className="main_block_row">
                <div className={style.image_block}>
                    <Image ref={imageEditor} className={style.check} src="/img/editor.jpg" width={600} height={400} alt="editor" />
                </div>
                <div className={style.editor_nav}>
                    <div onClick={()=>setNav(prev=>prev="correction")} className={nav==="correction"?style.editor_nav_block_active:style.editor_nav_block}>
                        Коррекция
                    </div>
                    <div onClick={()=>setNav(prev=>prev="filter")} className={nav==="filter"?style.editor_nav_block_active:style.editor_nav_block}>
                        Фильтры
                    </div>
                    <div onClick={()=>setNav(prev=>prev="rotate")} className={nav==="rotate"?style.editor_nav_block_active:style.editor_nav_block}>
                        Выпрямление
                    </div>
                </div>
                {nav==="correction"&&<><div className={style.editor_block}>
                    <div onClick={()=>setSelectChoice(prev=>prev='blur')} className={`${style.editor_block_button} anim_hover`}>
                        <div className={selected==="blur"?style.editor_block_button_icon_active:style.editor_block_button_icon}>
                            <Image src="/img/blur.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Blur</h6>
                    </div>
                    <div onClick={()=>setSelectChoice(prev=>prev='brightness')} className={`${style.editor_block_button} anim_hover`}>
                        <div className={selected==="brightness"?style.editor_block_button_icon_active:style.editor_block_button_icon}>
                            <Image src="/img/brightness.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Brightness</h6>
                    </div>
                    <div onClick={()=>setSelectChoice(prev=>prev='contrast')} className={`${style.editor_block_button} anim_hover`}>
                        <div className={selected==="contrast"?style.editor_block_button_icon_active:style.editor_block_button_icon}>
                            <Image src="/img/contrast.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Contrast</h6>
                    </div>
                    <div onClick={()=>setSelectChoice(prev=>prev='grayscale')} className={`${style.editor_block_button} anim_hover`}>
                        <div className={selected==="grayscale"?style.editor_block_button_icon_active:style.editor_block_button_icon}>
                            <Image src="/img/contrast.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Grayscale</h6>
                    </div>
                    <div onClick={()=>setSelectChoice(prev=>prev='hue')} className={`${style.editor_block_button} anim_hover`}>
                        <div className={selected==="hue"?style.editor_block_button_icon_active:style.editor_block_button_icon}>
                            <Image src="/img/hue.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Hue-rotate</h6>
                    </div>
                    <div onClick={()=>setSelectChoice(prev=>prev='invert')} className={`${style.editor_block_button} anim_hover`}>
                        <div className={selected==="invert"?style.editor_block_button_icon_active:style.editor_block_button_icon}>
                            <Image src="/img/hue.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Invert</h6>
                    </div>
                    <div onClick={()=>setSelectChoice(prev=>prev='saturate')} className={`${style.editor_block_button} anim_hover`}>
                        <div className={selected==="saturate"?style.editor_block_button_icon_active:style.editor_block_button_icon}>
                            <Image src="/img/saturate.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Saturate</h6>
                    </div>
                    <div onClick={()=>setSelectChoice(prev=>prev='sepia')} className={`${style.editor_block_button} anim_hover`}>
                        <div className={selected==="sepia"?style.editor_block_button_icon_active:style.editor_block_button_icon}>
                            <Image src="/img/sepia.svg" width="36" height="36" alt="icon" />
                        </div>
                        <h6>Sepia</h6>
                    </div>
                </div>
                <div className={style.editor}>
                    {selected==="blur"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Blur</label>
                        <input onChange={(e)=>setRange({...range,blur:e.target.value})} id="cowbell" type="range" defaultValue={range.blur} value={range.blur} min="0" max="16"/>
                        <input className={style.enter_number} type="tel" value={range.blur} pattern="[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,blur:e.target.value} : v))}} />
                    </div>}
                    {selected==="brightness"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Brightness</label>
                        <input onChange={(e)=>setRange({...range,brightness:e.target.value})} value={range.brightness} id="cowbell" type="range" defaultValue={range.brightness} min="0" max="200"/>
                        <input className={style.enter_number} type="tel" value={range.brightness} pattern="[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,brightness:e.target.value} : v))}} />
                    </div>}
                    {selected==="contrast"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Contrast</label>
                        <input onChange={(e)=>setRange({...range,contrast:e.target.value})} value={range.contrast} id="cowbell" type="range" defaultValue={range.contrast} min="0" max="200"/>
                        <input className={style.enter_number} type="tel" value={range.contrast} pattern="[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,contrast:e.target.value} : v))}} />
                    </div>}
                    {selected==="grayscale"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Grayscale</label>
                        <input onChange={(e)=>setRange({...range,grayscale:e.target.value})} value={range.grayscale} id="cowbell" type="range" defaultValue={range.grayscale} min="0" max="100"/>
                        <input className={style.enter_number} type="tel" value={range.grayscale} pattern="[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,grayscale:e.target.value} : v))}} />
                    </div>}
                    {selected==="hue"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Hue-rotate</label>
                        <input onChange={(e)=>setRange({...range,hue:e.target.value})} value={range.hue} id="cowbell" type="range" defaultValue={range.hue} min="0" max="360"/>
                        <input className={style.enter_number} type="tel" value={range.hue} pattern="[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,hue:e.target.value} : v))}} />
                    </div>}
                    {selected==="invert"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Invert</label>
                        <input onChange={(e)=>setRange({...range,invert:e.target.value})} value={range.invert} id="cowbell" type="range" defaultValue={range.invert} min="0" max="100"/>
                        <input className={style.enter_number} type="tel" value={range.invert} pattern="[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,invert:e.target.value} : v))}} />
                    </div>}
                    {selected==="saturate"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Saturate</label>
                        <input onChange={(e)=>setRange({...range,saturate:e.target.value})} value={range.saturate} id="cowbell" type="range" defaultValue={range.saturate} min="0" max="100"/>
                        <input className={style.enter_number} type="tel" value={range.saturate} pattern="[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,saturate:e.target.value} : v))}} />
                    </div>}
                    {selected==="sepia"&&<div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Sepia</label>
                        <input onChange={(e)=>setRange({...range,sepia:e.target.value})} value={range.sepia} id="cowbell" type="range" defaultValue={range.sepia} min="0" max="100"/>
                        <input className={style.enter_number} type="tel" value={range.sepia} pattern="[0-9]*" onChange={(e)=>{setRange((v) => (e.target.validity.valid ? {...range,sepia:e.target.value} : v))}} />
                    </div>}
                </div></>}
                {nav==="rotate"&&<div className={style.editor}>
                <div className={`${style.editor_b} block_animation`}>
                        <label htmlFor="cowbell">Rotated</label>
                        <input onChange={(e)=>setRotate(prev=>prev=e.target.value)} id="cowbell" type="range" defaultValue={rotate} value={rotate} min="0" max="360"/>
                        <input className={style.enter_number} type="tel" value={rotate} pattern="[0-9]*" onChange={(e)=>{setRotate((v) => (e.target.validity.valid ? e.target.value : v))}} />
                    </div>
                    </div>}
            </div>
        </div>
        </>
    );
};

export default ImageEditor;