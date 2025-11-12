export interface CommunityRecord {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  coverImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityMemberRecord {
  id: number;
  communityId: number;
  name: string;
  title: string | null;
  role: string | null;
  year: string | null;
  rank: number | null;
  imageUrl: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityWithMembers extends CommunityRecord {
  members: CommunityMemberRecord[];
}

export interface CommunityMemberPayload {
  id?: number;
  name: string;
  title?: string | null;
  role?: string | null;
  year?: string | null;
  rank?: number | null;
  imageUrl?: string | null;
  bio?: string | null;
}

export interface CreateCommunityPayload {
  name: string;
  slug: string;
  description?: string | null;
  coverImageUrl?: string | null;
  members?: CommunityMemberPayload[];
}

export interface UpdateCommunityPayload {
  name?: string;
  slug?: string;
  description?: string | null;
  coverImageUrl?: string | null;
  members?: (CommunityMemberPayload & { id?: number })[] | null;
}

export interface CommunitiesResponse<T = CommunityWithMembers | CommunityWithMembers[]> {
  data: T;
}
