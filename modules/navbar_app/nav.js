/*jshint esversion: 6 */
import React,{memo,useState,useEffect} from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';


const NavbarApp = ({to,choice,lang,ux,service}) => {
    const text = (req,res) => req.find(e=>e.name===res)[lang];
    const router = useRouter();
    const headerHeight= useSelector(state=>state.headerHeight);
    const result = to!==undefined?to:[{}];
    const [scrollResult,setScrollResult] = useState('');
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.pageYOffset;
            choice==='alone'&&setScrollResult((prev)=>scrolled >= headerHeight?prev='_fixed':prev="");
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
        <div className="main__nav ">
            <p className="nav">
            <Link href="/" prefetch={false}><b className="b_color">{nav_translate['home'][lang]}  /</b></Link>  
            {result!==undefined&&
            result.map((sends,index)=>
                <React.Fragment key={index}>
                {sends.path==='last'?
                sends.text?<>{sends.text}</>:
                <>{text(service['translate'],sends.key)}</>:
                sends.text?<><Link href={sends.location} prefetch={false}>{sends.text}</Link>  /  </>:
                <><Link href={sends.location} prefetch={false}>{text(service['translate'],sends.key)}</Link>  /  </>
                 
                }
                </React.Fragment>
                )
            }
            </p>
        </div>:
        <>
            {
                <div onClick={()=>router.back()} className={`main_back_fixed ${scrollResult==="_fixed"?"no_radius":"with_radius"}`}>
                    <div className="main_app_block_row">
                        <div className='main_back_button'>
                            <div className='main_back_button_i'/>
                        </div>
                        <p>{text(ux,"back")}</p>
                    </div>
                </div>
            }
                {/* <div onClick={()=>router.back()} className={`main_back`}>
                    <div className="main_app_block_row ">
                        <div className={`main_back_button ${scrollResult==="_fixed"?"opacity_zero":""}`}>
                            <div className='main_back_button_i'/>
                        </div>
                        <p className={`${scrollResult==="_fixed"?"opacity_zero":""}`}>{ux['back'][lang]}</p>
                    </div>
                </div> */}
        </>
        }
        </>
    )
}

export default memo(NavbarApp);