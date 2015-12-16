import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.nio.charset.CoderResult;

public class StringTruncater {

	public static void main(final String... args) {
		System.out.println(truncate("ほげふが", Charset.forName("Windows-31j"), 1));
		System.out.println(truncate("ほげふが", Charset.forName("Windows-31j"), 2));
		System.out.println(truncate("ほげふが", Charset.forName("Windows-31j"), 3));
		System.out.println(truncate("ほげふが", Charset.forName("Windows-31j"), 4));
		System.out.println(truncate("ほげふが", Charset.forName("Windows-31j"), 5));
		System.out.println(truncate("ほげふが", Charset.forName("Windows-31j"), 6));
		System.out.println(truncate("ほげふが", Charset.forName("Windows-31j"), 7));
	}

	public static String truncate(final String str, final Charset charset, final int len) {
		if (str == null || str.isEmpty()) {
			return str;
		}

		CharsetEncoder encoder = charset.newEncoder();

		if (len >= encoder.maxBytesPerChar() * str.length()) {
			return str;
		}

		CharBuffer in = CharBuffer.wrap(new char[Math.min(str.length(), len)]);
		str.getChars(0, Math.min(str.length(), in.length()), in.array(), 0);

		ByteBuffer out = ByteBuffer.allocate(len);
		encoder.reset();

		CoderResult result = (in.hasRemaining()) ? encoder.encode(in, out, true) : CoderResult.UNDERFLOW;

		if (result.isUnderflow()) {
			encoder.flush(out);
		}

		return ((CharBuffer)in.flip()).toString();
	}

}
