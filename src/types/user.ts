export interface UserSession {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  isHost: boolean;
  wishlistListingIds: string[];
}
