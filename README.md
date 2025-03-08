# ts-rpn

## Usage

### CLI

```console
$ deno task cli -h
Usage: deno task cli [options] [<arguments>]

Options:
  -h, --help        Show this message
  -d, --debug       Show debug information
  -e, --expression  Evaluate the given expression
  -f, --file        Evaluate the expression from the given file
$ deno task cli -e '1 2 +'
3
$ deno task cli -f examples/addition.rpn
3
$ deno task cli -d -e '1 2 +'
1 . 2 +
1 2 . +
3 .....
3
$ deno task cli -d -e "12 3 * 4 / 56 7 / 8 / 9 * -"
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

## Web

```console
$ deno task web
```
