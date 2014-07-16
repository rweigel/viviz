MINIMIZER=build/roll.pl
HTML=enlil.html
EXCLUDE=galleryinfo
DOM=build/dom.sh

dist:
	rm -rf ../dist/viviz-gallery-`/bin/date +\%Y\%m\%d`
	mkdir -p ../dist/viviz-gallery-`/bin/date +\%Y\%m\%d`
	cp -r css dat js* xml ../dist/viviz-gallery-`/bin/date +\%Y\%m\%d`
	cp *.htm ../dist/viviz-gallery-`/bin/date +\%Y\%m\%d`
	cd ../dist; zip -r --exclude=*.svn* viviz-gallery-`/bin/date +\%Y\%m\%d`.zip viviz-gallery-`/bin/date +\%Y\%m\%d`/
	cd ../dist/ ; rm -f viviz-latest.zip ;
	cd ../dist/ ; rm -rf viviz-gallery-`/bin/date +\%Y\%m\%d`
	cd ../dist/ ; svn add viviz-gallery-`/bin/date +\%Y\%m\%d`.zip
	cd ../dist/ ; svn commit -m "" viviz-gallery-`/bin/date +\%Y\%m\%d`.zip
	cd /var/www/viviz/dist/ ; ln -s viviz-gallery-`/bin/date +\%Y\%m\%d`.zip viviz-latest.zip

all:
#	$(DOM) > $(HTML:.html=-dom.js)
	perl $(MINIMIZER) $(HTML) -html enlil/$(HTML:.html=) -js enlil/$(HTML:.html=) -e $(EXCLUDE)
#	perl $(MINIMIZER) $(HTML) -html . -js .

clean:
	rm -rf *-min.* *-cat.* *-dom.js
