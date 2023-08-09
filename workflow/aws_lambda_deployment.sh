#!/bin/sh

zip -r deploy.zip . -x "src/*" "misc/*" "test.js" "*.sh" "./testenv.js" "cek/*"
