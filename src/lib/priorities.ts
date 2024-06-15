import { storage } from "./storage";

export interface Priority {
    id: number;
    title: string;
    completedAt: Date | null;
    createdAt: Date;
}

export async function loadPriorities(): Promise<Priority[]> {
    const rows = await storage.select("SELECT * FROM priorities");
    if (Array.isArray(rows)) {
        return rows.map((row: any) => ({
            id: row.id,
            title: row.title,
            createdAt: new Date(row.created_at),
            completedAt: row.completed_at
                ? new Date(row.completed_at)
                : null,
        }));
    }
    return [];
}

export async function createPriority(title: string): Promise<Priority> {
    const currentTime = new Date();
    const result = await storage.execute(
        "INSERT INTO priorities (title, created_at) VALUES ($1, $2)",
        [title, currentTime],
    );

    return {
        id: result.lastInsertId,
        title: title,
        createdAt: currentTime,
        completedAt: null,
    };
}

export async function completePriority(priority: Priority): Promise<void> {
    const currentTime = new Date();
    await storage.execute(
        "UPDATE priorities SET completed_at = $1 WHERE id = $2",
        [currentTime, priority.id],
    );
    priority.completedAt = currentTime;
}
