import dataclasses
import json
from pathlib import Path

from pydoc_markdown import PydocMarkdown
from pydoc_markdown.contrib.loaders.python import PythonLoader
from pydoc_markdown.contrib.processors.crossref import CrossrefProcessor
from pydoc_markdown.contrib.processors.filter import FilterProcessor
from pydoc_markdown.contrib.processors.smart import SmartProcessor
from pydoc_markdown.contrib.processors.google import GoogleProcessor
from pydoc_markdown.contrib.renderers.docusaurus import DocusaurusRenderer, CustomizedMarkdownRenderer
from pydoc_markdown.interfaces import Context

@dataclasses.dataclass
class EnvdMkRender(CustomizedMarkdownRenderer):
    escape_html_in_docstring = False

render = EnvdMkRender()
render.escape_html_in_docstring = False

def main():
    base_path = Path(__file__).parent
    docs_path = base_path / ".." / ".." / "docs"
    config = PydocMarkdown(
        loaders=[PythonLoader(search_path=[str(base_path / "api")])],
        processors=[FilterProcessor(skip_empty_modules=True), CrossrefProcessor(
        ), GoogleProcessor(), SmartProcessor()],
        renderer=DocusaurusRenderer(
            docs_base_path=str(docs_path.resolve()),
            sidebar_top_level_label="API reference",
            relative_output_path="./api/starlark",
            markdown=render
        ),
    )
    config.renderer.escape_html_in_docstring = False
    modules = config.load_modules()
    config.process(modules)
    # patch __init__.py file
    for module in modules:
        if module.location.filename.endswith("__init__.py"):
            module.location.filename = module.location.filename.replace(
                "__init__.py", "universe.py")
            module.name = "global functions"
    config.render(modules)

    # Rank global functions as the first
    f = docs_path / "api" / "sidebar.json"
    sidebar = json.load(f.open("r"))
    if "api/global functions" in sidebar["items"]:
        gidx = sidebar["items"].index("api/global functions")
        sidebar["items"].pop(gidx)
        sidebar["items"].insert(0, "api/global functions")
        f.write_text(json.dumps(sidebar))

main()
