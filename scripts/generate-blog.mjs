import { ContentGenerator } from 'gen-blog'

const config = {
  // API Keys (optional if set in .env)
  openaiKey: 'your-openai-key',
  geminiKey: 'AIzaSyCC50RWRzR7-1qLQFHMWrQjKQsvO-RKv8Y',

  // Output Configuration
  outputDir: './output', // Output directory
  blogExtension: 'md', // Blog file extension
  shortsExtension: 'txt', // Shorts file extension
  dateFormat: 'YYYY-MM-DD', // Date format
  verbose: true, // Enable logging
  prefix: 'custom', // File prefix
}

const generator = await new ContentGenerator(config).init()
const results = await generator.generate('https://www.youtube.com/watch?v=pC6JRoW_L34', {
  blog: true,
  shorts: false,
})
