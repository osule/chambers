# Chambers

Exploring to protective spaces with HTTP basic authentication mechanism.

## What was tried

###  Using Realms
This was a futile endeavor. Maybe useful with services/spaces owning their access rules.

When a client authenticates to a protective space, credentials are shared for subsequent requests across the domain regardless of the realm.

Services owning access rules will check if client should be allowed access to resources in its space.

### Basic auth service serving as a sentinel
Here a single auth service will hold defined access rules for different spaces.

Access logic can still be enforced by services by proxy and response returned when client credentials satisfies access rules.
