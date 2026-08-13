from md.rendering import render_source, source_revision


def test_revision_hashes_exact_utf8_source() -> None:
    assert source_revision("é\n") == "edd3a863872a04239eb29ad4bc12fc892b3d4ae57cc7e786a3697816f8e141c2"
    assert source_revision("line") != source_revision("line\n")


def test_rendering_preserves_math_for_katex_and_markdown_features() -> None:
    rendered = render_source("# Heading\n\n$x_1$\n\n| a | b |\n| - | - |\n| 1 | 2 |\n")
    assert "<h1>Heading</h1>" in rendered
    assert "$x_1$" in rendered
    assert "<table>" in rendered
