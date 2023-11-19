export interface Incident {
    id: number,
    incident_created_at: string;
    msgId: string,
    chatId: string,
    fromUserId: string,
    text: string,
    isRead: boolean,
    workShift: string
}

export interface IncidentsSchema {
    data?: Incident[];
    isLoading: boolean;
    error?: string;
}
