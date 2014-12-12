#include <stdio.h>

int main(int argc, char* argv[])
{
	int month;

	printf("月を入力してください > ");
	scanf("%d", &month);

	char* jaMonthName[] = {
		"睦月",
		"如月",
		"弥生",
		"卯月",
		"皐月",
		"水無月",
		"文月",
		"葉月",
		"長月",
		"神無月",
		"霜月",
		"師走"
	};

	int len = sizeof(jaMonthName) / sizeof(jaMonthName[0]);

	if (month < 1 || month > len) {
		printf("そんな月はありません\n");
		return 1;
	}

	printf("%d月は%sです\n", month, jaMonthName[month - 1]);
	return 0;
}
