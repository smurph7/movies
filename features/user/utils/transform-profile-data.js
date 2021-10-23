export function transformProfileData(data) {
  return {
    userMetadata: data?.user_metadata,
    createdAt: data?.created_at,
    emailVerified: data?.email_verified,
    email: data?.email,
    familyName: data?.family_name,
    givenName: data?.given_name,
    name: data?.name,
    identities: data?.identities,
    nickname: data?.nickname,
    picture: data?.picture,
    userId: data?.user_id
  };
}
