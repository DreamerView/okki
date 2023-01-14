import {io} from "socket.io-client";
import { useEffect,useState } from "react";
import style from "/styles/education/quizy/index.module.css";
import NavbarApp from '/pages/navbar_app/nav';

export async function getServerSideProps({params}) {
    const id = params.id;
    return {
        props: { getId: id},
    };
}

const Quizy = ({getId}) => {
    const [question] = useState([{
        title:"Okki Quizy 111",
        question:"Кто такой Даниель?",
        answer:['Lorem Ipsum is simply dummy text of the printing and typesetting industry.','абобус','Okki','Okki']
    }]);
    const [socket] = useState(io("https://app.okki.kz/ws", {
        transports: ['websocket'],
        query: {
          "c": getId
        }
      }));
    const [delay, setDelay] = useState(700);
    const [timer,setTimer] = useState({min1:0,min2:0,sec1:0,sec2:0})
    useEffect(() => {
        const minutes = Math.floor(delay / 60);
        const seconds = Math.floor(delay % 60);
        const min1 = minutes<=9?0:parseInt(minutes/10);
        const min2 = minutes-min1*10;
        const sec1 = seconds<=9?0:parseInt(seconds/10);
        const sec2 = seconds-sec1*10;
        setTimer({min1:min1,min2:min2,sec1:sec1,sec2:sec2});
        const timer = setInterval(() => {
            setDelay(delay - 1);
        }, 1000);

        if (delay === 0) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    },[delay]);
    useEffect(()=>{
        socket.on("get_data",data=>{
            setText(data.text)
        })
        socket.emit("send_qustion",{q:question,t:delay})
        // setTimer(getReturnValues(60))
        
    },[socket,delay,question])
    return(
        <>
        <NavbarApp to={{href:"/education"}} choice="alone"/>
        <div className="main_app block_animation">
            <h1 className="flex_text">Okki Quizy [{getId}]</h1>
            <p className="sub_content">Welcome to Okki Quizy</p>
            <div className={style.quiz}>
                {/* <h1 className={style.header}>{question[0].title}</h1> */}
                <div className={style.quiz_timer}>
                    <div className={style.quiz_timer_block}>{timer.min1}</div>
                    <div className={style.quiz_timer_block}>{timer.min2}</div>
                    <span>:</span>
                    <div className={style.quiz_timer_block}>{timer.sec1}</div>
                    <div className={style.quiz_timer_block}>{timer.sec2}</div>
                </div>
                <p className={style.main_text}>{question[0].question}</p>
                <div className={style.main_test}>
                    <div className={`${style.main_test_block} block_background`}>
                        <p>{question[0].answer[0]}</p>
                    </div>
                    <div className={`${style.main_test_block} brand_background`}>
                        <p>{question[0].answer[1]}</p>
                    </div>
                    <div className={`${style.main_test_block} orange_background`}>
                        <p>{question[0].answer[2]}</p>
                    </div>
                    <div className={`${style.main_test_block} red_background`}>
                        <p>{question[0].answer[3]}</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Quizy;