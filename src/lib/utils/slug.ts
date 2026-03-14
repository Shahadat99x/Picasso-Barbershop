/**
 * Utility for generating URL-safe slugs from text
 */

/**
 * Normalizes a string to a URL-safe slug
 * - Converts to lowercase
 * - Replaces spaces and special chars with hyphens
 * - Removes chars that aren't alphanumerics, hyphens, or underscores
 * - Removes leading/trailing hyphens
 * - Replaces multiple hyphens with single
 */
export function slugify(text: string): string {
  if (!text) return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, multiple hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generates a slug from a title or name
 * @param text - The source text (title, name, etc.)
 * @returns URL-safe slug
 */
export function generateSlug(text: string): string {
  return slugify(text);
}

/**
 * Type for tracking manual slug edit state
 * - 'auto': slug is auto-generated from title
 * - 'manual': user has manually edited the slug
 */
export type SlugEditState = 'auto' | 'manual';

/**
 * Creates a slug handler for use in forms
 * @param options Configuration options
 * @returns Object with handlers and state
 */
export interface UseSlugOptions {
  /** The source field to generate slug from (e.g., 'title_lt') */
  sourceField: string;
  /** The slug field name in the form */
  slugField: string;
}

export interface SlugHandlerResult {
  /** Current slug value */
  slug: string;
  /** Edit state - 'auto' or 'manual' */
  editState: SlugEditState;
  /** Handler for when the source field changes */
  handleSourceChange: (value: string) => void;
  /** Handler for when the slug field is manually edited */
  handleSlugChange: (value: string) => void;
  /** Handler to reset back to auto mode */
  handleRegenerate: () => void;
}

/**
 * Creates slug handling logic for forms
 * Call handleSourceChange when the source field (title/name) changes
 * Call handleSlugChange when the slug field is edited by user
 * 
 * @param initialSource - Initial value of the source field
 * @param initialSlug - Initial value of the slug field  
 * @param initialEditState - Initial edit state ('auto' or 'manual')
 * @returns Slug handler functions
 */
export function createSlugHandler(
  initialSource: string = '',
  initialSlug: string = '',
  initialEditState: SlugEditState = 'auto'
): SlugHandlerResult {
  let editState = initialEditState;
  let currentSlug = initialSlug || (initialSource ? generateSlug(initialSource) : '');

  return {
    get slug() {
      return currentSlug;
    },
    get editState() {
      return editState;
    },
    handleSourceChange(value: string) {
      // Only auto-generate if in auto mode
      if (editState === 'auto' && value) {
        currentSlug = generateSlug(value);
      }
    },
    handleSlugChange(value: string) {
      // User manually edited - switch to manual mode
      currentSlug = value;
      editState = 'manual';
    },
    handleRegenerate() {
      // Force regenerate from source (reset to auto)
      editState = 'auto';
    }
  };
}
