%{
package main

import (
	"fmt"
	"text/scanner"
	"os"
	"strconv"
	"strings"
)

type Expression interface{}

type Token struct {
	token   int
	literal string
}

type NumExpr struct {
	literal string
}

type BinOpExpr struct {
	lhs Expression
	op  rune
	rhs Expression
}
%}

%union{
	token Token
	expr  Expression
}

%type<expr> program
%type<expr> expr
%token<token> number

%left '+', '-'
%left '*', '/'

%%

program
	: expr
	{
		$$ = $1
		yylex.(*Lexer).result = $$
	}

expr
	: number
	{
		$$ = NumExpr{literal: $1.literal}
	}
	| expr '+' expr
	{
		$$ = BinOpExpr{lhs: $1, op: '+', rhs: $3}
	}
	| expr '-' expr
	{
		$$ = BinOpExpr{lhs: $1, op: '-', rhs: $3}
	}
	| expr '*' expr
	{
		$$ = BinOpExpr{lhs: $1, op: '*', rhs: $3}
	}
	| expr '/' expr
	{
		$$ = BinOpExpr{lhs: $1, op: '/', rhs: $3}
	}

%%

type Lexer struct {
	scanner.Scanner
	result Expression
}

func (l *Lexer) Lex(lval *yySymType) int {
	token := int(l.Scan())
	if token == scanner.Int {
		token = number
	}
	lval.token = Token{token: token, literal: l.TokenText()}
	return token
}

func (l *Lexer) Error(e string) {
	panic(e)
}

func main() {
	l := new(Lexer)
	l.Init(strings.NewReader(os.Args[1]))
	yyParse(l)
	fmt.Printf("%#v\n", l.result)
	fmt.Printf("%d\n", eval(l.result))
}

func eval(e Expression) int {
	switch e.(type) {
	case BinOpExpr:
		lhs := eval(e.(BinOpExpr).lhs)
		rhs := eval(e.(BinOpExpr).rhs)

		switch e.(BinOpExpr).op {
		case '+':
			return lhs + rhs
		case '-':
			return lhs - rhs
		case '*':
			return lhs * rhs
		case '/':
			return lhs / rhs
		}
	case NumExpr:
		num, _ := strconv.Atoi(e.(NumExpr).literal)
		return num
	}
	return 0
}
