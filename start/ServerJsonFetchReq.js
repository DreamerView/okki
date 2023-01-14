/*jshint esversion: 6 */
/*jshint esversion: 8 */

const AesEncryption = require('aes-encryption');

const ServerJsonFetchReq = async({path,cookie,server,auth}) =>{
    try {
    if(cookie!==undefined) {
        const aes = new AesEncryption();
        aes.setSecretKey(process.env.aesKey);
        const getCookie = (cookieName) => {let cookies = {};cookie.split(';').forEach(function(el) {let [key,value] = el.split('=');cookies[key.trim()] = value;});return cookies[cookieName];};
        const reqUrl = server.req.headers['host'],urlReq = reqUrl==='localhost:3000'?"http://":"https://",originReq = urlReq+reqUrl,userAccessToken = getCookie("accessToken"),userClientId = getCookie("clientId");
        if(userAccessToken!==undefined&&userAccessToken!==null&&userClientId!==undefined&&userClientId!==null) {
            const handlerRequest = ({auth}) => {
                return {
                    method: 'GET',
                    headers: {"WWW-Authenticate": process.env.authHeader,"Origin":originReq,"Authorization": `Bearer ${auth}`,"Accept":"application/json; charset=utf-8","Content-Type": "application/json; charset=utf-8","Accept-Encoding":"gzip"},
                    cache: "no-store"
                };
            };
            const accessToken = aes.encrypt(userAccessToken),clientId = aes.encrypt(userClientId),requestOptions = handlerRequest({auth:accessToken+" "+clientId}),login = await fetch(process.env.backend+path, requestOptions);
            if (login.status === 406) {
                const tokenOptions = {
                    method: 'POST',
                    headers: {
                        "WWW-Authenticate": process.env.authHeader,
                        "Origin":originReq,
                        "Accept":"application/json; charset=utf-8",
                        "Content-Type": "application/json; charset=utf-8",
                        "Accept-Encoding":"gzip"
                    },
                    cache: "no-store",
                    body: JSON.stringify({accessToken:accessToken,clientId:clientId})
                };
                const send = await fetch(process.env.backend+"/generate-token",tokenOptions);
                if(send.status === 409) {
                    console.log("It's conflict!");
                    server.res.setHeader('set-cookie', ["accessToken=;Max-Age=0;path=/","clientId=;Max-Age=0;path=/"]);
                    return {result:'redirect',location:"/signin"};
                } else {
                    const result = await send.json();
                    if(result.accessToken!==undefined) {
                        const response = aes.decrypt(result.accessToken),getClientId = aes.decrypt(result.clientId),today = new Date(),expire = new Date();
                        expire.setTime(today.getTime() + 3600000*24*14);
                        server.res.setHeader('set-cookie', ["accessToken="+response+";path=/;secure;expires="+expire.toGMTString()+"","clientId="+getClientId+";path=/;secure;expires="+expire.toGMTString()+""]);
                        console.log("token updated, new token is "+response);
                        const sendReqOpt =  handlerRequest({auth:aes.encrypt(response)+" "+clientId})
                        const send = await fetch(process.env.backend+path, sendReqOpt),res = await send.json();
                        return res;
                    }
                }
            } else if(login.status === 409) {
                console.log("It's conflict!");
                server.res.setHeader('set-cookie', ["clientId=;Max-Age=0;path=/","accessToken=;Max-Age=0;path=/"]);
                return {result:'redirect',location:"/signin"};
            } 
            else {
                const result = await login.json();
                return result;
            }
        } else {
            return {result:'redirect',location:"/signin"};
        }
    } else {
        if(auth==="yes") {
            return {result:'redirect',location:"/"};
        } else {
            return false;
        }
    } 
    } catch(e) {
        console.log(e);
    }
};
export default ServerJsonFetchReq;