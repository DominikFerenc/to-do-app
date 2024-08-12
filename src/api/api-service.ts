import { Task } from "../types/task";
import api from "./api";

export const fetchTasks = async (): Promise<Task[]> => {
    try {
        const response = await api.get<Task[]>('/tasks');
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

export const fetchTaskById = async (id: number): Promise<Task> => {
    try {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching task with id ${id}:`, error);
        throw error;
    }
};

export const createTask = async (newTask: Omit<Task, "id">): Promise<Task> => {
    try {
        const response = await api.post<Task>('/tasks', newTask);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}

export const updateTask = async (id: number, updateTask: Task): Promise<Task> => {
    try {
        const response = await api.put<Task>(`/tasks/${id}`, updateTask);
        return response.data;
    } catch (error) {
        console.error(`Error updating task with id ${id}:`, error);
        throw error;
    }
}

export const deleteTask = async (id: number): Promise<void> => {
    try {
        await api.delete(`/tasks/${id}`);
    } catch (error) {
        console.error(`Error deleting task with id ${id}:`, error);
        throw error;
    }
}

export const toggleTaskComplete = async (id: number): Promise<Task> => {
    try {
        const response = await api.patch<Task>(`/tasks/${id}/toggle`);
        return response.data;
    } catch (error) {
        console.error(`Error toggling task completion with id ${id}:`, error);
        throw error;
    }
}