## Contribution guide

1. Fork the repository including all branches. You need `dev` branch to be able to create a pull request.
1. Make changes in your fork.
1. Add your changes to `CHANGELOG.md` file.
1. Build it using `yarn build`.
1. Test it locally. 
   1. Link the package locally using `yarn link`.
   2. Then in you local gateway (e.g. https://github.com/NearSocial/viewer) run `yarn link near-social-vm`.
   3. Install the gateway `yarn` dependencies.
   4. Run the gateway `yarn start`.
5. If everything works, commit your changes and push them to your fork.
6. Create a pull request to the `dev` branch of the original repository.
7. Once the PR is accepted, the maintainers will merge it to the `dev` branch.
8. Once the `dev` branch is ready for the release, the maintainers will merge it to the `master` branch and cut the new release.
