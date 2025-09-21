# Tutorial Order Configuration

This directory contains tutorials with customizable level ordering. Each tutorial can define its own level order using either `order.json` or `order.ts` files.

## Configuration Files

### order.json (Recommended)

Create an `order.json` file in your tutorial directory to define the level order:

```json
{
  "levels": [
    "level1",
    "level2", 
    "level3",
    "completed"
  ],
  "metadata": {
    "description": "Tutorial progression description",
    "version": "1.0.0",
    "lastUpdated": "2024-01-01"
  }
}
```

### order.ts (Advanced)

For more complex configurations, you can use a TypeScript file:

```typescript
// Tutorial level order configuration
export const levels = [
  'level1',
  'level2', 
  'level3',
  'completed'
]

export const metadata = {
  description: 'Tutorial progression description',
  version: '1.0.0',
  lastUpdated: '2024-01-01'
}

// Optional: Level-specific metadata
export const levelMetadata = {
  level1: {
    title: 'Getting Started',
    description: 'Basic setup and concepts',
    estimatedTime: '30 minutes'
  },
  level2: {
    title: 'Enhanced Features', 
    description: 'Adding advanced functionality',
    estimatedTime: '45 minutes'
  }
  // ... more levels
}
```

## How It Works

1. **Priority**: `order.json` is checked first, then `order.ts` as fallback
2. **Fallback**: If neither file exists, uses default order: `['beginner', 'level1', 'basic', 'intermediate', 'advanced', 'level2', 'level3', 'completed']`
3. **Flexibility**: Levels not in the order configuration are sorted alphabetically at the end
4. **Error Handling**: Invalid configuration files are logged as warnings and fallback to default order

## Benefits

- **Custom Ordering**: Each tutorial can have its own logical progression
- **Maintainable**: Easy to reorder levels without code changes
- **Flexible**: Support for both simple JSON and complex TypeScript configurations
- **Backward Compatible**: Existing tutorials without order files continue to work
- **Type Safe**: TypeScript files provide better IDE support and type checking

## Examples

### Simple Tutorial (order.json)
```json
{
  "levels": ["beginner", "intermediate", "advanced"]
}
```

### Complex Tutorial (order.ts)
```typescript
export const levels = [
  'setup',
  'basics',
  'intermediate', 
  'advanced',
  'final-project'
]

export const levelMetadata = {
  setup: { title: 'Environment Setup', difficulty: 'beginner' },
  basics: { title: 'Core Concepts', difficulty: 'beginner' },
  intermediate: { title: 'Advanced Features', difficulty: 'intermediate' },
  advanced: { title: 'Expert Techniques', difficulty: 'advanced' },
  'final-project': { title: 'Complete Project', difficulty: 'advanced' }
}
```

## Migration

To migrate existing tutorials:

1. Create an `order.json` file in your tutorial directory
2. List your levels in the desired order
3. The system will automatically use the new ordering

No code changes required!
