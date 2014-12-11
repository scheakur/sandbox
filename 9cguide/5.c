#include <stdio.h>

int main(void)
{
	int juice = 198;
	int milk = 138;
	int money = 1000;
	double tax = 1.05;

	int payment = (int)((juice + milk * 2) * tax);
	int change = money - payment;

	printf("おつり%d円", change);
	return 0;
}
