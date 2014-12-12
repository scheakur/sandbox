#include <stdio.h>

int main()
{
	int score = -1;

	while (score < 0 || score > 100) {
		printf("点数 (0〜100) を入力してください > ");
		scanf("%d", &score);
	}

	printf("入力された点数は%d点\n", score);

	return 0;
}
