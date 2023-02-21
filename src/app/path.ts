//These paths are relative to root path '/'
//They have not a slash at the beginning!
export const PATH = {
  LOGIN: 'login',
  SIGN_UP: 'signup',
  PROFILE: 'profile',
  PACKS: 'packs',
  CARDS: 'cards',
  ERROR: '404',
  EMPTY: 'empty',
  NEW_PASSWORD: 'new-password/:token',
  RESTORE_PASSWORD: 'restore-password',
  TEST: 'test',
  CHECK_EMAIL: 'check-email',
  LEARN: 'learn',
} as const

export const URL_PARAMS = {
  PACK_ID: 'packId',
  PACK_NAME: 'packName',
} as const
