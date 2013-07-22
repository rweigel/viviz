#!/bin/bash
perl -p -e "s/\n|\t//g" gallery.html | perl -p -e "s/^.*\<body\>/function dom\(\){domstr=\'/"  | perl -p -e "s/\<\/body.*/\';return domstr}/"
