# Architectural & Design Decisions

## Backend Architecture

### Single-User Application (No Authentication)
**Decision:** No authorization, authentication, or JWT tokens implemented.

**Reasoning:**
- Not required by the specification
- Adding authentication/registration would significantly increase scope (~2-3 hours)
- Focus on demonstrating core architecture and search functionality
- Suitable for internal tool use case

**Future Enhancement:** If multi-user was needed, would add:
- User registration/login with JWT
- Row-level security in database
- User context in API layer
- Audit logging per user

### No Query Caching Layer
**Decision:** Each search query hits Brønnøysundregisteret API fresh, no Redis or in-memory cache.

**Reasoning:**
- External API is fast enough (~500ms typical response)
- Company data changes frequently, caching adds complexity
- For skill test scope, real-time data is more important than performance optimization
- Client can easily observe up-to-date company information

**Future Enhancement:** If performance became bottleneck, would add:
- Redis cache for 15-30 minute TTL
- Cache invalidation strategy
- Rate limiting on external API calls
- Compressed response handling

### Feature-Based Backend Structure
**Decision:** Organized by feature (Companies, CompanySearch, Notes) not by layer.

**Reasoning:**
- Easier to locate related code
- Each feature is independently deployable
- Clear separation of concerns
- Simple to add new features without affecting others
- Reduces cognitive load when navigating codebase

### Repository Pattern with Service Layer
**Decision:** Repository abstracts data access, Service contains business logic.

**Reasoning:**
- Testability: Easy to mock repositories in unit tests
- Separation: Controllers don't know about ORM implementation
- Flexibility: Can swap database later without changing services
- Pragmatic: Not over-abstracted (single database layer sufficient)

### Database Credentials in Config Files
**Decision:** Connection strings stored in `appsettings.Development.json`.

**Reasoning:**
- Sufficient for development/skill test
- Development credentials not sensitive (localhost, test password)
- .gitignore prevents credentials from being committed to production

**Future Enhancement:** For production would use:
- User Secrets (local development)
- Environment variables (production)
- Azure Key Vault / AWS Secrets Manager

## Frontend Architecture

### Feature-Based Module Organization
**Decision:** Features grouped by domain (company-search, companies, notes), not by file type.

**Reasoning:**
- Mirrors backend architecture
- Easier to delete/duplicate features
- Self-contained modules with api/, components/, hooks/, types/
- Clear imports with feature path aliasing

**File Structure Example:**
```
features/company-search/
├── api/          # API calls
├── components/   # UI components
├── hooks/        # Business logic
└── types/        # TypeScript definitions
```

### React Context Over Redux
**Decision:** Used React Context API for shared state (CompanyContext).

**Reasoning:**
- Simpler state management for app this size
- Redux adds unnecessary complexity
- Context is built-in, no dependencies
- Easy to understand and debug

**When Redux Would Be Better:**
- Multiple independent state slices
- Complex action patterns
- DevTools/time-travel debugging needed
- Larger team requiring structure

### Separation: Components vs Hooks
**Decision:** Components focus on rendering, hooks handle all business logic.

**Reasoning:**
- Components become "dumb" and reusable
- Hooks are unit-testable in isolation
- Easy to understand data flow: hooks → state → components → JSX
- No complex logic in render methods

**Example:**
```typescript
// Custom hook handles data fetching
const { companies, isLoading, error, fetchCompanies } = useCompanies();

// Component only renders
export function SavedCompaniesSection() {
  // ... rendering logic only
}
```

### Constants Centralization
**Decision:** All UI strings in `shared/constants/messages.ts`.

**Reasoning:**
- Single source of truth for copy
- Easy to spot hardcoded strings (they'd be missing from imports)
- Ready for i18n without code changes
- Simplifies translation workflow

### Minimum Loading Time for UX
**Decision:** 0.5-1s artificial delay on async operations using `ensureMinimumLoadingTime()` utility.

**Reasoning:**
- Loading spinners should be visible for user perception
- If operation completes in 100ms, UI feels glitchy
- Gives consistent feedback experience
- Prevents accidental double-clicks

**Implementation:**
```typescript
const startTime = Date.now();
const data = await fetchCompanies();
await ensureMinimumLoadingTime(startTime, 1000); // Show spinner min 1s
```

## Interesting Frontend Solutions

### Dual Search Implementation
- **External Search:** Real-time from Brønnøysundregisteret (4 items/page)
- **Saved Companies Search:** Client-side filtering of local database
  
Both use same SearchInput component via `onChange` prop, but different handlers. Shows component reusability.

### One-to-One Company-Note Relationship
**Frontend Logic:**
- When company selected, fetch its note
- When note edited, save back with company context
- When company deleted, note cascade deleted on backend

Demonstrates understanding of database relationships on UI layer.

### Pagination with Dynamic Backend Response
- Backend returns: `items`, `totalPages`, `hasNext`, `hasPrevious`
- Frontend doesn't calculate pages (server is authority)
- Prevents off-by-one errors and ensures consistency

### Context Selection Pattern
```typescript
interface CompanyContextType {
  selectedCompany: Company | null;
  selectedCompanyId: string | null;
  
  selectSearchCompany() // From search results
  selectSavedCompany()  // From saved list
  clearSelection()      // Reset
}
```

Handles two different company sources (external vs saved) with unified selection mechanism.

### TypeScript Strict Mode
- All files use `as const` for string constants (literal types)
- No `any` types anywhere
- Strict null checks enabled
- Props interfaces for all components

Shows commitment to type safety and catching bugs at compile time.

## Trade-offs & Pragmatic Choices

### Not Implemented (But Could Be)
- Authentication/authorization
- Request caching
- Internationalization (constants structure ready)

### Why This Approach Works
For a skill test, demonstrates:
- Understanding of architecture principles
- Ability to make pragmatic trade-offs
- Code clarity over features

This shows more maturity than trying to implement everything.
