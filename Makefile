REPORTER = list
TESTS = tests/*.js

test: 
	@NODE_ENV=tests ./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	--timeout 5000 \
	$(TESTS)

.PHONY: test
