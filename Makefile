all :
	babel demo/graph.js -o demo/bundle.js
	./node_modules/.bin/browserify demo/bundle.js -o ./bundle.js
