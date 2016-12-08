#include <stdio.h>
#include <string.h>

char *reverse(char *str) {
	char tmp, *start, *end;
	size_t len;

	if (str == 0) {
		return "";
	}

	len = strlen(str);

	if (len == 0) {
		return "";
	}

	start = str;
	end = start + len - 1;

	while (start < end) {
		tmp = *start;
		*start = *end;
		*end = tmp;
		start += 1;
		end -= 1;
	}

	return str;
}

int main() {
	char str[] = "abcde\0ghi";
	printf("%s\n", reverse(str));
	return 0;
}
