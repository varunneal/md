# md-viewer

Render and edit local Markdown in a synchronized browser view. A background localhost server starts on first use and is reused by later invocations.

External saves appear in every open tab without a reload. Browser edits are saved on blur, with `Cmd-S`, or with **Done**. Revision checks prevent a stale tab from overwriting newer disk contents; displaced drafts remain available in the recovery drawer for compare, copy, download, restore, or deletion.

## Install

```sh
uv tool install git+https://github.com/varunneal/md.git
```

The wheel includes the compiled CodeMirror client, so Node.js is not required at runtime.

## Usage

```sh
md file.md          # open the synchronized Markdown viewer
md --status         # check whether the background server is ready
md --stop           # gracefully stop the background server
```

The rendered, raw, and editor views stay synchronized. Press `e` or double-click rendered content to edit. Theme and view selection survive live updates, and deleted files recover automatically if recreated at the original path.

## Configuration

Defaults live in the package. To override them, create `~/.config/md/`:

- `config.toml` — override `port`, `browser`, or `theme`
- `style.css` — append custom viewer styles

## Development

```sh
uv sync --group test
uv run pytest
cd frontend
npm install
npm run build       # writes the committed bundle to src/md/static
npm test
npm run test:e2e    # uses locally installed Google Chrome on macOS
```
