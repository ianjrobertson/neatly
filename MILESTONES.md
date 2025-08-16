# Neatly MVP Development Milestones

This document outlines the development roadmap for building the Neatly cooking recipe app MVP.

## Overview

The MVP will focus on the core functionality: URL input, recipe parsing, shopping list generation, and basic export capabilities. Authentication and advanced features will be implemented in later phases.

---

## Phase 1: Frontend Foundation (Weeks 1-2)

### Milestone 1.1: UI Library Setup & Design System
**Goal**: Establish consistent, accessible UI components

**Tasks**:
- Install and configure shadcn/ui component library
- Set up design tokens (colors, typography, spacing)
- Create base layout components (Header, Footer, Container)
- Implement dark/light mode toggle
- Add loading states and error boundaries

**UI Libraries to Consider**:
- **shadcn/ui** (Recommended): Radix-based components with Tailwind
- **Headless UI**: For custom designs with accessibility
- **React Hook Form**: Form state management
- **Framer Motion**: Smooth animations and transitions

**Key Components Needed**:
- Input fields with validation states
- Buttons (primary, secondary, loading states)
- Cards for recipe/shopping list display
- Modal/Dialog components
- Toast notifications
- Copy-to-clipboard functionality

### Milestone 1.2: Core UI Pages
**Goal**: Build main user interface screens

**Pages to Create**:
1. **Landing Page**: Hero section, feature highlights, CTA
2. **Recipe Input Page**: URL input form with validation
3. **Shopping List View**: Grouped ingredients display
4. **Export Options**: Copy, email, SMS interfaces

**UX Improvements**:
- Progressive disclosure (show advanced options gradually)
- Inline validation with helpful error messages
- Optimistic UI updates
- Keyboard shortcuts for power users
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA)

### Milestone 1.3: State Management
**Goal**: Implement client-side state management

**Tasks**:
- Set up Zustand or Context API for global state
- Implement recipe and shopping list state
- Add undo/redo functionality for list editing
- Local storage persistence for drafts
- Real-time updates between components

---

## Phase 2: Backend Architecture (Weeks 3-4)

### Milestone 2.1: API Design & Structure
**Goal**: Design scalable backend architecture

**API Endpoints**:
```
POST /api/recipes/parse
  - Input: { url: string }
  - Output: { ingredients: Ingredient[], metadata: RecipeMetadata }

POST /api/shopping-lists
  - Input: { recipeIds: string[] }
  - Output: { groupedIngredients: GroupedIngredients }

GET /api/recipes/:id
POST /api/recipes/:id/favorite
DELETE /api/recipes/:id
```

**Data Models**:
```typescript
interface Recipe {
  id: string
  url: string
  title: string
  ingredients: Ingredient[]
  servings?: number
  cookTime?: number
  createdAt: Date
}

interface Ingredient {
  id: string
  name: string
  amount?: string
  unit?: string
  category: IngredientCategory
  original: string // Raw parsed text
}

interface ShoppingList {
  id: string
  recipes: Recipe[]
  groupedIngredients: Record<IngredientCategory, Ingredient[]>
  createdAt: Date
}
```

### Milestone 2.2: Recipe Parsing Implementation
**Goal**: Extract ingredients from recipe websites

**Technical Approach**:
1. **Primary**: JSON-LD structured data parsing
   - Most recipe sites use Schema.org Recipe format
   - Extract from `<script type="application/ld+json">`

2. **Fallback**: HTML parsing with cheerio
   - Target common selectors (`.recipe-ingredient`, `[itemprop="recipeIngredient"]`)
   - Site-specific parsers for popular recipe sites

3. **AI Enhancement**: OpenAI/Claude for complex cases
   - Parse unstructured ingredient text
   - Standardize units and quantities
   - Categorize ingredients

**Libraries to Use**:
- **Puppeteer/Playwright**: Headless browser for JS-heavy sites
- **Cheerio**: Server-side HTML parsing
- **node-html-parser**: Lightweight HTML parsing
- **Recipe-scraper libraries**: Check existing npm packages

### Milestone 2.3: Supabase Integration
**Goal**: Set up database and authentication

