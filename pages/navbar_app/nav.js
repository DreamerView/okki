/*jshint esversion: 6 */
import React,{memo,useState,useEffect} from "react";
import Link from "next/link";
import nav_translate from "/translate/services/all_translate";
import ux from "/translate/ux/action";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';


const NavbarApp = ({to,choice,with_save,save_name,mode,lang}) => {
    const router = useRouter();
    const headerHeight= useSelector(state=>state.headerHeight);
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
    //   const favouriteAction = (service) => {
    //     const history = JSON.parse(localStorage.getItem('favouriteAction'));
    //     const action = history?history:[];
    //     const checkExp = [...action,{name:service,time:Date.now()}];
    //     const key = 'name';
    //     const historyResult = [...new Map(checkExp.map(item =>[item[key], item])).values()];
    //     localStorage.setItem('favouriteAction',JSON.stringify(historyResult))
    // };
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
                <div className="main_app_block_row">
                    <div className='main_back_button'>
                        <div className='main_back_button_i'/>
                    </div>
                </div>
                <p>{ux['back'][lang]}</p>
            </div>
        :""}
            <div onClick={()=>router.back()} className={`main_back_1`}>
                <div className="main_app_block_row">
                    <div className={`main_back_button ${scrollResult==="_fixed"?"opacity_zero":""}`}>
                        <div className='main_back_button_i'/>
                    </div>
                    <p className={`${scrollResult==="_fixed"?"opacity_zero":""}`}>{ux['back'][lang]}</p>
                </div>
            </div>
    </>:
        <>
            {scrollResult==="_fixed"?
                <div onClick={()=>router.back()} className={`main_back_fixed`}>
                    <div className="main_app_block_row">
                        <div className='main_back_button'>
                            <div className='main_back_button_i'/>
                        </div>
                        <p>{ux['back'][lang]}</p>
                    </div>
                </div>
            :""}
                <div onClick={()=>router.back()} className={`main_back`}>
                    <div className="main_app_block_row">
                        <div className={`main_back_button ${scrollResult==="_fixed"?"opacity_zero":""}`}>
                            <div className='main_back_button_i'/>
                        </div>
                        <p className={`${scrollResult==="_fixed"?"opacity_zero":""}`}>{ux['back'][lang]}</p>
                    </div>
                </div>
        </>
        }
        </>
    )
}

export default memo(NavbarApp);