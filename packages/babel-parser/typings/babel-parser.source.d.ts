// Type definitions for @babel/parser
// Project: https://github.com/babel/babel/tree/main/packages/babel-parser
// Definitions by: Troy Gerwien <https://github.com/yortus>
//                 Marvin Hagemeister <https://github.com/marvinhagemeister>
//                 Avi Vahl <https://github.com/AviVahl>
// TypeScript Version: 2.9

/**
 * Parse the provided code as an entire ECMAScript program.
 */
export function parse(
  input: string,
  options?: ParserOptions
): ParseResult<import("@babel/types").File>;

/**
 * Parse the provided code as a single expression.
 */
export function parseExpression(
  input: string,
  options?: ParserOptions
): ParseResult<import("@babel/types").Expression>;

export interface ParserOptions {
  /**
   * By default, import and export declarations can only appear at a program's top level.
   * Setting this option to true allows them anywhere where a statement is allowed.
   */
  allowImportExportEverywhere?: boolean;

  /**
   * By default, await use is not allowed outside of an async function.
   * Set this to true to accept such code.
   */
  allowAwaitOutsideFunction?: boolean;

  /**
   * By default, a return statement at the top level raises an error.
   * Set this to true to accept such code.
   */
  allowReturnOutsideFunction?: boolean;

  /**
   * By default, new.target use is not allowed outside of a function or class.
   * Set this to true to accept such code.
   */
  allowNewTargetOutsideFunction?: boolean;

  allowSuperOutsideMethod?: boolean;

  /**
   * By default, exported identifiers must refer to a declared variable.
   * Set this to true to allow export statements to reference undeclared variables.
   */
  allowUndeclaredExports?: boolean;

  /**
   * By default, Babel parser JavaScript code according to Annex B syntax.
   * Set this to `false` to disable such behavior.
   */
  annexB?: boolean;

  /**
   * By default, Babel attaches comments to adjacent AST nodes.
   * When this option is set to false, comments are not attached.
   * It can provide up to 30% performance improvement when the input code has many comments.
   * @babel/eslint-parser will set it for you.
   * It is not recommended to use attachComment: false with Babel transform,
   * as doing so removes all the comments in output code, and renders annotations such as
   * /* istanbul ignore next *\/ nonfunctional.
   */
  attachComment?: boolean;

  /**
   * By default, Babel always throws an error when it finds some invalid code.
   * When this option is set to true, it will store the parsing error and
   * try to continue parsing the invalid input file.
   */
  errorRecovery?: boolean;

  /**
   * Indicate the mode the code should be parsed in.
   * Can be one of "script", "module", or "unambiguous". Defaults to "script".
   * "unambiguous" will make @babel/parser attempt to guess, based on the presence
   * of ES6 import or export statements.
   * Files with ES6 imports and exports are considered "module" and are otherwise "script".
   */
  sourceType?: "script" | "module" | "unambiguous";

  /**
   * Correlate output AST nodes with their source filename.
   * Useful when generating code and source maps from the ASTs of multiple input files.
   */
  sourceFilename?: string;

  /**
   * By default, the first line of code parsed is treated as line 1.
   * You can provide a line number to alternatively start with.
   * Useful for integration with other source tools.
   */
  startLine?: number;

  /**
   * By default, the parsed code is treated as if it starts from line 1, column 0.
   * You can provide a column number to alternatively start with.
   * Useful for integration with other source tools.
   */
  startColumn?: number;

  /**
   * Array containing the plugins that you want to enable.
   */
  plugins?: ParserPlugin[];

  /**
   * Should the parser work in strict mode.
   * Defaults to true if sourceType === 'module'. Otherwise, false.
   */
  strictMode?: boolean;

  /**
   * Adds a ranges property to each node: [node.start, node.end]
   */
  ranges?: boolean;

  /**
   * Adds all parsed tokens to a tokens property on the File node.
   */
  tokens?: boolean;

  /**
   * By default, the parser adds information about parentheses by setting
   * `extra.parenthesized` to `true` as needed.
   * When this option is `true` the parser creates `ParenthesizedExpression`
   * AST nodes instead of using the `extra` property.
   */
  createParenthesizedExpressions?: boolean;

  /**
   * By default, `import(foo)` is parsed as `CallExpression(Import, [Identifier(foo)])`.
   * Set this to true to parse it as an `ImportExpression` node.
   */
  createImportExpressions?: boolean;
}

export type ParserPlugin = import("../src/typings").PluginConfig;

export type {
  ParserPluginWithOptions,
  DecoratorsPluginOptions,
  PipelineOperatorPluginOptions,
  RecordAndTuplePluginOptions,
  FlowPluginOptions,
  TypeScriptPluginOptions,
} from "../src/typings";

export const tokTypes: {
  // todo(flow->ts) real token type
  [name: string]: any;
};

export interface ParseError {
  code: string;
  reasonCode: string;
}

export type ParseResult<Result> = Result & {
  errors: ParseError[];
};
