#include <stdio.h>

typedef struct {
	char name[256];
	int age;
	char gender[256];
} person;

void input(person[], int);
void output(person[], int);

int main(void)
{
	int n = 3;
	person people[n];

	input(people, n);
	output(people, n);

	return 0;
}

void input(person people[], int n)
{
	for (int i = 0; i < n; i++) {
		printf("%d人目\n", i + 1);
		printf("名前 > ");
		scanf("%s", people[i].name);
		printf("年齢 > ");
		scanf("%d", &people[i].age);
		printf("性別 > ");
		scanf("%s", people[i].gender);
	}
}

void output(person people[], int n)
{
	for (int i = 0; i < n; i++) {
		printf("%d人目 {\n", i + 1);
		printf("  名前 %s\n", people[i].name);
		printf("  年齢 %d\n", people[i].age);
		printf("  性別 %s\n", people[i].gender);
		printf("}\n");
	}
}
