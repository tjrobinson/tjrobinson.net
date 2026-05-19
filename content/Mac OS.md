Showing hidden files by default:

Run this to show hidden files in Finder again:

 defaults write com.apple.finder AppleShowAllFiles -bool true
 osascript -e 'tell application "Finder" to quit'
 open -a Finder

Run this to hide them again:

 defaults write com.apple.finder AppleShowAllFiles -bool false
 osascript -e 'tell application "Finder" to quit'
 open -a Finder