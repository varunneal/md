# md

Render markdown files in Chrome with LaTeX and syntax highlighting.

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

A persistent local server starts on first use. Subsequent calls reuse it — each file gets its own URL so you can view multiple files simultaneously.

Dark/light theme toggle and raw view buttons are in the top right corner.
