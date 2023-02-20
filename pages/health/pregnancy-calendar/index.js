/*jshint esversion: 6 */
import { useState,useEffect,useCallback } from "react";
import Image from "next/image";
import Head from "next/head";
import nav_text from "/translate/services/all_translate";
import style from "/styles/health/index.module.css";
import text from "/translate/health/pregnancy-calendar/index_translate";
import NavbarApp from '/pages/navbar_app/nav';
import AppShow from "/pages/modules/app";

const PregnancyCalendar = ({lang})=>{
    const [date,setDate] = useState(0);
    const [result,setResult] = useState({date:text.waiting[lang],month:'',year:''});
    const [ownWeek,setWeek] = useState('0');
    const [timePregrant,setTimePregnant] = useState('0');
    const [weeks,setWeeks] = useState([{}]);
    const [full,setFull] = useState('not');
    const [trimest,setTrimerster] = useState(0);
    const [getDays,setDays] = useState(0);
    // Начало анимации
    const [anim,setAnim] = useState(false);
    useEffect(()=>{
        let timer;
        if(anim!==false) timer = setTimeout(()=>setAnim(false),[2000]);
        return () => clearTimeout(timer);
    },[anim]);
    useEffect(()=>{
        if(date!==0) setAnim('date');
        return ()=>{
            return 0;
        }
    },[date]);
    // Завершение анимации
    const getMonthName = useCallback((e) => {
        let MonthNumber;
        switch((e+1)) {
            case 1: MonthNumber =text.jan[lang]; break;
            case 2: MonthNumber =text.feb[lang]; break;
            case 3: MonthNumber =text.march[lang]; break;
            case 4: MonthNumber =text.april[lang]; break;
            case 5: MonthNumber =text.may[lang]; break;
            case 6: MonthNumber =text.june[lang]; break;
            case 7: MonthNumber =text.july[lang]; break;
            case 8: MonthNumber =text.aug[lang]; break;
            case 9: MonthNumber =text.sep[lang]; break;
            case 10: MonthNumber =text.oct[lang]; break;
            case 11: MonthNumber =text.nov[lang]; break;
            case 12: MonthNumber =text.dec[lang]; break;
        }
        return MonthNumber;
    },[lang]);
    useEffect(()=>{
        if(date!==0) {
            let today = Date.now();
            let myDate = date;
            myDate = myDate.toString().split("-");
            let newDate = new Date( myDate[0], myDate[1]-1, myDate[2]);
            const convert = (604800*1000)*40;
            const results = newDate.getTime()+convert;
            let calendar = new Date(results);
            let solve = parseInt((today-newDate.getTime())/(604800*1000));
            setResult({date:calendar.getDate(),month:getMonthName(calendar.getMonth()),year:calendar.getFullYear()});
            setWeek(solve<=0?text.unknown[lang]:solve);
            let week = solve;

            switch(true) {
                case (week>=1 && week<=4): setTimePregnant(`1-4 ${text.result2[lang]}`); break;
                case (week>=5 && week<=8): setTimePregnant(`5-8 ${text.result2[lang]}`); break;
                case (week>=9 && week<=12): setTimePregnant(`9-12 ${text.result2[lang]}`); break;
                case (week>=13 && week<=16): setTimePregnant(`13-16 ${text.result2[lang]}`); break;
                case (week>=17 && week<=20): setTimePregnant(`17-20 ${text.result2[lang]}`); break;
                case (week>=21 && week<=24): setTimePregnant(`21-24 ${text.result2[lang]}`); break;
                case (week>=25 && week<=28): setTimePregnant(`25-28 ${text.result2[lang]}`); break;
                case (week>=29 && week<=32): setTimePregnant(`29-32 ${text.result2[lang]}`); break;
                case (week>=33 && week<=36): setTimePregnant(`33-36 ${text.result2[lang]}`); break;
                case (week>=37 && week<=40): setTimePregnant(`37-40 ${text.result2[lang]}`); break;
                case (week>=40): setTimePregnant(text.week40[lang]); break;
                default: setTimePregnant(text.unknown[lang]); break;    
            }
            switch(true) {
                case(week>=1 && week<=13): setTrimerster(1);break;
                case(week>=14 && week<=26): setTrimerster(2);break;
                case(week>=27 && week<=42): setTrimerster(3);break;
                default: setTrimerster(text.unknown[lang]);
            }
        }
        return () =>{ 
            return 0;
        }
    },[date,getMonthName,lang]);
    useEffect(()=>{
        if(date!==0) {
            const findDays = (num,e) => {
                let number = num;
                let alert = (num===4||num===8||num===12||num===16)?'red':'default';
                let weekStart = e;
                let weekEnd = e+(86400*1000*6);
                let weekStartDay = new Date(weekStart);
                let weekEndDay = new Date(weekEnd);
                let resultWeekStart = weekStartDay.getDate()+' '+getMonthName(weekStartDay.getMonth())+' '+weekStartDay.getFullYear();
                let resultWeekEnd = weekEndDay.getDate()+' '+getMonthName(weekEndDay.getMonth())+' '+weekEndDay.getFullYear();
                let daysWeekStart = weekStartDay.getDate()+' '+getMonthName(weekStartDay.getMonth());
                let daysWeekEnd = weekEndDay.getDate()+' '+getMonthName(weekEndDay.getMonth());
                return {number,weekStart,weekEnd,resultWeekStart,resultWeekEnd,alert,daysWeekStart,daysWeekEnd};
            };
            var w = [];
            for(let i=0;i<=42;i++) {
                let myDate = date;
                myDate = myDate.toString().split("-");
                let day = new Date( myDate[0], myDate[1]-1, myDate[2]);
                let days = day.getTime()+(604800*1000*i);
                w.push(findDays(i,days));
            }
            setWeeks(w);
            setDays(w[40])
        }
        return () =>{ 
            return 0;
        }
    },[date,getMonthName]);
    return(
        <>
            <Head>
                <title>{nav_text['pregnancy_calendar'][lang]} | Okki.kz</title>
                <meta property="og:title" content={`${nav_text['pregnancy_calendar'][lang]} | Okki.kz`} />
            </Head>
            <NavbarApp lang={lang} to={{href:"/health"}} choice="alone"/>
            <div className="main_app block_animation">
                <AppShow Image={Image} name={"pregnancy_calendar"} translate={nav_text['pregnancy_calendar'][lang]}/>
                <h1 className={style.header}>{nav_text['pregnancy_calendar'][lang]}</h1>
                <p className={`${style.headers} sub_content`}>{text['content'][lang]}</p>
                <div className={style.date_block}>
                    <input type="date" placeholder={text['enter_date'][lang]}  onChange={e=>setDate(e.target.value)} className={style.date} required/>
                </div>
                <div className={style.calendar_row}>
                    <div className={anim==='date'?style.calendar_block_loader:style.calendar_block}>
                        <div className={style.calendar_block_emoji}>
                            <Image priority width={48} height={48} alt="emoji" src="/emoji-small/breast_feeding.webp"/>
                        </div>
                        <div className={style.calendar_block_l}>
                            <p>{text['result1'][lang]}</p>
                            <h4>{result.date} {result.month} {result.year}</h4>
                        </div>
                    </div>
                    <div className={anim==='date'?style.calendar_block_loader:style.calendar_block}>
                        <div className={style.calendar_block_emoji}>
                            <Image priority width={48} height={48} alt="emoji" src="/emoji-small/baby.webp"/>
                        </div>
                        <div className={style.calendar_block_l}>
                            <p>{text['result5'][lang]}</p>
                            <h4>{getDays!==0?" "+getDays.daysWeekStart+" ~ "+getDays.daysWeekEnd:text.unknown[lang]}</h4>
                        </div>
                    </div>
                    <div className={anim==='date'?style.calendar_block_loader:style.calendar_block}>
                        <div className={style.calendar_block_emoji}>
                            <Image priority width={48} height={48} alt="emoji" src="/emoji-small/calendar.webp"/>
                        </div>
                        <div className={style.calendar_block_l}>
                            <p>{text['result2'][lang]}</p>
                            <h4>{ownWeek}</h4>
                        </div>
                    </div>
                    <div className={anim==='date'?style.calendar_block_loader:style.calendar_block}>
                        <div className={style.calendar_block_emoji}>
                            <Image priority width={48} height={48} alt="emoji" src="/emoji-small/hourglass_not_done.webp"/>
                        </div>
                        <div className={style.calendar_block_l}>
                            <p>{text['result3'][lang]}</p>
                            <h4>{timePregrant}</h4>
                        </div>
                    </div>
                    <div className={anim==='date'?style.calendar_block_loader:style.calendar_block}>
                        <div className={style.calendar_block_emoji}>
                            <Image priority width={48} height={48} alt="emoji" src="/emoji-small/hourglass_not_done.webp"/>
                        </div>
                        <div className={style.calendar_block_l}>
                            <p>{text['result4'][lang]}</p>
                            <h4>{trimest}</h4>
                        </div>
                    </div>
                </div>
                {date!==0?
                <>
                <h1 className={style.head}>{text['all_week'][lang]}</h1>
                <div className={full==='not'?style.not__full:''}>
                    {weeks.map((result,index)=> result == [{}]?"":
                        <div className={`${style.calendar__planner}`} key={index+1}>
                            <div className={`${style.calendar__day}`}>
                                <div className={`${result.alert==='red'?'red_background white_font':''}`}>
                                    <h1>{result.number}</h1>
                                    <p>{text['result2'][lang]}</p>
                                </div>
                            </div>
                            <div className={style.calendar__block}>
                                <div className={`${style.calendar__block_row} ${result.alert==='red'?'red_background white_font':'block_background'}`}>
                                    <p>{text.days_pregnancy[lang]}</p>
                                    <h4>{text['from'][lang]} {result.resultWeekStart} {text['by'][lang]} {result.resultWeekEnd}</h4>
                                </div>
                                {result.alert==='red'?
                                <div className={`${style.calendar__block_row} blue_background white_font`}>
                                    <p>{text['warn'][lang]}</p>
                                    <h4>{text['warn_text'][lang]}</h4>
                                </div>
                                :""
                                }
                                {result.number===40?
                                <div className={`${style.calendar__block_row} green_background white_font`}>
                                    <p>{text['congrat'][lang]}</p>
                                    <h4>{text['congrat_text'][lang]}</h4>
                                </div>
                                :""
                                }
                                {(result.number>=4 && result.number<=16)?
                                <div className={`${style.calendar__block_row} orange_background white_font`}>
                                    <p>{text['care'][lang]}</p>
                                    <h4>{text['care_text'][lang]}</h4>
                                </div>
                                :""
                                }
                            </div>
                        </div>
                    )}
                </div>
                <div className={style.check__full}>
                    <button className={style.button__full} onClick={()=>{full==='not'?setFull('full'):setFull('not')}}>{full==='not'?'Посмотреть полностью':'Свернуть'}</button>
                </div>
                </>
                :""}
            </div>
        </>
    )
};

PregnancyCalendar.getInitialProps = async ({locale}) => {
    return { lang:locale };
  };

export default PregnancyCalendar;