# Frontend Architecture Documentation

## 📁 Folder Structure

```
interface/
├── src/
│   ├── app/                          # Application initialization
│   │   ├── api/
│   │   │   └── config.ts             # API configuration
│   │   ├── hooks/
│   │   │   └── useApi.ts             # Generic API hook
│   │   ├── App.tsx                   # Root component
│   │   └── main.tsx                  # Entry point
│   │
│   ├── features/                     # Feature-based modules
│   │   ├── company-search/           # Search companies in Brønnøysund
│   │   │   ├── api/
│   │   │   │   └── companySearch.api.ts
│   │   │   ├── components/
│   │   │   │   ├── SearchInput.tsx
│   │   │   │   ├── CompanyListExternal.tsx
│   │   │   │   └── CompanySearchSection.tsx
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── hooks/
│   │   │       └── useCompanySearch.ts
│   │   │
│   │   ├── companies/                # Manage saved companies
│   │   │   ├── api/
│   │   │   │   └── companies.api.ts
│   │   │   ├── components/
│   │   │   │   ├── CompanyForm.tsx
│   │   │   │   ├── CompanyItem.tsx
│   │   │   │   └── SavedCompaniesList.tsx
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   └── hooks/
│   │   │       └── useCompanies.ts
│   │   │
│   │   └── notes/                    # Manage company notes
│   │       ├── api/
│   │       │   └── notes.api.ts
│   │       ├── components/
│   │       │   └── NoteForm.tsx
│   │       ├── types/
│   │       │   └── index.ts
│   │       └── hooks/
│   │           └── useNote.ts
│   │
│   ├── shared/                       # Reusable global resources
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── types/
│   │   │   └── api.types.ts          # Shared API types
│   │   ├── hooks/
│   │   │   └── useDebounce.ts
│   │   ├── utils/
│   │   │   └── fetchClient.ts        # Fetch wrapper
│   │   └── styles/
│   │       └── tailwind.css
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── .env.example
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 🎯 Principles

### Feature-Based Organization
- Each feature is self-contained with its own:
  - Components
  - API calls
  - Types/Interfaces
  - Hooks
  
### Minimal Global State
- Use React hooks (useState, useContext)
- No Redux or MobX
- Each feature manages its own state

### API Encapsulation
- API calls in `*.api.ts` files
- Centralized fetch client in `shared/utils/fetchClient.ts`
- Configuration in `app/api/config.ts`

### Component Principles
- Single Responsibility Principle (SRP)
- Small, focused components
- Props-based composition
- No prop drilling (use custom hooks instead)

## 📦 Files Created

### Type Definitions
- ✅ `shared/types/api.types.ts` - Generic API types
- ✅ `features/company-search/types/index.ts` - Search types
- ✅ `features/companies/types/index.ts` - Company types
- ✅ `features/notes/types/index.ts` - Note types

### Configuration & Utilities
- ✅ `app/api/config.ts` - API configuration
- ✅ `shared/utils/fetchClient.ts` - HTTP client
- ✅ `app/hooks/useApi.ts` - Generic API hook
- ✅ `shared/hooks/useDebounce.ts` - Debounce hook

### Configuration Files
- ✅ `tsconfig.app.json` - Added path aliases (@/*)
- ✅ `vite.config.ts` - Added resolve alias
- ✅ `.env.example` - Environment variables template

## 🚀 Next Steps (Крок 2)

1. Create base UI components (Button, Input, etc.)
2. Implement API clients for each feature
3. Build feature-specific hooks
4. Create feature components
5. Integrate everything in App.tsx
