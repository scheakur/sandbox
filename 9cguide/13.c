#include <stdio.h>

int main(void)
{
	int n = 10;
	int num[n];

	for (int i = 0; i < n; i++) {
		printf("数値を入力してください [%2d/10] > ", i + 1);
		scanf("%d", num + i);
	}

	char *sep = "";
	printf("入力した数値は逆順に");
	for (int i = n; i > 0; i--) {
		printf("%s%d", sep, num[i - 1]);
		sep = ", ";
	}
	printf("です\n");

	return 0;
}
