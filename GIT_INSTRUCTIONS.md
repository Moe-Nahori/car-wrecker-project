# Git Instructions for Admin Pages Feature

Follow these steps to properly manage your Admin Pages feature development with Git.

## Creating and Using the Feature Branch

```bash
# 1. Make sure you're on the main branch first
git checkout main

# 2. Create a new feature branch for the admin pages
git checkout -b feature/admin-pages

# 3. Check that you're now on the new branch
git branch
```

## Committing Your Changes

```bash
# 1. Check which files have been changed
git status

# 2. Add all the new files and changes to staging
git add .

# 3. Commit your changes with a descriptive message
git commit -m "feat: add admin pages for wrecker partners and company details"

# 4. Push your changes to the remote repository
git push origin feature/admin-pages
```

## Merging Back to Main (When Feature is Complete)

```bash
# 1. Switch back to main branch
git checkout main

# 2. Get the latest changes from remote
git pull origin main

# 3. Merge your feature branch
git merge feature/admin-pages

# 4. Resolve any conflicts if they occur
# Open conflicted files in your editor, resolve conflicts
# Then: git add <resolved-file>
# And: git commit -m "chore: resolve merge conflicts"

# 5. Push the merged changes
git push origin main
```

## Tips for Git Usage

1. **Commit Often**: Make small, frequent commits with clear messages
2. **Pull Before Pushing**: Always pull the latest changes before pushing
3. **Descriptive Messages**: Use the format "type: message" (e.g., "feat: add location editor")
4. **Keep Feature Branches Short-Lived**: Merge them back to main once completed
5. **Check Your Status**: Use `git status` frequently to see what's changed

## Common Git Commands

- `git status`: Check status of your repository
- `git branch`: List all branches (current branch marked with *)
- `git checkout <branch>`: Switch to a different branch
- `git log`: See commit history
- `git diff`: Show changes between commits
- `git pull`: Get latest changes from remote
- `git push`: Send your commits to remote
