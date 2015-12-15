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

	public static String truncate(final String target, final Charset charset, final int byteLength) {
		if (target == null || target.isEmpty()) {
			return target;
		}

		CharsetEncoder encoder = charset.newEncoder();

		if (byteLength >= encoder.maxBytesPerChar() * target.length()) {
			return target;
		}

		CharBuffer in = CharBuffer.wrap(new char[Math.min(target.length(), byteLength)]);
		target.getChars(0, Math.min(target.length(), in.length()), in.array(), 0);

		ByteBuffer out = ByteBuffer.allocate(byteLength);
		encoder.reset();

		CoderResult result;
		if (in.hasRemaining()) {
			result = encoder.encode(in, out, true);
		} else {
			result = CoderResult.UNDERFLOW;
		}

		if (result.isUnderflow()) {
			encoder.flush(out);
		}

		return ((CharBuffer)in.flip()).toString();
	}

}
