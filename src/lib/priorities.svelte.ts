import { storage } from "./storage";

export interface Priority {
    id: number;
    title: string;
    completedAt: Date | null;
    createdAt: Date;
}

let priorities: readonly Priority[] = $state.frozen([]);
loadPriorities();

export function prioritiesStore() {
    return {
        get all() { return priorities; },
        create: create,
        complete: complete,
        deleteAll: deleteAll,
    };
}

async function loadPriorities(): Promise<void> {
    const rows = await storage.select("SELECT * FROM priorities");
    if (Array.isArray(rows)) {
        priorities = rows.map((row: any) => ({
            id: row.id,
            title: row.title,
            createdAt: new Date(row.created_at),
            completedAt: row.completed_at
                ? new Date(row.completed_at)
                : null,
        }));
    }
}

async function create(title: string): Promise<void> {
    const currentTime = new Date();
    await storage.execute(
        "INSERT INTO priorities (title, created_at) VALUES ($1, $2)",
        [title, currentTime],
    );
    await loadPriorities();
}

async function complete(priority: Priority): Promise<void> {
    const currentTime = new Date();
    await storage.execute(
        "UPDATE priorities SET completed_at = $1 WHERE id = $2",
        [currentTime, priority.id],
    );
    loadPriorities();
}

async function deleteAll(): Promise<void> {
    await storage.execute("DELETE FROM priorities");
    await loadPriorities();
}


