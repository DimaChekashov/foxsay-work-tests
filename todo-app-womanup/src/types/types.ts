export interface Todo {
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    endDate: number;
    success: boolean;
    createdAt?: {
        seconds: number;
        nanoseconds: number;
    };
}