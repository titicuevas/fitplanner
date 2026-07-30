export type AuthUser = {
    id: number;
    name: string;
    email: string;
    objective?: string | null;
    profile_photo_url?: string | null;
    email_verified_at?: string | null;
};

export type FlashProps = {
    message?: string | null;
    error?: string | null;
};
