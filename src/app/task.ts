export class Task {
    _id: string;
    taskName:  string;
    projectId: string;
    startDate: Date;
    endDate: Date;
    priority: number;
    parentTask: string;
    completed: boolean;
    managerEmpId: number;
}
