import type { AuthUser } from '@/types/auth';

export function avatarUrl(user: Pick<AuthUser, 'name' | 'profile_photo_url'>): string {
    if (user.profile_photo_url) {
        return user.profile_photo_url;
    }

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=111827&color=fff`;
}
