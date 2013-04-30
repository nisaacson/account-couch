MOCHA=node_modules/.bin/mocha
REPORTER?=tap

unit:
	$(MOCHA) $(shell find test/* -prune -name "*test.js") --reporter $(REPORTER)
wiring:
	$(MOCHA) test/wiring-test.js --reporter $(REPORTER)