# Jinja Boilerplate

This repository provides a boilerplate for projects using Jinja templating.

## Getting Started

### Prerequisites

- Python 3.x
- Jinja2 library

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/bernard-rodrigues/jinja-boilerplate.git
    ```
2. Navigate to the project directory:
    ```sh
    cd jinja-boilerplate
    ```
3. Install the required dependencies:
    ```sh
    pip install -r requirements.txt
    ```

## Usage

1. Add your Jinja templates in the `templates` directory.
2. Create a Python script to render the templates. Example:
    ```python
    from jinja2 import Environment, FileSystemLoader

    env = Environment(loader=FileSystemLoader('templates'))
    template = env.get_template('your_template.html')

    output = template.render(your_variable='value')
    print(output)
    ```
3. Run your script to generate the output.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.