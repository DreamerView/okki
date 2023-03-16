// import io from "socket.io-client";
// import { useEffect,useState } from "react";
import style from "/styles/education/quizy/index.module.css";
// const socket = io.connect('http://localhost:3001')
const Quizy = () => {
    // const [text,setText] = useState('');
    // const [message,setMessage] = useState('');
    // const sendMessage = ()=>{
    //     socket.emit("send_data", {message:message})

    // };
    // useEffect(()=>{
    //     socket.on("get_data",data=>{
    //         setText(data.message);
    //     })
    // },[socket])
    return(
        <>
        {/* <NavbarApp to={{href:"/"}} choice="alone"/> */}
        <div className="main block_animation">
            <h1 className="flex_text">Okki Quizy</h1>
            <p className="sub_content">Welcome to Okki Quizy</p>
            <div className={style.quiz}>
                <h1 className={style.header}>Okki Quizy</h1>
                <p className={style.main_text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <div className={style.main_test}>
                    <div className={style.main_test_block}></div>
                    <div className={style.main_test_block}></div>
                    <div className={style.main_test_block}></div>
                    <div className={style.main_test_block}></div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Quizy;