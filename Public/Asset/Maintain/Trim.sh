#!/usr/bin/env bash

\find . -type d \( -iname node_modules -o -iname \.git \) -prune -false -o -iname '*.png' -exec mogrify -trim +repage {} \;
