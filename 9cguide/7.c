#include <stdio.h>

int main(void)
{
	int year;

	printf("西暦年を入力してください > ");
	scanf("%d", &year);

	if (year % 4 == 0) {
		printf("夏季五輪が開催されます\n");
		return 0;
	}
	if (year % 2 == 0) {
		printf("冬季五輪が開催されます\n");
		return 0;
	}

	printf("五輪は開催されません\n");

	return 0;
}
