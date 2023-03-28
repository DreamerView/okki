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
        rotate:0,
        scaleX:1,
        scaleY:1
    };
    const selectParams = {
        nav:"correction",
        correction:"blur",
    };
    const [range,setRange] = useState(params);
    const [selected,setSelectChoice] = useState(selectParams);
    useEffect(()=>{
        if(imageEditor!==undefined) imageEditor.current.style.cssText = `filter:blur(${range.blur}px) brightness(${range.brightness}%) contrast(${range.contrast}%) grayscale(${range.grayscale}%) hue-rotate(${range.hue}deg) invert(${range.invert}%) saturate(${range.saturate+1}) sepia(${range.sepia}%);transform:rotate(${range.rotate}deg) scaleX(${range.scaleX}) scaleY(${range.scaleY});`;
    },[range]);
    const navMenu = useMemo(()=>{
        const navText = [{text:"Коррекция",nav:"correction"},{text:"Фильтры",nav:"filter"},{text:"Выпрямление",nav:"rotate"},{text:"Параметры",nav:"params"}];
        return(
            <div className={style.editor_nav}>
                {navText.map((result,index)=><div key={index} onClick={()=>setSelectChoice({...selected,nav:result.nav})} className={selected.nav===result.nav?style.editor_nav_block_active:style.editor_nav_block}>
                    {result.text}
                </div>)}
            </div>
        );
    },[selected]);
    const correctionMenu = useMemo(()=>{
        const param = {
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
        const correctionText = [
            {
                text:"Blur",
                image:"/img/blur.svg",
                key:"blur",
                func:(e)=>setRange({...range,blur:e.target.value}),
                input:(e)=>setRange((v) => (e.target.validity.valid ? {...range,blur:e.target.value} : v)),
                pattern:"(16)|[0-9]\d?",
                min:0,
                max:16
            },
            {
                text:"Brightness",
                image:"/img/brightness.svg",
                key:"brightness",
                func:(e)=>setRange({...range,brightness:e.target.value}),
                input:(e)=>setRange((v) => (e.target.validity.valid ? {...range,brightness:e.target.value} : v)),
                pattern:"^([0-9]|[1-9][0-9]|[1][0-9][0-9]|20[0-0])$",
                min:0,
                max:200
            },
            {
                text:"Contrast",
                image:"/img/contrast.svg",
                key:"contrast",
                func:(e)=>setRange({...range,contrast:e.target.value}),
                input:(e)=>setRange((v) => (e.target.validity.valid ? {...range,contrast:e.target.value} : v)),
                pattern:"^([0-9]|[1-9][0-9]|[1][0-9][0-9]|20[0-0])$",
                min:0,
                max:200
            },
            {
                text:"Grayscale",
                image:"/img/contrast.svg",
                key:"grayscale",
                func:(e)=>setRange({...range,grayscale:e.target.value}),
                input:(e)=>setRange((v) => (e.target.validity.valid ? {...range,grayscale:e.target.value} : v)),
                pattern:"(100)|[0-9]\d?",
                min:0,
                max:100
            },
            {
                text:"Hue-rotate",
                image:"/img/hue.svg",
                key:"hue",
                func:(e)=>setRange({...range,hue:e.target.value}),
                input:(e)=>setRange((v) => (e.target.validity.valid ? {...range,hue:e.target.value} : v)),
                pattern:"^([1-9][0-9]?|[12][0-9][0-9]|3[0-5][0-9]|36[0-5])$",
                min:0,
                max:360
            },
            {
                text:"Invert",
                image:"/img/hue.svg",
                key:"invert",
                func:(e)=>setRange({...range,invert:e.target.value}),
                input:(e)=>setRange((v) => (e.target.validity.valid ? {...range,invert:e.target.value} : v)),
                pattern:"(100)|[0-9]\d?",
                min:0,
                max:100
            },
            {
                text:"Saturate",
                image:"/img/saturate.svg",
                key:"saturate",
                func:(e)=>setRange({...range,saturate:e.target.value}),
                input:(e)=>setRange((v) => (e.target.validity.valid ? {...range,saturate:e.target.value} : v)),
                pattern:"(100)|[0-9]\d?",
                min:0,
                max:100
            },
            {
                text:"Sepia",
                image:"/img/sepia.svg",
                key:"sepia",
                func:(e)=>setRange({...range,sepia:e.target.value}),
                input:(e)=>setRange((v) => (e.target.validity.valid ? {...range,sepia:e.target.value} : v)),
                pattern:"(100)|[0-9]\d?",
                min:0,
                max:100
            }
        ];
        return(
            selected.nav==="correction"&&<><div className={`${style.editor_block} block_animation`}>
                {correctionText.map((result,index)=>
                    <div key={index} onClick={()=>setSelectChoice({...selected,correction:result.key})} className={`${style.editor_block_button} `}>
                        <div className={selected.correction===result.key?style.editor_block_button_icon_active:Number(param[result.key])===Number(range[result.key])?style.editor_block_button_icon:style.editor_block_button_icon_changed}>
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
                        <input onChange={result.func} id="cowbell" type="range" min={result.min} max={result.max}  value={range[result.key]}/>
                        <input className={style.enter_number} pattern={result.pattern} type="tel" value={range[result.key]}  onChange={result.input} />
                    </div>
                    )}
                </div></>
        );
    },[selected,range]);
    return(
        <>
        <NavbarApp lang={lang} choice="alone"/>
        <div className="main_app">
            <div className="main_block_row">
                <div className={style.image_editor}>
                <div className={style.image_block_port}>
                    <Image ref={imageEditor} className={style.check_port} src="/img/editor_port.jpg" width={600} height={300} alt="editor" />
                </div>
                </div>
                {navMenu}
                {correctionMenu}
                {selected.nav==="rotate"&&<div className={`${style.editor} block_animation`}>
                <div className={style.editor_panel}>
                    <div className={style.editor_panel_row}><div onClick={()=>setRange({...range,rotate:range.rotate-90})} className={style.editor_panel_block}><Image src="/img/rotate_left.svg" width={36} height={36} alt="icon"/></div><h6>Налево</h6></div>
                    <div className={style.editor_panel_row}><div onClick={()=>setRange({...range,scaleX:range.scaleX===1?-1:1})} className={style.editor_panel_block}><Image src="/img/flip.svg" width={36} height={36} alt="icon"/></div><h6>Горизонтальная</h6></div>
                    <div className={style.editor_panel_row}><div onClick={()=>setRange({...range,scaleY:range.scaleY===1?-1:1})} className={style.editor_panel_block}><Image className={style.top} src="/img/flip.svg" width={36} height={36} alt="icon"/></div><h6>Вертикальная</h6></div>
                    <div className={style.editor_panel_row}><div onClick={()=>setRange({...range,rotate:range.rotate+90})} className={style.editor_panel_block}><Image src="/img/rotate_right.svg" width={36} height={36} alt="icon"/></div><h6>Направо</h6></div>
                </div>
                <div className={`${style.editor_b}`}>
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