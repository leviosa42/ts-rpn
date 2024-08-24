# ts-rpn

## Usage

```sh
$ deno run src/cli.ts -h
Usage: deno run src/cli.ts [options] [<arguments>]

Options:
  -h, --help        Show this message
  -d, --debug       Show debug information
  -e, --expression  Evaluate the given expression
  -f, --file        Evaluate the expression from the given file
$ deno run src/cli.ts -e '1 2 +'
3
$ deno run src/cli.ts -f examples/addition.rpn
3
$ deno run src/cli.ts -d -e '1 2 +'
1 . 2 +
1 2 . +
3 .....
3
$ deno run src/cli.ts -d -e "12 3 * 4 / 56 7 / 8 / 9 * -"
12 . 3 * 4 / 56 7 / 8 / 9 * -
12 3 . * 4 / 56 7 / 8 / 9 * -
36 ..... 4 / 56 7 / 8 / 9 * -
36 4 ..... / 56 7 / 8 / 9 * -
9 ......... 56 7 / 8 / 9 * -
9 56 ......... 7 / 8 / 9 * -
9 56 7 ......... / 8 / 9 * -
9 8 ............. 8 / 9 * -
9 8 8 ............. / 9 * -
9 1 ................. 9 * -
9 1 9 ................. * -
9 9 ..................... -
0 .........................
0
```
