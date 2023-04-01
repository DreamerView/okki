import dynamic from "next/dynamic";
import NavPreloader from "@/modules/navbar_app/nav_preloader";
const NavbarApp = dynamic(()=>import('@/modules/navbar_app/nav'),{ssr:false,loading:NavPreloader});
import style from "/styles/calculator/simple-calculator/index.module.css";
import {useState,useEffect,useCallback} from 'react';

export const getStaticProps = async ({locale}) => {
    return {props:{lang:locale}};
};

const SimpleCalculator = ({lang}) => {
    const [prev,setPrev] = useState(0);
    const [action,setAction] = useState("=");
    const [result,setResult] = useState(0);
    const [logs,setLogs] = useState([]);
    const insertNumber = useCallback((num) => {
        setResult(prev=>prev=(result+num).replace(/^0+/, ''));
    },[result]);
    const resetNumber = useCallback(()=>{
        setResult(prev=>prev=0);
    },[])
    const solveProcess = useCallback(() => {
        const solution = result;
        let solve;
        switch(action) {
            case "+": solve = Number(prev) + Number(solution);break;
            case "-": solve = Number(prev) - Number(solution);break;
            case "*": solve =  Number(prev) * Number(solution);break;
            case "/": solve = Number(prev) / Number(solution);break;
            default: solve = solution;
        }
        setLogs([...logs,{text:String(`${prev}${action}${solution}=${solve}`)}]);
        setResult(prev=>prev=Number(solve));
    },[result,prev,action]);
    const operationProcess = useCallback((operation) => {
        setPrev(result);
        setResult(prev=>prev=0);
        setAction(operation);
    },[result]);
    useEffect(() => {
        const handleKeyDown = (e) => {
            const arrayNumber = [0,1,2,3,4,5,6,7,8,9];
            const actionInput = ['+','-','*','/'];
            arrayNumber.includes(Number(e.key))&&insertNumber(String(Number(e.key)));
            actionInput.includes(String(e.key))&&operationProcess(String(e.key));
            if(e.keyCode===13) e.preventDefault(),solveProcess();
            e.key==="Escape"&&resetNumber();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
    }, [insertNumber,solveProcess,resetNumber,operationProcess]);
    return(<>
        <NavbarApp lang={lang} to={{href:"/"}} choice="alone"/>
        <div className="main_app">
            <div className="main_row">
                <div className={style.calculator}>
                    <div className={style.calculator_main}>
                        <div className={style.calculator_main_output}>
                            <span>{result}</span>
                        </div>
                        <div className={style.calculator_main_input}>
                            <button onClick={()=>resetNumber()} type="button">C</button>
                            <button type="button">x<sup>2</sup></button>
                            <button type="button">&#8730;</button>
                            <button onClick={()=>operationProcess('/')} type="button">/</button>
                            <button onClick={()=>insertNumber("7")} type="button">7</button>
                            <button onClick={()=>insertNumber("8")} type="button">8</button>
                            <button onClick={()=>insertNumber("9")} type="button">9</button>
                            <button onClick={()=>operationProcess('*')} type="button">x</button>
                            <button onClick={()=>insertNumber("4")} type="button">4</button>
                            <button onClick={()=>insertNumber("5")} type="button">5</button>
                            <button onClick={()=>insertNumber("6")} type="button">6</button>
                            <button onClick={()=>operationProcess('-')} type="button">-</button>
                            <button onClick={()=>insertNumber("1")} type="button">1</button>
                            <button onClick={()=>insertNumber("2")} type="button">2</button>
                            <button onClick={()=>insertNumber("3")} type="button">3</button>
                            <button onClick={()=>operationProcess('+')} type="button">+</button>
                            <button type="button">+/-</button>
                            <button onClick={()=>insertNumber("0")} type="button">0</button>
                            <button type="button">,</button>
                            <button onClick={()=>solveProcess()} type="button">=</button>
                        </div>
                    </div>
                    <div className={style.calculator_logs}>
                        <h1>Журнал</h1>
                        <div className={style.calculator_logs_list}>
                            {logs.map((res,index)=> res !== [{}]&&
                                    <span className={style.calculator_logs_result} key={index}>{(index+1)+") "+res.text}</span>
                                
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default SimpleCalculator;