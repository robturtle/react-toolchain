#!/bin/bash
pushd `dirname $0` > /dev/null

hooks_dir="$(pwd)/../.git/hooks"
git_hooks_dir="$(pwd)/git-hooks"

for hook in `ls "$git_hooks_dir"`; do
  dest="$hooks_dir/$hook"
  if [ -h "$dest" ]; then
    rm "$dest"
  elif [ -f "$dest" ]; then
    mv "$dest" "$dest.bak"
  fi
  ln -s "$git_hooks_dir/$hook" "$hooks_dir" && echo "install $git_hooks_dir/$hook -> $hooks_dir"
done

popd > /dev/null