**Database Schema**:
```sql
-- Users table (handled by Supabase Auth)
-- Recipes table
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  url TEXT NOT NULL,
  title TEXT,
  ingredients JSONB,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Shopping Lists table
CREATE TABLE shopping_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT,
  recipe_ids UUID[],
  grouped_ingredients JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Supabase Features to Implement**:
- Row Level Security (RLS) policies
- Real-time subscriptions for collaborative lists
- Edge Functions for parsing logic
- Storage for recipe images (future)

---

## Phase 3: Core Features Integration (Weeks 5-6)

### Milestone 3.1: Recipe Parsing Pipeline
**Goal**: End-to-end recipe processing

**Tasks**:
- Create Vercel Edge Function for parsing
- Implement error handling and retries
- Add parsing confidence scores
- Cache parsed recipes to avoid re-processing
- Handle rate limiting for external sites

### Milestone 3.2: Shopping List Generation
**Goal**: Smart ingredient grouping and optimization

**Features**:
- Ingredient categorization (produce, dairy, meat, etc.)
- Quantity aggregation (2 cups + 1 cup = 3 cups)
- Unit conversion (1 lb = 16 oz)
- Duplicate detection with fuzzy matching
- Custom category ordering for store layout

**Algorithm Considerations**:
- Use ingredient databases (USDA, Open Food Facts)
- Machine learning for category prediction
- Store layout optimization (future enhancement)

### Milestone 3.3: Export Functionality
**Goal**: Multiple sharing options

**Export Options**:
1. **Copy to Clipboard**: Formatted text with checkboxes
2. **Email**: HTML template with grouped ingredients
3. **SMS**: Condensed format for mobile
4. **Print**: Clean, printer-friendly layout

---

## Phase 4: Polish & Optimization (Week 7)

### Milestone 4.1: Performance & SEO
**Goal**: Production-ready optimization

**Tasks**:
- Implement Next.js ISR for recipe caching
- Add meta tags and Open Graph data
- Optimize images and lazy loading
- Bundle analysis and code splitting
- PWA configuration (service worker, manifest)

### Milestone 4.2: Testing & Quality Assurance
**Goal**: Comprehensive testing coverage

**Testing Strategy**:
- Unit tests for parsing logic (Jest/Vitest)
- Integration tests for API endpoints
- E2E tests for user flows (Playwright)
- Performance testing with Lighthouse
- Cross-browser compatibility testing

---

## Phase 5: Deployment & Monitoring (Week 8)

### Milestone 5.1: Production Deployment
**Goal**: Live MVP deployment

**Tasks**:
- Vercel deployment configuration
- Environment variable management
- Database migrations and seeding
- Error tracking (Sentry)
- Analytics setup (Vercel Analytics)

### Milestone 5.2: User Feedback & Iteration
**Goal**: Gather user insights for improvements

**Tasks**:
- Beta user onboarding
- Feedback collection system
- Usage analytics implementation
- Performance monitoring
- Bug triage and fixes

---

## Technical Decisions & Considerations

### Why shadcn/ui?
- Excellent TypeScript support
- Tailwind CSS integration
- Accessible by default (Radix primitives)
- Customizable and not vendor-locked
- Great documentation and community

### Why Supabase?
- Built-in authentication
- Real-time capabilities
- PostgreSQL with full SQL access
- Edge Functions for serverless logic
- Generous free tier

### Why Vercel Edge Functions?
- Fast cold starts
- Global distribution
- Seamless Next.js integration
- Built-in caching and optimization

---

## Success Metrics

### Technical Metrics
- Recipe parsing accuracy > 90%
- Page load times < 2 seconds
- API response times < 500ms
- Zero critical accessibility violations

### User Experience Metrics
- Time to generate shopping list < 30 seconds
- Mobile usability score > 95
- User task completion rate > 85%
- Net Promoter Score (NPS) > 7

---

## Future Enhancements (Post-MVP)

1. **User Authentication**: Phone/email signup
2. **Recipe Management**: Save, organize, favorite recipes
3. **AI Voice Assistant**: Cooking guidance and Q&A
4. **Smart Home Integration**: Alexa/Google Assistant
5. **Social Features**: Share lists, collaborative cooking
6. **Advanced Parsing**: Image-based recipe extraction
7. **Nutrition Information**: Calorie and macro tracking
8. **Meal Planning**: Weekly menu generation

This milestone structure provides a clear path from basic functionality to a polished MVP while maintaining flexibility for future enhancements.