#include <stdio.h>
#include <stdbool.h>

bool isOlympicHeld(int);

int main(void)
{
	int year;
	printf("西暦年を入力してください > ");
	scanf("%d", &year);

	if (isOlympicHeld(year)) {
		printf("%d年にはオリンピックが開催されます\n", year);
	} else {
		printf("%d年にはオリンピックが開催されません\n", year);
	}

	return 0;
}

bool isOlympicHeld(int year) {
	return year % 2 == 0;
}
