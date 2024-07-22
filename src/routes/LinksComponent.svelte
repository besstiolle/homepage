<script lang="ts">
    import type { Link } from "$lib/Homepage.class";

    export let links:Link[]
    export let active:boolean
</script>

<div class="links" class:active>
    {#each links as link}
        <a href={link.url} title={link.title} target="_blank"><span class="link" >
                <span class="linktitle">{link.title}</span>
                <span class="linkdesc">{link.desc?" : " +link.desc:""}</span>
                {#if link.tags && link.tags.length > 0}
                    <span class="linktags">
                        {#each link.tags as tag}
                        <span class="tag">[{tag}]</span>
                        {/each}
                    </span>
                {/if}
        </span></a>
    {/each}
</div>

<style>
a, a:focus, a:hover, a:visited{
    text-decoration: none;
    color: #FFF;
}
.links{
    display: none;
}
.active{
    display: block;
}
.link{
    display: inline-block;
    width: 19%;
    background-color: rgba(0,0,0,0.5);
    padding: 2%;
    margin: 2% 5%;
    border: 1px solid transparent;
    min-height: 2em;
}
.link:hover{
    border: 1px solid #555;
}
.linktitle{
    font-weight: bold;
}
.linkdesc{
    font-size: 0.9em;
}
.linktags{
    font-size: 0.7em;
    font-family: monospace;
}
.tag{
    margin: 0 0.3em;
}
</style>