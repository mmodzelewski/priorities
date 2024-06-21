<script lang="ts">
    import { prioritiesStore, type Priority } from "../lib/priorities.svelte";

    let { priority }: { priority: Priority } = $props();
    let priorities = prioritiesStore();

    async function complete() {
        priorities.complete(priority);
    }
</script>

<div class="px-4 py-4 flex align-middle justify-between">
    <div>
        {priority.title}
        {#if priority.completedAt}
            <span>:checkmark:</span>
        {/if}
    </div>
    <button onclick={complete}>Complete</button>
</div>
