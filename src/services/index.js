import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export function formatarParams(params){
    if(params != null){
        var chaves = Object.keys(params)
        var valores = Object.values(params)
        var paramsFormatado = ''
        for(var i=0 ; i < chaves.length ; i++){
            var valorAntigo = paramsFormatado
            if(i == 0){
                paramsFormatado = `?${chaves[i]}=${valores[i]}`
            }else{
                paramsFormatado = `${valorAntigo}&${chaves[i]}=${valores[i]}`
            }
        }
        return paramsFormatado
    }else{
        return ''
    }
}

export async function Get(url, params) {
  try {
    const paramsFormatado = formatarParams(params);
    const urlFormatada = `${url}${paramsFormatado}`;
    console.log(urlFormatada);

    const response = await fetch(urlFormatada, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Se necessário, ajuste o cabeçalho conforme sua necessidade
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.log(`Erro na requisição: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
  
/*
export async function Get(url,params){
    const paramsFormatado = formatarParams(params)
    const urlFormatada = `${url}${paramsFormatado}`
    console.log(urlFormatada)
    return await axios({
      method: "get", 
      url: `${urlFormatada}`
    })
    .then(response =>{ 
      console.log(response)
      if(response.status == 200){
        return response.data
      }else{
        return false
      }
    })
    .catch(error => console.log(error))
  }

export async function Post(url,body){
  const token = await getToken()
  return await axios({
    method: "POST",
    body: JSON.stringify(body), 
    headers:{
      "Content-Type":"application/json",
      Authorization: token
    },
    url: url,
  })
  .then(response => {
    return response
  })
  .catch(error => console.log(error.response))
}
*/
export async function Post(url, body) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return false
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

