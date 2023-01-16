//These paths are relative to root path '/'
//They have not a slash at the beginning!
export const PATH = {
  LOGIN: 'login',
  SIGN_UP: 'signup',
  PROFILE: 'profile',
  CARDS: 'cards',
  PACK: 'pack',
  ERROR: '404',
  NEW_PASSWORD: 'new-password/:token',
  RESTORE_PASSWORD: 'restore-password',
  TEST: 'test',
  CHECK_EMAIL: 'check-email',
} as const
