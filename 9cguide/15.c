#include <stdio.h>

void chooseMinMax(int[], int, int*, int*);

int main(void)
{
	int n = 10;
	int nums[n];

	for (int i = 0; i < n;) {
		printf("0〜100の数値を入力してください [%2d/%d] (-1で終了) > ", i + 1, n);
		scanf("%d", &nums[i]);
		if (nums[i] == -1) {
			break;
		}
		if (nums[i] >= 0 && nums[i] <= 100) {
			i++;
		}
	}

	int min = nums[0];
	int max = nums[0];

	chooseMinMax(nums, n, &min, &max);

	printf("最小値: %d\n", min);
	printf("最大値: %d\n", max);

	return 0;
}


void chooseMinMax(int nums[], int n, int *min, int *max)
{
	for (int i = 0; i < n; i++) {
		int x = nums[i];
		if (x == -1) {
			return;
		}
		if (x < *min) {
			*min = x;
		}
		if (x > *max) {
			*max = x;
		}
	}
}
