# Company Search Application

A full-stack web application for searching and managing Norwegian companies. Built as a technical skill test demonstrating clean architecture, pragmatic design decisions, and professional engineering practices.

## Project Overview

This application allows users to:
- **Search** for companies in the Norwegian Business Register (Brønnøysundregisteret)
- **Save** companies to a local database
- **Add notes** to saved companies for internal reference
- **Delete** company records and associated notes
- **Filter** saved companies by name or organization number

The application integrates with the public [Brønnøysundregisteret API](https://data.brreg.no/enhetsregisteret/api/) for real-time company data and maintains a local PostgreSQL database for user-specific data (saved companies and notes).

## Tech Stack

### Backend
- **.NET 10** - ASP.NET Core web framework
- **C#** - Primary language
- **Entity Framework Core 10** - ORM for database operations
- **PostgreSQL** - Local database via Npgsql
- **Swagger** - API documentation

### Frontend
- **React 19.2** - UI framework
- **TypeScript 5.9** (strict mode) - Type-safe JavaScript
- **Vite 7.2** - Build tool and dev server
- **Tailwind CSS 4.1** - Utility-first styling
- **Node.js** - Runtime environment

## Architecture Overview

### Backend Architecture

The backend follows a **layered feature-based architecture**:

```
api/
├── Features/
│   ├── Companies/           # Save/retrieve user companies
│   │   ├── Controllers/     # HTTP endpoints
│   │   ├── Services/        # Business logic
│   │   ├── Repositories/    # Data access
│   │   ├── DTOs/            # Request/response objects
│   │   └── Entities/        # Database models
│   │
│   ├── CompanySearch/       # External API integration
│   │   ├── Controllers/     # Search endpoints
│   │   ├── Services/        # Search logic & mapping
│   │   ├── Clients/         # Brønnøysund API client
│   │   ├── Mappers/         # DTO transformations
│   │   └── DTOs/            # Request/response objects
│   │
│   └── Notes/               # Company notes management
│       ├── Controllers/     # Note endpoints
│       ├── Services/        # Note logic
│       ├── Repositories/    # Data access
│       ├── DTOs/            # Request/response objects
│       └── Entities/        # Database models
│
├── Infrastructure/
│   ├── Configurations/      # EF Core entity configurations
│   ├── DependencyInjection/ # Service registration
│   ├── Persistence/         # DbContext
│   ├── Middleware/          # Exception handling
│   └── Extensions/          # Helper methods
│
├── Migrations/              # EF Core database migrations
└── Program.cs               # Application entry point
```

**Key Design Decisions:**
- **Repository Pattern** - Abstracts data access, simplifies testing
- **Service Layer** - Encapsulates business logic, keeps controllers thin
- **DTOs** - Clear contracts between layers, prevents ORM leakage
- **Feature Folders** - Related code grouped together for maintainability
- **Dependency Injection** - Configured in `Infrastructure/DependencyInjection/`

### Frontend Architecture

The frontend uses a **feature-based modular architecture**:

```
src/
├── features/
│   ├── company-search/      # Search external registry
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   │
│   ├── companies/           # Manage saved companies
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   └── types/
│   │
│   └── notes/               # Manage notes
│       ├── components/
│       ├── hooks/
│       ├── api/
│       └── types/
│
├── shared/
│   ├── components/          # Reusable UI components
│   ├── contexts/            # React Context for state
│   ├── constants/           # Centralized strings
│   ├── hooks/               # Shared utilities
│   ├── types/               # Global type definitions
│   └── utils/               # Helper functions
│
└── app/
    ├── api/                 # API configuration
    ├── hooks/               # App-level hooks
    └── App.tsx              # Root component
```

**Key Design Decisions:**
- **Feature-Based Modules** - Each feature self-contained, independent of others
- **React Context API** - For shared state (selected company), avoids prop drilling
- **Custom Hooks** - Business logic extracted from components, easily testable
- **Constants Centralization** - All UI strings in one place, ready for i18n
- **Separation of Concerns** - Components focus on rendering, hooks handle state/effects

**No Over-Engineering:**
- No Redux/Zustand - Context API sufficient for this scale
- No complex state machines - Simple useState patterns
- No component libraries - Tailwind CSS provides all styling needs
- Minimal abstraction layers - Direct use of React primitives

## API Overview

### Internal API Endpoints

The backend exposes the following REST endpoints:

#### Company Search (External Registry)
- **GET** `/api/companySearch?query={name/orgNumber}&page={1}&pageSize={10}`
  - Searches Brønnøysundregisteret in real-time
  - Returns paginated results with company details
  - Automatically detects 9-digit org numbers vs. name search

#### Saved Companies (Local Database)
- **POST** `/api/companies` - Create new company record
- **GET** `/api/companies?page={1}&pageSize={10}` - List saved companies
- **GET** `/api/companies/{id}` - Get single company
- **DELETE** `/api/companies/{id}` - Remove company (cascades notes)

#### Company Notes
- **GET** `/api/companies/{companyId}/note` - Retrieve note (404 if none)
- **PUT** `/api/companies/{companyId}/note` - Create or update note (upsert)
- **DELETE** `/api/companies/{companyId}/note` - Remove note

### Data Handling

**External Data (Brønnøysundregisteret):**
- Fetched on demand during search
- Mapped to internal DTO format
- Not persisted (stateless integration)
- Rich company information (address, form, registration status, etc.)

**Internal Data:**
- Minimal company info stored locally (org number, name, address)
- One-to-one relationship with notes (one note per company)
- Cascade delete - removing company removes associated note
- Timestamps tracked for auditing

**Key Difference:**
- External search data is authoritative (always fresh from registry)
- Internal saved data is user curated (subset of fields + user notes)

## Installation & Setup

### Prerequisites
- **.NET 10 SDK** or later
- **Node.js 18** or later (npm or yarn)
- **PostgreSQL 14** or later
- **Git**

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd company-search-app
   ```

2. **Backend Setup**

   Navigate to the API directory:
   ```bash
   cd api
   ```

   Update connection string in `appsettings.Development.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=company_search;Username=postgres;Password=postgres"
     }
   }
   ```

   Restore NuGet packages and apply migrations:
   ```bash
   dotnet restore
   dotnet ef database update
   ```

   Run the backend:
   ```bash
   dotnet run
   ```

   The API will be available at `http://localhost:5062`
   Swagger documentation at `http://localhost:5062/swagger`

