# tjrobinson.net

Personal website and Obsidian vault for tjrobinson.net.

## Obsidian CLI

The `obsidian` CLI is available and connected to the **content** vault at `./content`.

Always use the Obsidian CLI for vault interactions — do not read/write vault files directly with filesystem tools unless the CLI cannot accomplish the task.

### Searching

```sh
# Full-text search
obsidian search query="keyword"

# Search with surrounding context lines
obsidian search:context query="keyword"

# Limit results and output as JSON
obsidian search query="keyword" format=json limit=20
```

### Reading notes

```sh
# By name (fuzzy, like a wikilink)
obsidian read file="Note Name"

# By exact path relative to vault root
obsidian read path="folder/note.md"

# Read today's daily note
obsidian daily:read
```

### Creating notes

```sh
# Create with inline content
obsidian create name="New Note" content="# Heading\n\nBody text"

# Create from a template
obsidian create name="New Note" template="Template Name"

# Create at an explicit path
obsidian create path="folder/note.md" content="..."
```

### Appending and prepending

```sh
# Append to a note (adds newline before content automatically)
obsidian append file="Note Name" content="New paragraph"

# Append without extra newline
obsidian append file="Note Name" content="inline" inline

# Append to today's daily note
obsidian daily:append content="- [ ] New task"

# Prepend to a note
obsidian prepend file="Note Name" content="Intro paragraph"
```

### Properties (frontmatter)

```sh
# Read a single property
obsidian property:read name="tags" file="Note Name"

# Set a property (types: text, list, number, checkbox, date, datetime)
obsidian property:set name="status" value="draft" file="Note Name"
obsidian property:set name="tags" value="blog, tech" type=list file="Note Name"

# Remove a property
obsidian property:remove name="draft" file="Note Name"

# List all properties in the vault with counts
obsidian properties counts sort=count format=json
```

### Tags

```sh
# List all tags with counts, sorted by frequency
obsidian tags counts sort=count format=json

# Tags for a specific file
obsidian tags file="Note Name"

# Info about a specific tag (files using it)
obsidian tag name="blog" verbose
```

### Backlinks

```sh
# List backlinks to a note
obsidian backlinks file="Note Name"

# With link counts, as JSON
obsidian backlinks file="Note Name" counts format=json
```

### Daily notes

```sh
obsidian daily:read              # read today's note
obsidian daily:append content="- item"
obsidian daily:prepend content="## Morning"
obsidian daily:path              # get the file path of today's note
```

### Files and folders

```sh
obsidian files                   # list all files
obsidian files folder="blog"     # filter by folder
obsidian files ext=md total      # count .md files
obsidian folders                 # list all folders
obsidian vault                   # show vault name, path, file/folder counts
```

### JSON output

Pass `format=json` to any command that supports it for machine-readable output:

```sh
obsidian search query="obsidian" format=json
obsidian backlinks file="Note Name" format=json
obsidian tags counts format=json
obsidian properties format=json
obsidian tasks format=json
```

### Tasks

```sh
obsidian tasks todo              # incomplete tasks across vault
obsidian tasks done              # completed tasks
obsidian tasks file="Note Name" verbose
obsidian tasks format=json       # all tasks as JSON
```

### Targeting a specific vault

The default vault is **content** (detected automatically). If you ever need to target a different vault:

```sh
obsidian vault=OtherVault read file="Note Name"
```
