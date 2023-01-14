/*jshint esversion: 6 */
import setTranslateText from '/start/translate';
import translate from "/translate/health/bmi_calculator/index_translate";

const setBmiApi = (male,age,m,h) => {
        const lang = setTranslateText();
        let res,check,maleText,color,maleStatus,check_status,res_status;
        check_status="check";
        res_status="res";
        h = h/100;
        if(age === '') age=0;
        if(m===0 || h===0) {check = translate.loading[lang];}
        if(res === undefined) {res = translate.loading[lang];}
        if(m!=0 && h!=0) {res=Math.round(m/(h*h));}
        if(male==='male') {
            if(age >= 18 && age <= 24) {
                switch(true) {
                    case res<=19: check =  translate.warn1[lang];color="blue";break;
                    case res >= 20 && res <= 25:check = translate.warn2[lang];color="green";break;
                    case res >= 26 && res <= 30: check = translate.warn3[lang];color="purple";break;
                    case res >= 31 && res <= 40: check = translate.warn4[lang];color="orange";break;
                    case res >= 41: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 25 && age <= 34) {
                switch(true) {
                    case res<=20: check = translate.warn1[lang];color="blue";break;
                    case res >= 21 && res <= 26:check = translate.warn2[lang];color="green";break;
                    case res >= 27 && res <= 31: check = translate.warn3[lang];color="purple";break;
                    case res >= 32 && res <= 41: check = translate.warn4[lang];color="orange";break;
                    case res >= 42: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 35 && age <= 44) {
                switch(true) {
                    case res<=21: check = translate.warn1[lang];color="blue";break;
                    case res >= 22 && res <= 27:check = translate.warn2[lang];color="green";break;
                    case res >= 28 && res <= 32: check = translate.warn3[lang];color="purple";break;
                    case res >= 33 && res <= 42: check = translate.warn4[lang];color="orange";break;
                    case res >= 43: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 45 && age <= 54) {
                switch(true) {
                    case res<=22: check = translate.warn1[lang];color="blue";break;
                    case res >= 23 && res <= 28:check = translate.warn2[lang];color="green";break;
                    case res >= 29 && res <= 33: check = translate.warn3[lang];color="purple";break;
                    case res >= 34 && res <= 43: check = translate.warn4[lang];color="orange";break;
                    case res >= 44: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 55 && age <= 64) {
                switch(true) {
                    case res<=23: check = translate.warn1[lang];color="blue";break;
                    case res >= 24 && res <= 29:check = translate.warn2[lang];color="green";break;
                    case res >= 30 && res <= 34: check = translate.warn3[lang];color="purple";break;
                    case res >= 35 && res <= 44: check = translate.warn4[lang];color="orange";break;
                    case res >= 45: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 65) {
                switch(true) {
                    case res<=24: check = translate.warn1[lang];color="blue";break;
                    case res >= 25 && res <= 30:check = translate.warn2[lang];color="green";break;
                    case res >= 31 && res <= 35: check = translate.warn3[lang];color="purple";break;
                    case res >= 36 && res <= 45: check = translate.warn4[lang];color="orange";break;
                    case res >= 46: check = translate.warn5[lang];color="red";break;
                }
            }
        }
        // female 
        if(male==='female') {
            if(age >= 18 && age <= 24) {
                switch(true) {
                    case res<=19: check = translate.warn1[lang];color="blue";break;
                    case res >= 18 && res <= 24:check = translate.warn2[lang];color="green";break;
                    case res >= 25 && res <= 29: check = translate.warn3[lang];color="purple";break;
                    case res >= 29 && res <= 39: check = translate.warn4[lang];color="orange";break;
                    case res >= 40: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 25 && age <= 34) {
                switch(true) {
                    case res<=19: check = translate.warn1[lang];color="blue";break;
                    case res >= 20 && res <= 25:check = translate.warn2[lang];color="green";break;
                    case res >= 26 && res <= 30: check = translate.warn3[lang];color="purple";break;
                    case res >= 31 && res <= 40: check = translate.warn4[lang];color="orange";break;
                    case res >= 41: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 35 && age <= 44) {
                switch(true) {
                    case res<=20: check = translate.warn1[lang];color="blue";break;
                    case res >= 21 && res <= 26:check = translate.warn2[lang];color="green";break;
                    case res >= 26 && res <= 31: check = translate.warn3[lang];color="purple";break;
                    case res >= 32 && res <= 41: check = translate.warn4[lang];color="orange";break;
                    case res >= 42: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 45 && age <= 54) {
                switch(true) {
                    case res<=21: check = translate.warn1[lang];color="blue";break;
                    case res >= 22 && res <= 27:check = translate.warn2[lang];color="green";break;
                    case res >= 28 && res <= 32: check = translate.warn3[lang];color="purple";break;
                    case res >= 33 && res <= 42: check = translate.warn4[lang];color="orange";break;
                    case res >= 43: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 55 && age <= 64) {
                switch(true) {
                    case res<=22: check = translate.warn1[lang];color="blue";break;
                    case res >= 23 && res <= 28:check = translate.warn2[lang];color="green";break;
                    case res >= 28 && res <= 33: check = translate.warn3[lang];color="purple";break;
                    case res >= 34 && res <= 43: check = translate.warn4[lang];color="orange";break;
                    case res >= 42: check = translate.warn5[lang];color="red";break;
                }
            } else if(age >= 65) {
                switch(true) {
                    case res<=23: check = translate.warn1[lang];color="blue";break;
                    case res >= 24 && res <= 29:check = translate.warn2[lang];color="green";break;
                    case res >= 29 && res <= 34: check = translate.warn3[lang];color="purple";break;
                    case res >= 34 && res <= 44: check = translate.warn4[lang];color="orange";break;
                    case res >= 45: check = translate.warn5[lang];color="red";break;
                }
            }
        }
        
        switch(male) {
            case 'male': maleText = translate.male_result_male[lang];break;
            case 'female': maleText = translate.male_result_female[lang];break;
            case 'other': maleText = translate.male_result_other[lang];break;
        }
        switch(male) {
            case 'male': maleStatus = 'male';break;
            case 'female': maleStatus = 'female';break;
            case 'other': maleStatus = 'other';break;
        }
        let obj = JSON.stringify({res,check,age,maleText,color,maleStatus,check_status,res_status});
        return obj;
};

export default setBmiApi;