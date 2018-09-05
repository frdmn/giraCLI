# giraCLI

![](http://i.imgur.com/K4SLIZp.png)

CLI script to control a Gira home server.

## Installation

1. Install the project using `npm`:
  `npm install -g giraCLI`
2. Create or copy the default configuration file (`~/.gira.json`):

    ```
    curl https://raw.githubusercontent.com/frdmn/giraCLI/master/gira.json -o ~/.gira.json
    ```

3. Adjust the server and outlet configuration:

    ```
    vi ~/.gira.json
    ```

## Usage

Here's a short explanation how to use `giraCLI`:

### Power on/off all configured outlets

![](http://i.imgur.com/K4SLIZp.png)

### Power on/off a specific outlet

![](http://i.imgur.com/euqYRtn.png)

### Print loaded configuration

![](http://i.imgur.com/o4NOcLk.png)

## Contributing

1. Fork it
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## Requirements / Dependencies

* Gira home server
* Node

## Version

1.1.2

## License

[MIT](LICENSE)
