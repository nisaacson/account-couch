MOCHA=node_modules/.bin/mocha
REPORTER?=spec
config?=test/config.json

unit:
	$(MOCHA) $(shell find test/* -prune -name "*test.js") --reporter $(REPORTER)
wiring:
	$(MOCHA) test/wiring-test.js --reporter $(REPORTER)
register-wiring:
	$(MOCHA) test/register-wiring-test.js --reporter $(REPORTER)

integration:
	$(MOCHA) $(shell find test/integration* -prune -name "*test.js") --config $(config) --reporter $(REPORTER)
register:
	$(MOCHA) test/integration/register-test.js --config $(config) --reporter $(REPORTER)