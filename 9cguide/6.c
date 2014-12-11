#include <stdio.h>

int main(void)
{
	int price;
	printf("定価を入力してください > ");
	scanf("%d", &price);

	printf("1割引 = %d円\n", (int)(price * 0.9));
	printf("3割引 = %d円\n", (int)(price * 0.7));
	printf("5割引 = %d円\n", (int)(price * 0.5));
	printf("8割引 = %d円\n", (int)(price * 0.2));

	return 0;
}
