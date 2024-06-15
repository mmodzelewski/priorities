<script lang="ts">
    import { completePriority, type Priority } from "../lib/priorities";

    export let priority: Priority;

    async function complete() {
        completePriority(priority);
    }
</script>

<div class="px-4 py-4 flex align-middle justify-between">
    <div>
        {priority.title}
        {#if priority.completedAt}
            <span>:checkmark:</span>
        {/if}
    </div>
    <button on:click={complete}>Complete</button>
</div>
