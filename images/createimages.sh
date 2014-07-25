#!/bin/bash

START=`echo $1 | tr -d _`;
START="20100101"
N=366

for (( c=0; c<$N; c++ ));
do

    DIR1="mkdir -p time/thumb/`date --date="$START +$c day" +%Y/%m/%d/`";
    DIR2="mkdir -p time/full/`date --date="$START +$c day" +%Y/%m/%d/`";
    DSTR1="time/thumb/`date --date="$START +$c day" +%Y/%m/%d/file_%Y_%m_%d.png`";
    DSTR2="time/full/`date --date="$START +$c day" +%Y/%m/%d/file_%Y_%m_%d.png`";
    CONV1="convert -size 200x200 -gravity center -background white -fill black -pointsize 12 label:\"$DSTR1\" $DSTR1"
    CONV2="convert -size 600x600 -gravity center -background white -fill black -pointsize 24 label:\"$DSTR2\" $DSTR2"
    
    echo $DIR1
    eval $DIR1
    echo $DIR2
    eval $DIR2
    echo $CONV1
    eval $CONV1
    echo $CONV2
    eval $CONV2

done