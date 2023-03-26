export default  [
    {
        text:"Blur",
        image:"/img/blur.svg",
        key:"blur",
        func:(e)=>setRange({...range,blur:e.target.value}),
        input:(e)=>{setRange((v) => (e.target.validity.valid ? {...range,blur:e.target.value} : v))},
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
        input:(e)=>{setRange((v) => (e.target.validity.valid ? {...range,contrast:e.target.value} : v))},
        pattern:"^([0-9]|[1-9][0-9]|[1][0-9][0-9]|20[0-0])$",
        min:0,
        max:200
    },
    {
        text:"Grayscale",
        image:"/img/contrast.svg",
        key:"grayscale",
        func:(e)=>setRange({...range,grayscale:e.target.value}),
        input:(e)=>{setRange((v) => (e.target.validity.valid ? {...range,grayscale:e.target.value} : v))},
        pattern:"(100)|[0-9]\d?",
        min:0,
        max:100
    },
    {
        text:"Hue-rotate",
        image:"/img/hue.svg",
        key:"hue",
        func:(e)=>setRange({...range,hue:e.target.value}),
        input:(e)=>{setRange((v) => (e.target.validity.valid ? {...range,hue:e.target.value} : v))},
        pattern:"^([1-9][0-9]?|[12][0-9][0-9]|3[0-5][0-9]|36[0-5])$",
        min:0,
        max:360
    },
    {
        text:"Invert",
        image:"/img/hue.svg",
        key:"invert",
        func:(e)=>setRange({...range,invert:e.target.value}),
        input:(e)=>{setRange((v) => (e.target.validity.valid ? {...range,invert:e.target.value} : v))},
        pattern:"(100)|[0-9]\d?",
        min:0,
        max:100
    },
    {
        text:"Saturate",
        image:"/img/saturate.svg",
        key:"saturate",
        func:(e)=>setRange({...range,saturate:e.target.value}),
        input:(e)=>{setRange((v) => (e.target.validity.valid ? {...range,saturate:e.target.value} : v))},
        pattern:"(100)|[0-9]\d?",
        min:0,
        max:100
    },
    {
        text:"Sepia",
        image:"/img/sepia.svg",
        key:"sepia",
        func:(e)=>setRange({...range,sepia:e.target.value}),
        input:(e)=>{setRange((v) => (e.target.validity.valid ? {...range,sepia:e.target.value} : v))},
        pattern:"(100)|[0-9]\d?",
        min:0,
        max:100
    }
];