#include <stdio.h>
#include <stdlib.h>

typedef struct {
	char name[256];
	int age;
	char gender[256];
} person;

void input(person*, int);
void output(person*, int);

int main(void)
{
	person *people;

	int n = 10;
	people = (person*)malloc(sizeof(person) * n);

	int i = 0;

	while (1) {
		input(&people[i], i);
		if (people[i].age == -1) {
			break;
		}
		i++;
		if (i >= n) {
			n += 10;
			people = (person*)realloc(people, sizeof(person) * n);
		}
	}

	for (int j = 0; j < i; j++) {
		output(&people[j], j);
	}

	free(people);

	return 0;
}

void input(person *p, int i)
{
	printf("%d人目\n", i + 1);
	printf("名前 > ");
	scanf("%s", p->name);
	printf("年齢 > ");
	scanf("%d", &p->age);
	printf("性別 > ");
	scanf("%s", p->gender);
}

void output(person *p, int i)
{
	printf("%d人目 {\n", i + 1);
	printf("  名前 %s\n", p->name);
	printf("  年齢 %d\n", p->age);
	printf("  性別 %s\n", p->gender);
	printf("}\n");
}
