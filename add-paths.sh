#!/bin/zsh
find src -type f \( -name "*.js" -o -name "*.jsx" \) | while read file; do
 if ! head -n1 "$file" | grep -q "^//" ; then
   filepath="//${file#src/}"
   echo "$filepath\n$(cat $file)" > "$file"
   echo "Added path to $file"
 fi
done