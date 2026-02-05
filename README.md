#Trend Better


# Workflow for branch merge

## 1. Prepare a Branch

Create a version of your code you want to share on your branch
then in a terminal open at your project directory


## 2. Update your local "main" and merge "main" into "your-branch-name"

`git checkout main`

`git pull origin main`

`git checkout your-branch-name`

`git merge main`


## 3. Add, Commit and Push

`git add .` (adds all, you can choose select files)

`git commit -m "Merge main into your-branch-name"`

`git push --set-upstream origin your-branch-name` (first time)


## 4. Create Pull Request

Then on github website, select the pull request tab and 
create new pull request on your-branch-name.

Then fill in the title with 
__your-branch-name | describe your branch.__
Add additional details in the description.


## 5. Have a little party :tada:

Then reach out to your merge reviewer 
