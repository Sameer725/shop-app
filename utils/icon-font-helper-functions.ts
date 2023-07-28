import path from 'path';
import prettier, { BuiltInParserName } from 'prettier';

/**
 * Transforms a given string to SCREAMING_SNAKE_CASE
 * @param input String that should be transformed
 * Modified version from:
 * @see https://www.30secondsofcode.org/js/s/to-snake-case
 */
export function toScreamingSnakeCase(input: string): string {
  if (!input) {
    return input;
  }

  return (
    input
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      ?.map((x) => x.toUpperCase())
      .join('_') ?? ''
  );
}

/**
 * Transforms a given string to camelCase
 * @param input String that should be transformed
 * Modified version from:
 * @see https://www.30secondsofcode.org/js/s/to-camel-case
 */
export function toCamelCase(input: string): string {
  if (!input) {
    return input;
  }

  const s = input
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join('');
  return (s?.slice(0, 1)?.toLowerCase() ?? '') + (s?.slice(1) ?? '');
}

/**
 * Prettifies the given content with the prettier config used in this project
 * @param fileContent Content that should be prettified
 * @param parser Parse, prettier should use
 */
export async function prettifyFileContent(fileContent: string, parser: BuiltInParserName): Promise<string> {
  const prettierOptions = await prettier.resolveConfig(path.resolve(process.cwd(), '.prettierrc.json'));
  return prettier.format(fileContent, { ...prettierOptions, parser });
}
