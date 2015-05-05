import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit

def doPeriodically(fn, initDelay, period) {
	def executor = Executors.newSingleThreadScheduledExecutor()
	def i = 0

	executor.scheduleWithFixedDelay({ // or scheduleAtFixedRate
		try {
			def doNext = fn(i++, executor)
			if (!doNext) {
				executor.shutdown()
			}
		} catch (e) {
			try {
				e.printStackTrace()
			} finally {
				executor.shutdown()
			}
		}
	}, initDelay, period, TimeUnit.SECONDS)
}

doPeriodically({ i, executor ->
	println('foo' + i)
	return i < 10
}, 0, 2)

doPeriodically({ i, executor ->
	println('bar' + i)
	return i < 10
}, 5, 1)
