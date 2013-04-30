MOCHA=node_modules/.bin/mocha
REPORTER?=spec

unit:
	$(MOCHA) $(shell find test/* -prune -name "*test.js") --reporter $(REPORTER)
wiring:
	$(MOCHA) test/wiring-test.js --reporter $(REPORTER)
register-wiring:
	$(MOCHA) test/register-wiring-test.js --reporter $(REPORTER)