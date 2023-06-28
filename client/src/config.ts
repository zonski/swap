export const config = {
  serverUrl:  import.meta.env.VITE_SERVER_URL || 'server-url-not-set',
  auth0: {
    domain: import.meta.env.VITE_AUTH0_DOMAIN || 'auth0-domain-not-set',
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID || 'auth0-client-id-not-set',
    audience: import.meta.env.VITE_AUTH0_AUDIENCE || 'auth0-audience-not-set',
    redirectUri: import.meta.env.VITE_AUTH0_REDIRECT_URI || window.location.origin,
  }
}
