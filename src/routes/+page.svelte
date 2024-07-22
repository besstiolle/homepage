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


<h1>Welcome to {$jsonHomepageDataStore.title}</h1>

<div class="tabs">
{#each $jsonHomepageDataStore.tabs as tab, index}
    <div class="tab"  class:tabactive={index === currentIndex} title={tab.desc}
        on:click={() => showTab(index)} on:keydown={() => showTab(index)} role="button" tabindex=0>{tab.title}</div>
{/each}
    <div class="tab"  class:tabactive={CONF_INDEX === currentIndex} title="Panel de Configuration"
    on:click={() => showTab(CONF_INDEX)} on:keydown={() => showTab(CONF_INDEX)} role="button" tabindex=0>Config</div>
{#each $jsonHomepageDataStore.tabs as tab, index}
    <LinksComponent active={index == currentIndex} links={tab.links} />
{/each}
    <ConfigComponent active={CONF_INDEX == currentIndex} />
</div>

<style>
    
:global(html, body){
    height: 100%;    
}
:global(body){
  background-repeat: no-repeat;
  background-position: center;
  height: 100%;
  font-size: 1.2em;
  color: #FFF;
}

.tabs{

}
.tab{
  display: inline-block;
  background-color: rgba(0,0,0,0.5);
  padding: 1% 5%;
  margin: 0 2%;
  font-size: 1.3em;
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