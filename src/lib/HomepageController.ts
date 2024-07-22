import { Homepage, Link, Tab } from "./Homepage.class";

const MEMBERS_OF_HOMEPAGE = Object.keys(new Homepage(""))
const MEMBERS_OF_TAB = Object.keys(new Tab(""))
const MEMBERS_OF_LINK = Object.keys(new Link("",""))

export function control(homepage:Homepage):Promise<string>{
    return new Promise(resolve => {
        //On vérifie les champs obligatoires.
        if(!homepage.title){
            resolve("La balise title est obligatoire à la racine de l'objet TOML")
        }
        
        if(!homepage.tabs || homepage.tabs.length == 0){
            resolve("Il doit exister au moins une balise [[tabs]] à la racine de l'objet TOML")
        }

        homepage.tabs.forEach((tab: Tab) => {
            
            if(!tab.title){
                resolve("La balise title est obligatoire dans chaque node [[tabs]]")
            }

            if(!tab.links || tab.links.length == 0){
                resolve("Il doit exister au moins une balise [[links]] dans chaque node [[tabs]]")
            }
            tab.links.forEach((link: Link) => {
                
                if(!link.title){
                    resolve("La balise title est obligatoire dans chaque node [[links]]")
                }
                if(!link.url){
                    resolve("La balise url est obligatoire dans chaque node [[links]]")
                }
            });
            
        });

        
        //On contrôle la présence de champs non désiré
        Object.keys(homepage).forEach(keyHomepage => {
            if(!MEMBERS_OF_HOMEPAGE.includes(keyHomepage)){
                resolve(`La balise ${keyHomepage} n'est pas une balise connue à la racine de l'objet TOML`)
            }
            homepage.tabs.forEach((tab: Tab) => {
                Object.keys(tab).forEach(keyTab => {
                    if(!MEMBERS_OF_TAB.includes(keyTab)){
                        resolve(`La balise ${keyTab} n'est pas une balise connue de la node [[tabs]]`)
                    }
                })

                tab.links.forEach((link: Link) => {
                    
                    Object.keys(link).forEach(keyLink => {
                        if(!MEMBERS_OF_LINK.includes(keyLink)){
                            resolve(`La balise ${keyLink} n'est pas une balise conneue de la node [[links]]`)
                        }
                    })
                })
            })
        });

        resolve("")
    })
}