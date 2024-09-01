import * as rpn from './core/index.ts';

import { parseArgs } from 'https://deno.land/std/cli/parse_args.ts';

const { _: args, ...flags } = parseArgs(Deno.args, {
  alias: {
    help: 'h',
    expression: 'e',
    verbose: 'v',
  },
  boolean: [
    'verbose',
    'help',
    'expression',
  ],
});

if (flags.help) {
  const message = String.raw`Usage: deno run src/cli.ts [options] [<arguments>]

Options:
  -h, --help        Show this message
  -v, --verbose     Show verbose output
  -e, --expression  Evaluate the given expression`;
  console.log(message);
  Deno.exit(0);
}

if (flags.expression) {
  const scanned = rpn.scan(args.join(' '));
  const queue = rpn.tokenize(scanned);
  const stack = rpn.interpret(queue);
  if (flags.verbose) {
    console.log('Scanned:', scanned);
    console.log('Queue:', queue);
    console.log('Stack:', stack);
  } else {
    console.log(stack[0].value);
  }
  Deno.exit(0);
}
