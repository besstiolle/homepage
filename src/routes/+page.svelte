<script lang="ts">
    import { browser } from '$app/environment';
    import ConfigComponent from './ConfigComponent.svelte';
    import LinksComponent from './LinksComponent.svelte';
    import { jsonHomepageDataStore } from '$lib/store';

    const CONF_INDEX = 999999
    let currentIndex = 0

    function init(){
        if(!browser){return}

        document.body.style.backgroundImage = $jsonHomepageDataStore.bgimg?`url(/${$jsonHomepageDataStore.bgimg})`:"none"
        document.body.style.backgroundColor = $jsonHomepageDataStore.bgcolor?$jsonHomepageDataStore.bgcolor:"#000000"
    }

    function showTab(index:number):void{
        currentIndex = index
    }

    init()
</script>

<svelte:head>
    <title>{$jsonHomepageDataStore.title}</title>
    <meta name="description" content="{$jsonHomepageDataStore.title}"/> 
</svelte:head>


<h1>{$jsonHomepageDataStore.title}</h1>

<div class="tabs">
{#each $jsonHomepageDataStore.tabs as tab, index}
    <div class="tab"  class:tabactive={index === currentIndex} title={tab.desc}
        on:click={() => showTab(index)} on:keydown={() => showTab(index)} role="button" tabindex=0>{tab.title}</div>
{/each}
    <div class="tab"  class:tabactive={CONF_INDEX === currentIndex} title="Panel de Configuration"
    on:click={() => showTab(CONF_INDEX)} on:keydown={() => showTab(CONF_INDEX)} role="button" tabindex=0>Config</div>
</div>
{#each $jsonHomepageDataStore.tabs as tab, index}
    <LinksComponent active={index == currentIndex} links={tab.links} />
{/each}
    <ConfigComponent active={CONF_INDEX == currentIndex} />


<style>
    
:global(html, body){
    height: 100%;    
}
:global(body){
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  color: #FFF;
  font-size: 1vw;
}

@media only screen and (max-width: 1280px) {
    :global(body){
        font-size: 1.5vw;
    }
}
@media only screen and (max-width: 1080px) {
    :global(body){
        font-size: 2vw;
    }
}
@media only screen and (max-width: 600px) {
    :global(body){
        font-size: 3vw;
    }
}


.tabs{
    display: flex;
    flex-wrap: wrap;
}
.tab{
    flex-basis: 250px;
    flex-grow: 1;
    flex-shrink: 1;
    align-content:center;
    text-align: center;
    background-color: rgba(0,0,0,0.5);
    padding: 1% 5%;
    margin: 0 1% 0.5% 1%;
    font-size: 1.5em;
    border: 1px solid transparent;
}
.tab:hover{
    border: 1px solid #555;
    cursor: pointer;
}

.tabactive, .tabactive:hover{
    background-color: rgba(0,0,0,0.3);
}
</style>