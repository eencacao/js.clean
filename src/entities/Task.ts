export class Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;

    constructor(id: string, title: string, description: string, completed: boolean = false) {
        if (!title) throw new Error("Title cannot be empty");
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
    }

    complete(): void {
        this.completed = true;
    }

    updateTitle(newTitle: string): void {
        if (!newTitle) throw new Error("Title cannot be empty");
        this.title = newTitle;
    }
}