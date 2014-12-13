#include <stdio.h>

int isOlympicHeld(int);

enum {
	OLYMPIC_NONE,
	OLYMPIC_SUMMER,
	OLYMPIC_WINTER,
};

int main(void)
{
	int year;
	printf("西暦年を入力してください > ");
	scanf("%d", &year);

	int held = isOlympicHeld(year);

	switch (held) {
	case OLYMPIC_SUMMER:
		printf("%d年には夏季オリンピックが開催されます\n", year);
		break;
	case OLYMPIC_WINTER:
		printf("%d年には冬季オリンピックが開催されます\n", year);
		break;
	case OLYMPIC_NONE:
	default:
		printf("%d年にはオリンピックが開催されません\n", year);
	}

	return 0;
}

int isOlympicHeld(int year)
{
	if (year % 4 == 0) {
		return OLYMPIC_SUMMER;
	}
	if (year % 2 == 0) {
		return OLYMPIC_WINTER;
	}
	return OLYMPIC_NONE;
}

