import type { Homepage } from "./Homepage.class"

const JSON_HOMEPAGE_DATA = "jsonHomepageData"

export function readHomepageData():Homepage|null{
    let data:string|null = localStorage.getItem(JSON_HOMEPAGE_DATA) 
    if(data !== null){
        return JSON.parse(data)
    }
    return null
}

export function writeHomepageData(homepage:Homepage):void{
    localStorage.setItem(JSON_HOMEPAGE_DATA, JSON.stringify(homepage))
}