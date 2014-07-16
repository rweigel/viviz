svn co http://aurora.gmu.edu/svn/viviz/gallery
find . -name "*.svn" | xargs rm -rf {}
cp -r gallery/* .
rm -rf gallery
rm -f *2.*