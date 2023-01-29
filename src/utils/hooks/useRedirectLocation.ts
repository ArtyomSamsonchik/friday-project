import { Location, useLocation } from 'react-router-dom'

export interface RedirectLocation extends Location {
  state: { path?: string }
}

export const useRedirectLocation: () => RedirectLocation = useLocation
