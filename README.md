```
uv tool install git+https://github.com/varunneal/md.git
```

Render markdown files in Chrome with LaTeX and syntax highlighting. A persistent local server starts on first use, which is reused on subsequent calls.

## Install

```
uv tool install git+https://github.com/varunneal/md.git
```

## Usage

```
md file.md          # opens rendered markdown in Chrome
md --status         # check if server is running
md --stop           # stop the background server
```

## Config

Defaults live in the package. To override, create `~/.config/md/`:

- `config.toml` — override any of: `port`, `browser`, `theme`
- `style.css` — appended after the default styles
