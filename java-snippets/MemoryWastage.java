import java.security.SecureRandom;

public class MemoryWastage {

	public static void main(final String... args) {
		SecureRandom r = new SecureRandom();

		for (int i = 0; i < 1_000; i++) {
			long start = System.nanoTime();

			int size = r.nextInt(1_000_000);
			Object[] x = new Object[size];

			long elapsed = (System.nanoTime() - start);

			if (elapsed > 10_000_000) { // over 10ms
				System.out.println("\n"
					+ "size    = " + size + "\n"
					+ "elapsed = " + elapsed / 1_000_000 + "ms\n");
			}
		}
	}

}
