#!/usr/bin/sh

SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd $SCRIPT_DIR/src
zip -r ../linkwithsg.zip *
cd ..
mv -f linkwithsg.zip linkwithsg.xpi

