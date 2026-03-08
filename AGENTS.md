# Agent Instructions

To ensure code quality and consistency in this repository, please follow these guidelines:

## Final Checks

Before completing any task or submitting changes, always run the following command to ensure that the code is properly linted and formatted:

```bash
npm run check
```

This command runs:

1. `tsc --noEmit`: To check for TypeScript compilation errors.
2. `prettier . --check`: To verify that all files follow the project's formatting rules.

If the formatting check fails, you can fix it by running:

```bash
npx prettier . --write
```
