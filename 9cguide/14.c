#include <stdio.h>
#include <string.h>

int main(void)
{
	char firstName[256], lastName[256];

	printf("名字を入力してください > ");
	scanf("%s", lastName);
	printf("名前を入力してください > ");
	scanf("%s", firstName);

	char *fullName = strcat(strcat(firstName, " "), lastName);

	printf("Hello, %s!\n", fullName);
	return 0;
}