3. **Frontend Setup**

   Navigate to the frontend directory:
   ```bash
   cd interface
   ```

   Install dependencies:
   ```bash
   npm install
   ```

   Create `.env.local` (optional, defaults to localhost:5062):
   ```
   VITE_API_URL=http://localhost:5062
   ```

   Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`

## Time Spent

**Total: ~15 hours**

- **Planning & Architecture** (1h) - Database schema, API contracts, component hierarchy, folder structure
- **Backend: Company Search** (1.25h) - Controller, service, Brønnøysund API client, search logic
- **Backend: Saved Companies** (1.5h) - CRUD endpoints, repository pattern, database operations
- **Backend: Notes** (1h) - Service, one-to-one relationship, cascade delete configuration
- **Frontend: Company Search** (1.25h) - SearchInput, SearchResultsPanel components, pagination UI
- **Frontend: Saved Companies** (1.5h) - SavedCompaniesSection component, local filtering/search
- **Frontend: Notes** (1h) - NotePanel component, note editing UI
- **Frontend: Custom Hooks** (1.5h) - useCompanySearch, useCompanies, useNote, business logic extraction
- **Infrastructure** (1h) - React Context (CompanyContext), API client wrapper, DependencyInjection, entity models, migrations
- **Testing & Debugging** (2h) - CORS fixes, HTTP method corrections, TypeScript type issues, layout/pagination fixes
- **Documentation & Styling** (1.5h) - README, architecture docs, Tailwind CSS, LoadingSpinner, minimum loading time utility