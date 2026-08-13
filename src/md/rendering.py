from __future__ import annotations

import hashlib
import re
from html import escape
from pathlib import Path

import mistune


PKG_DIR = Path(__file__).parent
USER_DIR = Path.home() / ".config" / "md"
DEFAULT_CSS = PKG_DIR / "style.css"

_markdown = mistune.create_markdown(
    plugins=["strikethrough", "table", "footnotes", "task_lists"],
)
_MATH_BLOCK = re.compile(r"\$\$(.+?)\$\$", re.DOTALL)
_MATH_INLINE = re.compile(r"(?<!\$)\$(?!\$)(.+?)(?<!\$)\$(?!\$)")


def source_revision(source: str) -> str:
    """Return the canonical revision for the exact UTF-8 source."""
    return hashlib.sha256(source.encode("utf-8")).hexdigest()


def _protect_math(text: str) -> tuple[str, dict[str, str]]:
    store: dict[str, str] = {}

    def replace(match: re.Match[str], display: bool) -> str:
        raw = match.group(0)
        key = f"MATH_{hashlib.md5(raw.encode()).hexdigest()}"
        store[key] = raw
        return f"\n\n{key}\n\n" if display else key

    text = _MATH_BLOCK.sub(lambda match: replace(match, display=True), text)
    text = _MATH_INLINE.sub(lambda match: replace(match, display=False), text)
    return text, store


def _restore_math(html: str, store: dict[str, str]) -> str:
    for key, raw in store.items():
        html = html.replace(key, raw)
    return html


def render_source(source: str) -> str:
    protected, store = _protect_math(source)
    return _restore_math(_markdown(protected), store)


def load_css() -> str:
    css = DEFAULT_CSS.read_text(encoding="utf-8")
    user_css = USER_DIR / "style.css"
    if user_css.exists():
        css += "\n" + user_css.read_text(encoding="utf-8")
    return css


def escaped_title(path: Path) -> str:
    return escape(path.name)
