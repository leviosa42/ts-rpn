import { evaluate } from './core.ts';
import { parseArgs } from 'https://deno.land/std/cli/parse_args.ts';

const { _: args, ...flags } = parseArgs(Deno.args, {
  alias: {
    debug: 'd',
    help: 'h',
    expression: 'e',
  },
  boolean: [
    'debug',
    'help',
    'expression',
  ],
});

if (flags.help) {
  const message = String.raw`Usage: deno run src/cli.ts [options] [<arguments>]

Options:
  -h, --help        Show this message
  -d, --debug       Show debug information
  -e, --expression  Evaluate the given expression
  -f, --file        Evaluate the expression from the given file`;
  console.log(message);
  Deno.exit(0);
}

const evaluateOptions = { debug: flags.debug };

if (flags.expression) {
  if (args.length === 0) {
    console.error('ERR: Missing expression');
    Deno.exit(1);
  }
  try {
    console.log(evaluate(args.join(' '), evaluateOptions));
    Deno.exit(0);
  } catch (e) {
    console.error('ERR:', e.message);
    Deno.exit(1);
  }
}

if (flags.file) {
  if (args.length === 0) {
    console.error('ERR: Missing file path');
    Deno.exit(1);
  }
  console.error('ERR: WIP');
  Deno.exit(1);
}
