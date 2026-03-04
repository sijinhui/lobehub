import type { AiFullModelCard } from 'model-bank';

// Explicit prefix → provider map for cases where the model name prefix differs from providerId
// e.g. "claude-*" → "anthropic" (not "claude")
const MODEL_PREFIX_TO_PROVIDER: Record<string, string> = {
  claude: 'anthropic',
  gemini: 'google',
};

const resolveCanonicalProvider = (modelId: string): string | undefined => {
  const key = Object.keys(MODEL_PREFIX_TO_PROVIDER).find((p) => modelId.startsWith(`${p}-`));
  return key ? MODEL_PREFIX_TO_PROVIDER[key] : undefined;
};

/**
 * Get the model property value, first from the specified provider, and then from other providers as a fallback.
 * @param modelId The ID of the model.
 * @param propertyName The name of the property.
 * @param providerId Optional provider ID for an exact match.
 * @returns The property value or a default value.
 */
export const getModelPropertyWithFallback = async <T>(
  modelId: string,
  propertyName: keyof AiFullModelCard,
  providerId?: string,
): Promise<T> => {
  const { LOBE_DEFAULT_MODEL_LIST } = await import('model-bank');

  // Step 1: If providerId is provided, prioritize an exact match (same provider + same id)
  if (providerId) {
    const exactMatch = LOBE_DEFAULT_MODEL_LIST.find(
      (m) => m.id === modelId && m.providerId === providerId,
    );

    if (exactMatch && exactMatch[propertyName] !== undefined) {
      return exactMatch[propertyName] as T;
    }
  }

  // Step 2: Resolve canonical provider via prefix map, then prefix heuristic, then first match
  const canonicalProviderId = resolveCanonicalProvider(modelId);
  const fallbackMatch =
    (canonicalProviderId
      ? LOBE_DEFAULT_MODEL_LIST.find(
          (m) => m.id === modelId && m.providerId === canonicalProviderId,
        )
      : undefined) ??
    LOBE_DEFAULT_MODEL_LIST.find((m) => m.id === modelId && modelId.startsWith(m.providerId)) ??
    LOBE_DEFAULT_MODEL_LIST.find((m) => m.id === modelId);

  if (fallbackMatch && fallbackMatch[propertyName] !== undefined) {
    return fallbackMatch[propertyName] as T;
  }

  // Step 3: Return a default value
  return (propertyName === 'type' ? 'chat' : undefined) as T;
};
