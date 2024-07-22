import { writable } from "svelte/store";
import { Homepage } from "./Homepage.class";
import { readHomepageData, writeHomepageData } from "./localStorageUtils";
// @ts-ignore
import examplesLinks from '$lib/links.const.toml'

const isBrowser = typeof window !== 'undefined'

let storedHomepage:Homepage = new Homepage("Default Title")

if(isBrowser){
    let localData = readHomepageData()
    if(localData !== null){
        console.debug("local")
        storedHomepage = localData
    } else {
        console.debug("example")
        storedHomepage = examplesLinks
    }
}

export const jsonHomepageDataStore = writable(storedHomepage)

if(isBrowser){
    jsonHomepageDataStore.subscribe(value => {writeHomepageData(value)})
}
