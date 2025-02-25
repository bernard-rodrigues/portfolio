import json, sys

# Import necessary modules from Jinja2
from jinja2 import Environment, FileSystemLoader, select_autoescape
# Import BeautifulSoup to format the HTML output
from bs4 import BeautifulSoup

# Import selenium to screenshot capture
import time
from selenium import webdriver

def main(screenshotting=False):
    # Create a Jinja2 environment
    # - FileSystemLoader("./templates/") loads templates from the current directory
    # - select_autoescape() enables autoescaping for HTML/XML files (default behavior)
    env = Environment(loader=FileSystemLoader("./templates/"), autoescape=select_autoescape())

    # Define the path to the template file
    template_path = "./template.html"

    # Load the template file from the specified path
    template = env.get_template(template_path)

    with open("./data.json", "r", encoding="utf-8") as f:
        json_data = json.load(f)['data']

    if screenshotting:
        # Set up Selenium WebDriver
        options = webdriver.ChromeOptions()
        options.add_argument("--headless") # Run in headless mode (no UI)
        options.add_argument("--window-size=1200,720") # Set window size

        driver = webdriver.Chrome(options=options)

        for index, project in enumerate(json_data['projects']):
            # URL to capture
            url = project['url']
            driver.get(url)

            # Wait for the page to load
            time.sleep(2)

            # Take screenshot
            project["screenshot"] = f"./assets/screenshots/{project['name'].replace(' ', '_').replace(',','_').replace(':', '_')}.png"
            driver.save_screenshot(project['screenshot'])

            print(f"Screenshoting: {((index+1)/len(json_data['projects'])*100):.2f}%")

        driver.quit()

    else:
        for index, project in enumerate(json_data['projects']):
            project["screenshot"] = f"./assets/screenshots/{project['name'].replace(' ', '_').replace(',','_').replace(':', '_')}.png"

    # Define the data dictionary to pass variables into the template
    data = {
        "name": "Bernard Rodrigues",
        "technologies": json_data["technologies"],
        "bio": json_data['bio'],
        "projects": json_data['projects'],
        "contacts": json_data['contacts']
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

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == '1':
        screenshotting = True
    else:
        screenshotting = False
    main(screenshotting)