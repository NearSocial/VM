## Near Social VM

AKA "BOS VM"

The VM provides a limited version of React JSX implementation with a bunch of helper methods to access NEAR blockchain.

The VM is based on the following security principles:
- No raw access to DOM. The DOM access is only provided through JSX elements.
- No raw JS execution in the main thread. All JS code is executed in either a VM or a sandboxed iframe.
- No raw access to local storage.

### Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

### Changelog

See [CHANGELOG.md](./CHANGELOG.md)

### Try it

You can play with the VM at one of the gateways:
- https://near.social/
- https://dev.near.social/ (`dev` VM branch)
- https://near.org/
- https://jutsu.ai/
