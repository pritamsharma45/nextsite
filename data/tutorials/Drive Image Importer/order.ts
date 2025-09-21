// Tutorial level order configuration
// This file defines the order in which tutorial levels should be displayed

export const levels = [
  'level1',
  'level2', 
  'level3',
  'completed'
]

export const metadata = {
  description: 'Drive Image Importer tutorial progression',
  version: '1.0.0',
  lastUpdated: '2024-01-01'
}

// Optional: You can also define level-specific metadata
export const levelMetadata = {
  level1: {
    title: 'Getting Started',
    description: 'Basic Drive API integration',
    estimatedTime: '30 minutes'
  },
  level2: {
    title: 'Enhanced Features', 
    description: 'Adding search and filtering',
    estimatedTime: '45 minutes'
  },
  level3: {
    title: 'Advanced UI',
    description: 'Custom sidebar and batch operations',
    estimatedTime: '60 minutes'
  },
  completed: {
    title: 'Final Implementation',
    description: 'Complete working application',
    estimatedTime: '90 minutes'
  }
}
