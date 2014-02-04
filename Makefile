test-coveralls:
	cat ./coverage/PhantomJS\ 1.9.7\ \(Linux\)/lcov.info | ./node_modules/.bin/coveralls --verbose
