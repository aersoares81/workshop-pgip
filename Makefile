# Simple makefile for dev.

all:
	quarto render docs --execute-dir docs

production:
	quarto render docs --execute-dir docs --profile production

clean-build:
	rm -fR _build

clean-site:
	rm -fR docs/_site

clean-files:
	@find . -name ".pytest_cache" -exec rm -rf {} \;
	@find . -name "*undo-tree*" -exec rm -f {} \;

clean: clean-build clean-files clean-site
