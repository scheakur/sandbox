import java.text.BreakIterator;

public class CountVisibleChars {

	public static void main(final String... args) {
		String text = "あいうえお\r\nかきくけこ";
		System.out.println(text.length()); // 12
		System.out.println(countVisibleChars(text)); // 11
	}

	public static int countVisibleChars(String text) {
		BreakIterator bi = BreakIterator.getCharacterInstance();
		bi.setText(text);
		int c = 0;
		while (bi.next() != BreakIterator.DONE) {
			c += 1;
		}
		return c;
	}

}
