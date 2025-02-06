# Smart Search Component

## Overview
Create a reusable search component with autocomplete functionality that helps users find countries. The component should demonstrate your understanding of React best practices, state management, and user experience considerations.

## Core Requirements

### UI Elements
- Search input field with search icon
- Dropdown showing filtered results
- Clear button (appears when input has text)
- Loading indicator
- "No results found" message when appropriate

### Search Functionality
- Begin searching after user types 3 characters
- Implement 300ms debounce on search
- Mock API call with 500ms delay
- Highlight matching text in search results
- Search through both country names and capitals

### Sample Data Structure
```javascript
const countries = [
  {
    id: 1,
    name: 'United States',
    capital: 'Washington DC',
    population: '331M'
  },
  {
    id: 2,
    name: 'United Kingdom',
    capital: 'London',
    population: '67M'
  },
  {
    id: 3,
    name: 'France',
    capital: 'Paris',
    population: '67M'
  },
  {
    id: 4,
    name: 'Germany',
    capital: 'Berlin',
    population: '83M'
  },
  {
    id: 5,
    name: 'Italy',
    capital: 'Rome',
    population: '60M'
  },
  {
    id: 6,
    name: 'Spain',
    capital: 'Madrid',
    population: '47M'
  },
  {
    id: 7,
    name: 'Canada',
    capital: 'Ottawa',
    population: '38M'
  },
  {
    id: 8,
    name: 'Australia',
    capital: 'Canberra',
    population: '25M'
  },
  {
    id: 9,
    name: 'Japan',
    capital: 'Tokyo',
    population: '126M'
  },
  {
    id: 10,
    name: 'Brazil',
    capital: 'Brasília',
    population: '212M'
  }
]
```

## Technical Requirements

### Must Have
- Built using React (Any Frameworks) (hooks required)
- Proper handling of loading states
- Error handling for failed API calls
- Responsive design
- Basic styling (CSS-in-JS, Tailwind, or regular CSS)

### State Management
- Manage input value
- Track selected/highlighted item
- Handle loading states
- Store filtered results

## Evaluation Criteria

### Code Quality
- Clean, readable code
- Proper component organization
- Effective state management
- Error handling
- TypeScript usage (optional but preferred)

### Performance
- Efficient search logic
- Proper debouncing implementation
- Minimal unnecessary re-renders

## Submission
- Provide source code through a GitHub repository
- Include README with:
  - Setup instructions
  - Assumptions made
  - Trade-offs considered
  - Future improvements