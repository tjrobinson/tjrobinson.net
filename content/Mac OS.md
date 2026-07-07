---
tags:
  - mac
---
# Mac OS

## Showing hidden files in Finder

Show hidden files:

```shell
defaults write com.apple.finder AppleShowAllFiles -bool true
osascript -e 'tell application "Finder" to quit'
open -a Finder
```

Hide them again:

```shell
defaults write com.apple.finder AppleShowAllFiles -bool false
osascript -e 'tell application "Finder" to quit'
open -a Finder
```
