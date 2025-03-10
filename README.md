# ts-rpn

## Usage

```console
$ deno task cli  # CLI
$ deno task -q cli  # CLI (recommended)
$ deno task web  # Web
```

### CLI

```console
$ deno task -q cli -h
Usage: deno task cli [options] [<arguments>]

Options:
  -h, --help        Show this message
  -v, --verbose     Show verbose output
  -e, --expression  Evaluate the given expression
```

#### Examples

```sh
# 1 + 2
$ deno task -q cli -e "1 2 +"
3
# (1 + 2) * 3
$ deno task -q cli -e "1 2 + 3 *"
9
# 12 * 3 / 4 - 56 / 7 / 8 * 9
$ deno task -q cli -e "12 3 * 4 / 56 7 / 8 / 9 * -"
0
```

Function names are case-insensitive.

```sh
# max(log2(2), ln(2))
deno task -q cli -e "2 ln 2 log2 max" 1
```

Constants with prefix `C_`

```sh
# sin(pi / 3) * 2
$ deno task -q cli -e "C_PI 3 / sin 2 *"
1.7320508075688772
```

### Verbose

```sh
$ deno task -q cli -v -e "1 2 +"
Scanned: [ "1", "2", "+" ]
Queue: [
  { type: "operand", category: "number", data: "1", value: 1 },
  { type: "operand", category: "number", data: "2", value: 2 },
  {
    type: "operator",
    category: "symbol",
    name: "addition",
    arity: 2,
    execute: [Function: execute],
    data: "+"
  }
]
Stack: [ { type: "operand", category: "number", data: "3", value: 3 } ]
```

### Web

```sh
$ deno task web
```
