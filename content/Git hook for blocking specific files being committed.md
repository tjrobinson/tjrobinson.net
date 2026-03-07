# Git hook for blocking specific files being committed

```sh
#!/bin/sh

matchPatterns=("appsettings.json")
offendingFiles=()
stagedFiles=$(git diff --cached --name-only)

for file in $stagedFiles;
do
    for pattern in "${matchPatterns[@]}"
    do
        # ${variable,,} maps value to lowercase, so we can do a case insensitive search
        if [[ ${file,,} =~ ${pattern,,} ]]; then
            offendingFiles+=($file)
        fi
    done
done

if [ ${#offendingFiles[@]} -eq 0 ]; then
    exit 0;
else
    commitMessage=$(head -n1 $1 | grep "FORCECOMMIT")
    case $commitMessage in
        *FORCECOMMIT* )
             exit 0;
             ;;
        * )
        echo "[commit-msg hook] Commit blocked because the following files are modified:"
        for file in "${offendingFiles[@]}"
        do
            echo "- $file"
        done
        echo
        echo "To prevent exposing credentials, confirm that you want to include these files by adding \"FORCECOMMIT\" to the commit message."
        exit 1;
    esac  
fi
```

If you're using .NET, you can force this to be set up in your git config at build time using the `PreBuild` event:

```xml
  <Target Name="PreBuild" BeforeTargets="PreBuildEvent">
    <Exec Command="git config core.hooksPath .githooks" />
  </Target>
```
