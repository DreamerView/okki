/*jshint esversion: 6 */
import React,{memo,useState,useEffect} from "react";
import Link from "next/link";
import nav_translate from "/translate/services/all_translate";
import ux from "/translate/ux/action";
import useTranslateText from "/start/translate";
import { useSelector } from "react-redux";
import Image from "next/image";
import { useRouter } from 'next/router';


const NavbarApp = ({to,choice,with_save,save_name,mode,lang}) => {
    const router = useRouter();
    const headerHeight= useSelector(state=>state.headerHeight);
    // const lang = useTranslateText();
    const result = to!=='undefined'?to:[{}];
    const [scrollResult,setScrollResult] = useState('');
    useEffect(() => {
        const handleScroll = () => {
            if(choice==='alone'){
                const scrolled = window.pageYOffset;
                if (scrolled >= headerHeight) setScrollResult((prev)=>prev='_fixed');
                else setScrollResult((prev)=>prev='');
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [choice,headerHeight]);
      const favouriteAction = (service) => {
        const history = JSON.parse(localStorage.getItem('favouriteAction'));
        const action = history?history:[];
        const checkExp = [...action,{name:service,time:Date.now()}];
        const key = 'name';
        const historyResult = [...new Map(checkExp.map(item =>[item[key], item])).values()];
        localStorage.setItem('favouriteAction',JSON.stringify(historyResult))
    };
    return(
        <>
        {choice!=='alone'?
        <div className="main__nav block_animation">
            <p className="nav">
            <Link href="/" prefetch={false}><b className="b_color">{nav_translate['home'][lang]}  /</b></Link>  
            {result?
            result.map((sends,index)=>
                <React.Fragment key={index}>
                {sends.path==='last'?
                sends.text?<>{sends.text}</>:
                <>{nav_translate[sends.key][lang]}</>:
                sends.text?<><Link href={sends.location} prefetch={false}>{sends.text}</Link>  /  </>:
                <><Link href={sends.location} prefetch={false}>{nav_translate[sends.key][lang]}</Link>  /  </>
                 
                }
                </React.Fragment>
                )
            :''}
            </p>
        </div>:
        mode==='standalone'?<>
        {scrollResult==="_fixed"?
            <div onClick={()=>router.back()} className={`main_back_fixed_1`}>
                <div className='main_back_button'>
                    <div className='main_back_button_i'/>
                </div>
                <p>{ux['back'][lang]}</p>
            </div>
        :""}
            <div onClick={()=>router.back()} className={`main_back_1`}>
                <div className={`main_back_button ${scrollResult==="_fixed"?"opacity_zero":""}`}>
                    <div className='main_back_button_i'/>
                </div>
                <p className={`${scrollResult==="_fixed"?"opacity_zero":""}`}>{ux['back'][lang]}</p>
            </div>
    </>:
        with_save==="yes"?
        <>
            {scrollResult==="_fixed"?
            <div className={`main_back_block_fixed`}>
                <div onClick={()=>router.back()} className={`main_back_with_action anim_hover`}>
                    <div className='main_back_button'>
                        <div className='main_back_button_i'/>
                    </div>
                    <p>{ux['back'][lang]}</p>
                </div>    
                <div className="main_back_action">
                    <div className="main_back_action_block anim_hover" onClick={()=>favouriteAction(save_name)}>
                        <div className="main_back_action_block_row red_background">
                            <div className="main_back_action_block_img">
                                <Image src="/img/heart.svg" width={30} height={30} alt="icon" />
                            </div>
                        </div>
                        <p className="hide_when_need">Добавить в Избранные</p>
                    </div>
                </div>
            </div>:""}
            <div className={`main_back_block`}>
                <div onClick={()=>router.back()} className={`main_back_with_action anim_hover`}>
                    <div className={`main_back_button ${scrollResult==="_fixed"?"opacity_zero":""}`}>
                        <div className='main_back_button_i'/>
                    </div>
                    <p className={`${scrollResult==="_fixed"?"opacity_zero":""}`}>{ux['back'][lang]}</p>
                </div>
                <div className="main_back_action">
                    <div className="main_back_action_block anim_hover" onClick={()=>favouriteAction(save_name)}>
                        <div className="main_back_action_block_row red_background">
                            <div className="main_back_action_block_img">
                                <Image src="/img/heart.svg" width={30} height={30} alt="icon" />
                            </div>
                        </div>
                        <p className="hide_when_need">Добавить в Избранные</p>
                    </div>
                </div>
            </div>
        </>:<>
            {scrollResult==="_fixed"?
                <div onClick={()=>router.back()} className={`main_back_fixed`}>
                    <div className='main_back_button'>
                        <div className='main_back_button_i'/>
                    </div>
                    <p>{ux['back'][lang]}</p>
                </div>
            :""}
                <div onClick={()=>router.back()} className={`main_back`}>
                    <div className={`main_back_button ${scrollResult==="_fixed"?"opacity_zero":""}`}>
                        <div className='main_back_button_i'/>
                    </div>
                    <p className={`${scrollResult==="_fixed"?"opacity_zero":""}`}>{ux['back'][lang]}</p>
                </div>
        </>
        }
        </>
    )
}

export default memo(NavbarApp);