export interface user {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    profile: string
}

export interface message {
    id: string,
    content: string,
    senderId: string,
    roomId: string,
    createdAt: string
}

export interface room {
    id: string,
    isGroupChat: string,
    messages: message[],
    participants: participants[],
    createdAt: string
}

export interface participants{
    user:user
}