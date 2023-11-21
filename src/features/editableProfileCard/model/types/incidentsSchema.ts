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

export interface Chat {
    dayOfYear: number,
    type: number,
    chatId: string,
    fromModel: number,
    fromUser: number,
    isActive: boolean
}

export interface ActiveDialog {
    date: string,
    dayOfYear: number,
    type: number,
    totalFromModel: number,
    totalFromUser: number,
    totalActive: number,
    chats: Chat[]
}

export interface ActiveDialogsSchema {
    data?: ActiveDialog[];
    isLoading: boolean;
    error?: string;
}
