<script lang="ts">
    import { onMount } from "svelte";
    import { storage } from "./lib/storage";
    import {
        createPriority,
        loadPriorities,
        type Priority as PriorityType,
    } from "./lib/priorities";
    import Priority from "./components/Priority.svelte";

    let priorities: PriorityType[] = [];
    let newPriorityTitle = "";

    onMount(async () => {
        priorities = await loadPriorities();
    });

    async function addPriority() {
        if (!newPriorityTitle) {
            return;
        }
        if (newPriorityTitle.trim() === "") {
            return;
        }

        const newPriority = await createPriority(newPriorityTitle);

        priorities = [...priorities, newPriority];
        newPriorityTitle = "";
    }

    async function deletAll() {
        await storage.execute("DELETE FROM priorities");
        priorities = [];
    }
</script>

<main class="container flex flex-col h-full">
    <h1 class="text-xl">Priorities</h1>
    <div class="grow overflow-auto">
        {#each priorities as priority}
            <Priority {priority} />
        {/each}
    </div>
    <div>
        <button on:click={deletAll} class="border border-red-800 p-2"
            >Delete all</button
        >
        <form on:submit|preventDefault={addPriority}>
            <input
                bind:value={newPriorityTitle}
                type="text"
                placeholder="Add new item"
                class="border dark:border-zinc-600 rounded-lg p-2 w-full dark:bg-zinc-800 dark:text-zinc-50"
            />
            <button class="w-full p-2">Add</button>
        </form>
    </div>
</main>

<style>
</style>
