/**
 * Convierte claves tipo "es_ES", "pt_BR" a "es", "pt", etc.
 * - Ignora valores no-objeto (null, array, primitivos) devolviendo {}.
 * - Si hay duplicados (ej. "es_ES" y "es_PR"), mantiene el PRIMERO que aparezca.
 */
export function mapperLangs<T = unknown>(translations: unknown): Record<string, T> {
  if (
    translations === null ||
    typeof translations !== 'object' ||
    Array.isArray(translations)
  ) {
    return {};
  }

  const obj = translations as Record<string, T>;
  const out: Record<string, T> = {};

  for (const [key, value] of Object.entries(obj)) {
    // soporta "es_ES" o "es-ES" o solo "es"
    const base = key.split(/[_-]/)[0];
    if (!(base in out)) {
      out[base] = value as T;
    }
  }

  return out;
}
