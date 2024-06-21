<script lang="ts">
    import Priority from "./components/Priority.svelte";
    import { prioritiesStore } from "./lib/priorities.svelte";

    let priorities = prioritiesStore();
    let newPriorityTitle = $state("");

    async function addPriority(event: Event) {
        event.preventDefault();
        if (!newPriorityTitle) {
            return;
        }
        if (newPriorityTitle.trim() === "") {
            return;
        }

        await priorities.create(newPriorityTitle);
        newPriorityTitle = "";
    }

    async function deletAll() {
        // todo: remove this
        priorities.deleteAll();
    }
</script>

<main class="container flex flex-col h-full">
    <h1 class="text-xl">Priorities</h1>
    <div class="grow overflow-auto">
        {#each priorities.all as priority (priority.id)}
            <Priority {priority} />
        {/each}
    </div>
    <div>
        <button onclick={deletAll} class="border border-red-800 p-2"
            >Delete all</button
        >
        <form onsubmit={addPriority}>
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
