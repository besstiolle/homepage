export class Homepage{
    
    title:string = ""
    bgcolor:string = ""
    bgimg:string = ""
    tabs:Tab[] = []

    constructor(title:string, bgcolor:string = "", bgimg:string = "",tabs:Tab[] = []){
        this.title = title
        this.bgcolor = bgcolor
        this.bgimg = bgimg
        this.tabs = tabs    
    }

}

export class Tab{
    title:string = ""
    desc:string = ""
    links:Link[] = []

    constructor(title:string, desc:string = "", links:Link[] = []){
        this.title = title
        this.desc = desc
        this.links = links
    }
}

export class Link{
    title:string = ""
    url:string = ""
    desc:string = ""
    ico:string = ""
    tags:string[] = []

    constructor(title:string, url:string, desc:string = "", ico:string = "", tags:string[] = []){
        this.title = title
        this.url = url
        this.desc = desc
        this.ico = ico
        this.tags = tags
    }
}