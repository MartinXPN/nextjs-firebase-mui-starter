export interface UserInfo {
    id: string;
    imageUrl?: string;
    displayName?: string;
}

export interface UserPreferences {
    unsubscribeWeeklyProgress?: boolean;
    unsubscribeAnnouncements?: boolean;
}
