import json

# Import necessary modules from Jinja2
from jinja2 import Environment, FileSystemLoader, select_autoescape
# Import BeautifulSoup to format the HTML output
from bs4 import BeautifulSoup

# Create a Jinja2 environment
# - FileSystemLoader("./templates/") loads templates from the current directory
# - select_autoescape() enables autoescaping for HTML/XML files (default behavior)
env = Environment(loader=FileSystemLoader("./templates/"), autoescape=select_autoescape())

# Define the path to the template file
template_path = "./template.html"

# Load the template file from the specified path
template = env.get_template(template_path)

with open("./data.json", "r") as f:
    json_data = json.load(f)['data']

# Define the data dictionary to pass variables into the template
data = {
    "name": "Bernard Rodrigues",
    "projects": json_data['projects']
}

# Render the template with the provided data
rendered_template = template.render(data)

# Use BeautifulSoup to format the HTML output
soup = BeautifulSoup(rendered_template, "html.parser")
formatted_html = soup.prettify()

# Define the output file path
output_path = "./index.html"

# Try writing the rendered template to the output file
try:
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(formatted_html)
    print(f"File created at: {output_path}")  # Success message
except FileNotFoundError:
    # Raise an error if the output file path is invalid
    raise FileNotFoundError("Error: The file does not exist.")