DIST = dist
ASSETS = assets/js
BUNDLE = bundle.js
VENDOR = vendor.bundle.js

INSTALL = cp ${DIST}/${BUNDLE} ${ASSETS}; cp ${DIST}/${VENDOR} ${ASSETS}; rm -Rf ${DIST};

all: dev

dev: clean
	npx webpack --env.dev
	echo "dev" > build
	$(INSTALL)

prod: clean
	npx webpack --env.prod
	echo "prod" > build
	$(INSTALL)

clean:
	rm -Rf ${DIST}
	rm -f ${ASSETS}/${BUNDLE}
	rm -f ${ASSETS}/${VENDOR}
