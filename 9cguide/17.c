#include <stdio.h>

int main(void)
{
	FILE *file;

	char data[][3][256] = {
		{"番号", "名前", "テストの平均点"},
		{"1", "野比のび太", "0"},
		{"2", "源静香", "90"},
		{"3", "剛田武", "40"},
		{"4", "骨川スネ夫", "70"}
	};

	int rows = sizeof(data) / sizeof(data[0]);
	int cols = sizeof(data[0]) / sizeof(data[0][0]);

	file = fopen("test.csv", "w");

	for (int i = 0; i < rows; i++) {
		char *sep = "";
		for (int j = 0; j < cols; j++) {
			fprintf(file, "%s%s", sep, data[i][j]);
			sep = ", ";
		}
		fprintf(file, "\n");
	}

	return 0;
}
