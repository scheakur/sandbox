import java.lang.management.ManagementFactory;
import java.lang.management.MemoryPoolMXBean;
import java.lang.management.MemoryUsage;

// HOW TO RUN
// javac MetaspaceSizer.java; java -XX:MaxMetaspaceSize=10m -XX:MetaspaceSize=1m -XX:+PrintGC  MetaspaceSizer
// javac MetaspaceSizer.java; java -XX:MaxMetaspaceSize=10m -XX:MetaspaceSize=10m -XX:+PrintGC  MetaspaceSizer

public class MetaspaceSizer {

	public static void printMetaspaceSize() {
		 for (MemoryPoolMXBean bean : ManagementFactory.getMemoryPoolMXBeans()) {
			if (bean.getName().equals("Metaspace")) {
				MemoryUsage usage = bean.getUsage();
				long init = Math.round(usage.getInit() / 1024.0);
				long used = Math.round(usage.getUsed() / 1024.0);
				long commited = Math.round(usage.getCommitted() / 1024.0);
				long max = Math.round(usage.getMax() / 1024.0);
				System.out.println(String.format("| %10dk | %10dk | %10dk | %10dk |", init, used, commited, max));
			}
		}
	}

	static class ClassGenerator extends ClassLoader implements Runnable {
		final int num;
		final int digits;

		public ClassGenerator(int num) {
			this.num = num;
			this.digits = String.valueOf(num).length() - 1;
		}

		@Override
		public void run() {
			System.out.println(String.format("| %11s | %11s | %11s | %11s |", "Init", "Used", "Commited", "Max"));
			printMetaspaceSize();

			int i = 0;
			try {
				for (; i < this.num; i++) {
					if (i % 1_000 == 0) {
						printMetaspaceSize();
					}
					newClass(i);
				}
			} catch (Throwable e) {
				printMetaspaceSize();
				System.out.println("Number of defined classes = " + i);
				throw e;
			}
		}

		void newClass(int n) {
			/*
			 * Byte codes of the result of `javac -g:none A123456.java`.
			 *
			 * Below is the source code of A123456.java.
			 *
			 *     class A123456 {
			 *     }
			 */
			int bytes[] = {
				0xca, 0xfe, 0xba, 0xbe, 0x00, 0x00, 0x00, 0x34,
				0x00, 0x0a, 0x0a, 0x00, 0x03, 0x00, 0x07, 0x07,
				0x00, 0x08, 0x07, 0x00, 0x09, 0x01, 0x00, 0x06,
				0x3c, 0x69, 0x6e, 0x69, 0x74, 0x3e, 0x01, 0x00,
				0x03, 0x28, 0x29, 0x56, 0x01, 0x00, 0x04, 0x43,
				0x6f, 0x64, 0x65, 0x0c, 0x00, 0x04, 0x00, 0x05,
				0x01, 0x00, 0x07, 0x41, 0x31, 0x32, 0x33, 0x34,
				0x35, 0x36, 0x01, 0x00, 0x10, 0x6a, 0x61, 0x76,
				0x61, 0x2f, 0x6c, 0x61, 0x6e, 0x67, 0x2f, 0x4f,
				0x62, 0x6a, 0x65, 0x63, 0x74, 0x00, 0x20, 0x00,
				0x02, 0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00,
				0x01, 0x00, 0x00, 0x00, 0x04, 0x00, 0x05, 0x00,
				0x01, 0x00, 0x06, 0x00, 0x00, 0x00, 0x11, 0x00,
				0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x05, 0x2a,
				0xb7, 0x00, 0x01, 0xb1, 0x00, 0x00, 0x00, 0x00,
				0x00, 0x00
			};

			String name = String.format("A%0" + digits + "d", n);

			// Change class name
			int namePos = 51;
			for (int i = 0; i < name.length(); i++) {
				bytes[namePos + i] = name.charAt(i);
			}

			byte b[] = new byte[bytes.length];
			for (int i = 0; i < bytes.length; i++) {
				b[i] = (byte)bytes[i];
			}

			defineClass(name, b, 0, b.length);
		}

	}

	public static void main(final String... args) {
		new ClassGenerator(1_000_000).run();
	}

}
