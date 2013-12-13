test-coveralls:
	cat ./coverage/PhantomJS\ 1.9.2\ \(Linux\)/lcov.info | ./node_modules/.bin/coveralls --verbose
