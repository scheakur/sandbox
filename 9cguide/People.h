#ifndef __PEOPLE_H__
#define __PEOPLE_H__


#include <stdio.h>

typedef struct {
	char name[256];
	int age;
	int sex;
} People;

extern void InputPeople(People *data);
extern void ShowPeople(People *data);

#endif
