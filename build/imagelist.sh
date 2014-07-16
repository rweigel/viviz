# Re-write.  This will fail if group name listed in ls -l is not [a-z] (first per command uses this).
cd fulls ; ls -l *.png | perl -pi -e 's/^.*[a-z] //ig' | perl -pi -e 's/^\s.*?//g' | perl -pi -e 's/^/["/g' | perl -pi -e 's/\n$/"]/g' | perl -pi -e 's/\]\[/],[/g' | perl -pi -e 's/\s/","/g' | perl -pi -e 's/\[/function imagelist(){tmp=[[/' | perl -pi -e 's/\z/];return tmp}/' > ../imagelist.js
