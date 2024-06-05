import AsyncStorage from "@react-native-async-storage/async-storage";
 
export const DADOS_STORAGE = {
  USER: 'user',
  TIPO_USER: 'tipo_user'
}

export async function setAsyncStorage(chave,valor){
    try {
        await AsyncStorage.setItem(`${chave}`, `${valor}`);
      } catch (e) {
        return null
      }
}

export async function getAsyncStorage(chave){
    try {
        const value = await AsyncStorage.getItem(`${chave}`);
        if (value != null) {
          return value
        }else{
            return null
        }
      } catch (e) {
        return null
      }
}