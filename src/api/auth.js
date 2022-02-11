export function user({login, password}){
    if(login == 'test' && password == '123456'){
        return {
            name:'иван',
            last_name:'иванов',
            token:'123456789123456789',
        }
    }
    return {}
}