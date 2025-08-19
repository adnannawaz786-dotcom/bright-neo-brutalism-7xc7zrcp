// Task status constants
export const TASK_STATUSES = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed'
};

// Application routes
export const ROUTES = {
  HOME: '/',
  TASKS: '/tasks',
  COMPLETED: '/completed',
  SETTINGS: '/settings'
};

// Neo-brutalism color palette
export const COLORS = {
  // Primary colors
  PRIMARY: {
    YELLOW: '#FFFF00',
    PINK: '#FF006E',
    CYAN: '#00F5FF',
    LIME: '#CCFF00',
    ORANGE: '#FF8500'
  },
  
  // Background colors
  BACKGROUND: {
    DARK: '#000000',
    LIGHT: '#FFFFFF',
    GRAY: '#808080'
  },
  
  // Border colors
  BORDER: {
    BLACK: '#000000',
    WHITE: '#FFFFFF',
    THICK: '4px'
  },
  
  // Status colors
  STATUS: {
    TODO: '#FFFF00',
    IN_PROGRESS: '#FF8500',
    COMPLETED: '#00FF00',
    ERROR: '#FF0000'
  }
};

// Animation constants
export const ANIMATIONS = {
  DURATION: {
    FAST: 0.2,
    MEDIUM: 0.4,
    SLOW: 0.6
  },
  
  EASING: {
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)'
  }
};

// Layout constants
export const LAYOUT = {
  BORDER_WIDTH: '4px',
  SHADOW_OFFSET: '8px',
  BORDER_RADIUS: '0px',
  MAX_WIDTH: '1200px',
  SPACING: {
    XS: '0.5rem',
    SM: '1rem',
    MD: '1.5rem',
    LG: '2rem',
    XL: '3rem'
  }
};

// Task priorities
export const TASK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

// Priority colors mapping
export const PRIORITY_COLORS = {
  [TASK_PRIORITIES.LOW]: COLORS.STATUS.COMPLETED,
  [TASK_PRIORITIES.MEDIUM]: COLORS.PRIMARY.CYAN,
  [TASK_PRIORITIES.HIGH]: COLORS.PRIMARY.ORANGE,
  [TASK_PRIORITIES.URGENT]: COLORS.PRIMARY.PINK
};

// Local storage keys
export const STORAGE_KEYS = {
  TASKS: 'brutalism_todo_tasks',
  SETTINGS: 'brutalism_todo_settings',
  THEME: 'brutalism_todo_theme'
};

// Default settings
export const DEFAULT_SETTINGS = {
  theme: 'dark',
  animations: true,
  sounds: false,
  autoSave: true
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px'
};