import json
from pathlib import Path
import shutil
import io


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


def main():
    base_path = Path(__file__).parent
    repo_root = base_path / ".." / ".."
    docs_path = repo_root / "docs/api/starlark"

    config = PydocMarkdown(
        loaders=[PythonLoader(search_path=[base_path], packages=["api", "lib"])],
        processors=[
            FilterProcessor(skip_empty_modules=False),
            CrossrefProcessor(),
            GoogleProcessor(),
            SmartProcessor(),
        ],
        renderer=DocusaurusRenderer(
            docs_base_path=base_path / "docs",
            markdown=CustomizedMarkdownRenderer(
                escape_html_in_docstring=False,
                render_module_header_template="",
                header_level_by_type={
                    "Module": 1,
                    "Class": 2,
                    "Method": 3,
                    "Function": 2,
                    "Variable": 3,
                },
                add_module_prefix=False,
            ),
        ),
    )
    modules = config.load_modules()
    config.process(modules)
    config.render(modules)

    generated_doc_dir = base_path / "docs/reference"

    sidebar = {"text": "API Reference"}
    items = []
    docs_path.mkdir(exist_ok=True, parents=True)

    for f in sorted((generated_doc_dir / "api").rglob("*.md")):
        if f.name == "__init__.md":
            parent_name = f.parent.name
            if parent_name == "api":
                # Means global functions
                filename = "global_functions.md"
                title = "global functions"
            else:
                filename = f"{parent_name}.md"
                title = f"{parent_name} modules"
            shutil.copy(f, docs_path / filename)
            name = filename.replace(".md", "")
            items.append({"text": title, "link": f"api/starlark/{name}"})

    lib_content = io.StringIO()
    for f in sorted((generated_doc_dir / "lib").rglob("*.md")):
        if f.name == "__init__.md":
            continue
        with open(f, "r") as reader:
            for line in reader:
                if not line.startswith("# envd"):
                    lib_content.writelines(line)
    with open(docs_path / "envdlib.md", "w") as writer:
        writer.write(lib_content.getvalue())
    items.append({"text": "envdlib", "link": "api/starlark/envdlib"})

    sidebar = {"text": "API Reference", "items": items}
    json.dump(
        sidebar, open(repo_root / "docs/.vitepress/config/sidebar/apiSidebar.json", "w")
    )


if __name__ == "__main__":
    main()
