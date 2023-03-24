import style from "/styles/calculator/index.module.css";
import text from "/translate/health/ideal-weight/index_translate";
import Image from "next/image";

const CalculatorComponent = ({input,result,lang}) => {
    return(
        <div className={style.main__calc}>
                    
                    <div className={style.main__result}>
                        {/* <h2>{text['results'][lang]}</h2> */}
                        <div className={style.module_result_row}>
                            <div className={style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={"/emoji-small/money_bag.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div>
                                    {/* <p className={style.module_result_block_desc}>{text['saveup'][lang]}</p>
                                    <h4>{total}</h4> */}
                                </div>
                            </div>
                            <div className={style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={"/emoji-small/dollar.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div>
                                    {/* <p className={style.module_result_block_desc}>{text['own'][lang]}</p> */}
                                    {/* <h4>{own}</h4> */}
                                </div>
                            </div>
                            <div className={style.module_result_block}>
                                <div className={style.module_result_block_pic}>
                                    <Image priority src={"/emoji-small/money_bag.webp"} width={40} height={40} alt="emoji"/>
                                </div>
                                <div>
                                    {/* <p className={style.module_result_block_desc}>{text['accrued'][lang]}</p> */}
                                    {/* <h4>{percent}</h4> */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.main__calculator}>
                        {/* <h2>{nav_translate['calculator'][lang]}</h2> */}
                        <div className={style.module_result_row}>
                            <div className={style.main__calculator_m}>
                                {/* <p className={style.description}>{text['annual'][lang]}</p> */}
                                <div className={style.main__calculator_module}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={"/emoji-small/bar_chart.webp"} width={35} height={35} alt="emoji"/>
                                    </div>
                                    <input type="tel" pattern="[0-9]*"  placeholder={text['annual'][lang]} className={`${style.main__calculator_module_input}`} onChange={(e)=>{setBet((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, "."))}} value={bet}/>
                                </div>
                            </div>
                            <div className={style.main__calculator_m}>
                                <p className={style.description}>{text['amount'][lang]}</p>
                                <div className={style.main__calculator_module}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={"/emoji-small/dollar.webp"} width={35} height={35} alt="emoji"/>
                                    </div>
                                    <input type="tel" pattern="[0-9]*"  placeholder={text['amount'][lang]} className={`${style.main__calculator_module_input}`} onChange={(e)=>{setSum((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, "."))}} value={sum} />
                                </div>
                            </div>
                            <div className={style.main__calculator_m}>
                                <p className={style.description}>{text['term'][lang]}</p>
                                <div className={style.main__calculator_module}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={"/emoji-small/aim.webp"} width={35} height={35} alt="emoji"/>
                                    </div>
                                    <select onChange={e=>setTerm(Number(e.target.value))} className={`${style.main__calculator_module_select}`}>
                                        <option value="not">{text['deadline'][lang]}</option>
                                        <option value="1">1 {text['month'][lang]}</option>
                                        <option value="3">3 {text['month'][lang]}</option>
                                        <option value="6">6 {text['month'][lang]}</option>
                                        <option value="9">9 {text['month'][lang]}</option>
                                        <option value="12">12 {text['month'][lang]}</option>
                                    </select>
                                </div>
                            </div>
                            <div className={style.main__calculator_m}>
                                <p className={style.description}>{text['replenishment'][lang]}</p>
                                <div className={style.main__calculator_module}>
                                    <div className={style.main__calculator_module_pic}>
                                        <Image priority src={"/emoji-small/money_bag.webp"} width={35} height={35} alt="emoji"/>
                                    </div>
                                    <input type="tel" onChange={(e)=>{setEvery((v) => (e.target.validity.valid ? e.target.value : v).replace(/,/g, "."))}} value={every} pattern="[0-9]*"  placeholder={text['replenishment'][lang]} className={`${style.main__calculator_module_input}`}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
};

export default CalculatorComponent;