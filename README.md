Contributing to I_Book
=====================

### Install git 


If not installed, install `git

### Fork the Project

Fork the project on Github by clicking on the word "Fork" above and to the right of this page.  This will create your own fork at https://github.com/YourNameHere/I_Book.git.  Then clone your fork to your local repository on your machine and set up a [triangle workflow](https://github.com/forwards/first-contributions/blob/master/additional-material/git_workflow_scenarios/keeping-your-fork-synced-with-this-repository.md) using these commands:
```
git clone https://github.com/YourNameHere/I_Book.git
cd I_Book
git remote add upstream https://github.com/Vs-karma/I_Book.git


```
### Create a Branch for your feature

Make sure your fork is up-to-date and create a topic branch for your feature or bug fix.  (The name `my-feature-branch` is an example. Choose whatever you like.)

```
git checkout master
git pull upstream master
git checkout -b my-feature-branch
```
### Build and Test

```
To get started with app
you guys need to install node js and 'vs studio' in your system 
and install follwing as I am mention 

In backend folder , type following in your vs-code terminal 
npm i bcryptjs    
npm install --save express-validator
npm install -g nodemon    
npm i -D nodemon                   
npm i mongoose    
npm i express

In main directory
npm i react-router-dom
npm i react-router-dom concurrently       
npm init      
npx init      
npm install express --save   
npm install --save gh-pages
npm install react-scripts
npm install socket.io
```
### Write Code

Implement your feature or bug fix.

### Commit Changes

Make sure git knows your name and email address:

```
git config --global user.name "Your Name"
git config --global user.email "contributor@example.com"
```
A commit log should describe what changed and why.

```
git add yourChangedFile.java
git commit -m "Fixed Foo bug by changing bar"
```

### Push to your GitHub repository

```
git push origin my-feature-branch
```

#### Make a Pull Request

Go to https://github.com/yournamehere/I_Book and select your feature branch. Click the 'Pull Request' button and fill out the form.

### Rebase

If you've been working on a change for a while and other commits have been made to the project, rebase with upstream/master.

```
git fetch upstream
git rebase upstream/master
git push origin my-feature-branch -f
```
### Thank You

Please do know that we really appreciate and value your time and work. We love you, really.
