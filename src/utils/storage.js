import {base64} from './index'
export default class {
    save(key, content){
        if (Object.prototype.toString.call(content) === '[object Object]' 
        || Object.prototype.toString.call(content) === '[object Array]'){
            content = '[json]->' + base64.encode(JSON.stringify(content))
        }
        window.localStorage.setItem(key, content)
    }
    get(key){
        let content = window.localStorage.getItem(key);
        if(content && content.startsWith('[json]->')){
            return JSON.parse(base64.decode(content.substr(8)))
        }else{
            if(content === 'null' || null === content){
                return null
            }
            return content
        }
    }
    remove(key){
        window.localStorage.removeItem(key);
    }
}