import {io} from "socket.io-client";
import { useEffect,useState } from "react";
import style from "/styles/education/quizy/index.module.css";
import {useDispatch } from "react-redux";

export async function getServerSideProps({params}) {
    const id = params.id;
    return {
        props: { getId: id},
    };
}

const Quizy = ({getId}) => {
    const send = useDispatch();
    const [q,setQ] = useState('');
    const [socket] = useState(io("https://app.okki.kz/ws", {
        transports: ['websocket'],
        query: {
          "c": getId
        }
      }));
    const [delay, setDelay] = useState(0);
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
        send({type:"hideRequest",set:true});
    },[send])
    useEffect(()=>{
        let sign = prompt("Давай знакомиться, как тебя зовут?");
        alert("Привет "+sign);
    },[])
    useEffect(()=>{
            socket.on("get_data",data=>{
                setText(data.text)
            })
            socket.on("get_question",data=>{
                console.log(data);
                setQ(data.q[0])
                setDelay(data.t)
            })
    },[socket])
    return(
        <>
        
        <div className="main block_animation">
            <div className={style.quiz_timer}>
                    <div className={style.quiz_timer_block}>{timer.min1}</div>
                    <div className={style.quiz_timer_block}>{timer.min2}</div>
                    <span>:</span>
                    <div className={style.quiz_timer_block}>{timer.sec1}</div>
                    <div className={style.quiz_timer_block}>{timer.sec2}</div>
                </div>
            <p className="sub_content disable">{q!==''?q.question:""}</p>
            <div className={style.answer_block}>
                <div className={`${style.answer_block_row} block_background disable`}>{q!==''?q.answer[0]:""}</div>
                <div className={`${style.answer_block_row} brand_background disable`}>{q!==''?q.answer[1]:""}</div>
                <div className={`${style.answer_block_row} orange_background disable`}>{q!==''?q.answer[2]:""}</div>
                <div className={`${style.answer_block_row} red_background disable`}>{q!==''?q.answer[3]:""}</div>
            </div>
        </div>
        </>
    )
}
export default Quizy;