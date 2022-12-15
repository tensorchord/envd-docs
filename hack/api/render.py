import json
from pathlib import Path
import shutil
import os


from pydoc_markdown import PydocMarkdown
from pydoc_markdown.contrib.loaders.python import PythonLoader
from pydoc_markdown.contrib.processors.crossref import CrossrefProcessor
from pydoc_markdown.contrib.processors.filter import FilterProcessor
from pydoc_markdown.contrib.processors.smart import SmartProcessor
from pydoc_markdown.contrib.processors.google import GoogleProcessor
from pydoc_markdown.contrib.renderers.docusaurus import (
    DocusaurusRenderer,
    CustomizedMarkdownRenderer,
)


def render_doc(path: Path, output_dir: Path, enable_prefix: bool = False):
    """Generate the markdown files"""
    config = PydocMarkdown(
        loaders=[PythonLoader(search_path=[path])],
        processors=[
            FilterProcessor(skip_empty_modules=True),
            CrossrefProcessor(),
            GoogleProcessor(),
            SmartProcessor(),
        ],
        renderer=DocusaurusRenderer(
            docs_base_path=output_dir,
            markdown=CustomizedMarkdownRenderer(
                escape_html_in_docstring=False,
                render_module_header_template="",
                header_level_by_type={
                    "Module": 1,
                    "Class": 2,
                    "Method": 4,
                    "Function": 2,
                    "Variable": 4,
                },
                add_module_prefix=enable_prefix,
            ),
        ),
    )
    modules = config.load_modules()
    config.process(modules)
    config.render(modules)


def update_global_func(path: Path):
    """Rename __init__ file to a upper level global func file"""
    init = path / "__init__"
    if (init).is_dir():
        shutil.copyfile(init / "__init__.md", path / "global.md")
        shutil.rmtree(init)


def generate_sidebar(title: str, path: Path, target_dir: Path):
    """Generate vitepress sidebar file"""
    sidebar = {"text": title, "type": "category"}
    items = []
    for file in os.listdir(path):
        if file.endswith(".json"):
            (path / file).unlink()
            continue
        name = file.removesuffix(".md")
        items.append(
            {
                "text": name,
                "link": f"{target_dir}/{name}",
            }
        )

    sidebar["items"] = items
    return sidebar


def main():
    base_path = Path(__file__).parent
    repo_root = base_path / ".." / ".."
    sidebar_path = (
        repo_root / "docs" / ".vitepress" / "config" / "sidebar" / "apiSidebar.json"
    )
    docs_path = repo_root / "docs" / "api" / "starlark"
    docs_path.mkdir(exist_ok=True, parents=True)

    items = []
    for module in ["v0", "v1", "lib"]:
        md_dir = base_path / "docs"
        ref_dir = md_dir / "reference"
        ref_dir.mkdir(exist_ok=True, parents=True)
        render_doc(base_path / module, md_dir)
        update_global_func(ref_dir)
        items.append(generate_sidebar(module, ref_dir, f"api/starlark/{module}"))
        shutil.copytree(ref_dir, docs_path / module, dirs_exist_ok=True)
        shutil.rmtree(ref_dir)

    sidebar = {"text": "API Reference", "type": "category", "items": items}
    with open(sidebar_path, "w") as f:
        json.dump(sidebar, f, indent=2)


if __name__ == "__main__":
    main()
