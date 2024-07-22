<script lang="ts">
    import { jsonHomepageDataStore } from '$lib/store';
    import { control } from '$lib/HomepageController';
    import type { Homepage } from '$lib/Homepage.class';
    import { parse, stringify } from '$lib/tomlController';

    const BOM = new Uint8Array([0xEF,0xBB,0xBF])

    export let active:boolean
    let formDivElement:HTMLDivElement
    let formTAElement:HTMLTextAreaElement
    let formData:string = goToml($jsonHomepageDataStore)
    let isTextAreaEditable = false
    let errorTitle:string = ""
    let errorCpt:string = ""
    let errorShow:boolean = false

    let successTitle:string = ""
    let successShow:boolean = false

    function goToml(homepage:Homepage):string{
        let result = stringify(homepage)
        return result
    }

    function downloadToml () {
        const blob = new Blob([BOM, goToml($jsonHomepageDataStore)], {type:"application/toml;charset=utf-8"})
        download(blob, ".toml") 
    }

    /**
     * Implement a custom download file
     * @param blob the binaries to download
     * @param extensionName the name of the file
     */
     function download(blob: Blob, extensionName:string):void{
        var url = URL.createObjectURL(blob)
        var downloadLink = document.createElement("a")
        downloadLink.href = url
        downloadLink.download = "homepage" 
                                + '_' 
                                + toYYYYMMDD_hhmm(new Date()) 
                                + extensionName
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink) 
    }

    
    /**
     * Return the date to a string validating the format YYYYMMDD_HHmm
     * @param date the date to parse into a ISO date format YYYYMMDD_HHmm
     * @returns string the format YYYYMMDD_HHmm
     */
     function toYYYYMMDD_hhmm(date:Date):string{
        return date.getFullYear().toString().padStart(4, '0')
            + (date.getMonth()+1).toString().padStart(2, '0')
            + date.getDate().toString().padStart(2, '0')
            + '_'
            + date.getHours().toString().padStart(2, '0')
            + date.getMinutes().toString().padStart(2, '0')
    }

    function editForm(){
        formData = goToml($jsonHomepageDataStore)
        isTextAreaEditable = true
    }

    function saveForm(){
        let value = formTAElement.value.trim()

        if(!value || value.trim() === ""){
            showError("La configuration est vide")
            return
        }
        
        let o:Record<string,any>
        try{
            o = parse(value) as Homepage
        } catch (e:any){
            showError("La configuration n'est pas compatible TOML", e.message)
            return
        }

        control(o).then(response =>{
            if(response === ""){
                //Message de succcès
                successTitle = "Configuration sauvegardée"
                successShow = true
                setTimeout(function(){
                    successShow = false
                }, 2000);
                return
            } else {
                showError(response)
                return
            }
        })
            
    }

    function cancelForm(){
        goToml($jsonHomepageDataStore)
        isTextAreaEditable = false 
    }

    function showError(title:string, cpt:string=""){
        errorTitle = title
        errorCpt = cpt
        errorShow = true
        setTimeout(function(){
            errorShow = false
        }, 5000);
    }

</script>


<div class="links" class:active>
    <div class="action">
        <input type="button" disabled={isTextAreaEditable} value="Télécharger la configuration active" on:click={downloadToml}/>
        <input type="button" disabled={isTextAreaEditable} value="Editer la configuration" on:click={editForm}/>
        <input type="button" disabled={!isTextAreaEditable} value="Enregistrer les modifications" on:click={saveForm}/>
        <input type="button" disabled={!isTextAreaEditable} value="Annuler les modifications" on:click={cancelForm}/>
    </div>
    
    <div bind:this={formDivElement} class="form">
        {#key formData}
            {#if isTextAreaEditable}
            <textarea  bind:this={formTAElement} value={formData}/>
            {:else}
            <textarea  bind:this={formTAElement} value={formData} disabled/>
            {/if}
            
        {/key}
    </div>

    <div id="error" class="error" class:errorShow>
        <p>{errorTitle}</p>
        {#if errorCpt !== ""}<p>{errorCpt}</p>{/if}
    </div>
    <div id="success" class="success" class:successShow>
        <p>{successTitle}</p>
    </div>
</div>

<style>
.links{
    display: none;
    margin: 2em;
}
.active{
    display: block;
}
.action{
    margin: 1em 0;
}
input{
  display: inline-block;
  background-color: rgba(24, 48, 60, 0.5);
  padding: 1em;
  margin: 0 1em;
  font-size: 0.7em;
  border:none;
  cursor: pointer;
  color: #FFF;
}
input:disabled{
    cursor: auto;
    color: #999;
    background-color: rgba(24, 48, 60, 0.8);
}
input:enabled:hover{
  background-color: rgba(24, 48, 60, 0.3);
}
.form{
    margin: 1em 0;
}
textarea{
    width: 900px;
    height: 400px;
    white-space: pre;
}
.error, .success{
    display:none;
    position: fixed;
    bottom: 10px;
    width: 30%;
    margin: 0 auto;
    padding: 0.1em;
    text-align: center;
    left: 40%;
    background-color: rgba(60, 24, 26, 0.9);
}
.success{
    background-color: rgba(24, 60, 26, 0.9);
}
.errorShow, .successShow{
    display: block;
}
</style>