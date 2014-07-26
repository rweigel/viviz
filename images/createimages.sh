#!/bin/bash

START=`echo $1 | tr -d _`;
START="20100101"
N=366

for (( c=0; c<$N; c++ ));
do

	DIR1="mkdir -p time/thumb/`date --date="$START +$c day" +%Y/%m/%d/`";
	DIR2="mkdir -p time/full/`date --date="$START +$c day" +%Y/%m/%d/`";
	DSTR1s="time/thumb/";
	DSTR2s="time/full/";
	DSTR1f="`date --date="$START +$c day" +%Y/%m/%d/file_%Y_%m_%d.png`";
	DSTR2f="`date --date="$START +$c day" +%Y/%m/%d/file_%Y_%m_%d.png`";
	CONV1="convert -size 200x200 -gravity center -border 10 -bordercolor yellow -background white -fill black -pointsize 12 label:\"$DSTR1f\" $DSTR1s$DSTR1f"
	CONV2="convert -size 600x600 -gravity center -border 10 -bordercolor yellow -background white -fill black -pointsize 24 label:\"$DSTR2f\" $DSTR2s$DSTR2f"
	
	echo $DIR1
	eval $DIR1
	echo $DIR2
	eval $DIR2
	echo $CONV1
	eval $CONV1
	echo $CONV2
	eval $CONV2

done