# Prompts Used for Debugging

This document records prompts used during development for debugging and error handling only. AI was used approximately 40% for debugging, while 60% of development was manual.

## Express Server Issues

### Trust Proxy Error
```
Error on Render deployment:
"ValidationError: The 'X-Forwarded-For' header is set but Express 'trust proxy' is false"
How to fix for Render.com?
```

## CORS Configuration

### CORS Blocking Frontend
```
Getting CORS error:
"Access to fetch blocked by CORS policy"
Frontend on Vercel, backend on Render. How to configure CORS for multiple origins?
```

### Multiple Origins
```
How to configure Express CORS to allow:
- http://localhost:3000
- https://app.vercel.app
- https://api.onrender.com
```

## React & Tailwind Issues

### Hot Reload Not Working
```
React hot reload stopped working after adding Tailwind CSS.
Changes require full page refresh. How to fix?
```

## Drag and Drop Issues

### Drag Handle Not Responding
```
Drag handle (grip icon) not responding to drag events.
Using react-beautiful-dnd@13.1.1
What am I missing?
```

## OpenRouter API Integration

### Response Parsing
```
OpenRouter returns response but can't access content.
What's correct way to extract: completion.choices[0]...?
```

### JSON Parsing
```
Claude wraps JSON in markdown code blocks.
How to reliably extract and parse JSON from this format?
```

## Frontend-Backend Connection

### Status Page Unknown
```
Frontend shows "UNKNOWN" but direct API call works.
Backend API returns correct JSON.
What to check for frontend connection?
```

## State Management

### Tasks Not Updating After Drag
```
After drag-and-drop, tasks move visually but state doesn't update.
Tasks revert on re-render. How to properly update state?
```

## Form Validation


### Validation Timing
```
Errors show before user finishes typing.
Want errors only after onBlur or form submit.
How to implement "touched" field tracking?
```

## Performance

### Slow Re-renders
```
Laggy when dragging in large lists (50+ tasks).
How to optimize React Beautiful DnD performance?
Use React.memo or virtualize list?
```

### API Calls on Every Keystroke
```
Auto-save calling API on every character.
Need to debounce. Best React pattern?
```