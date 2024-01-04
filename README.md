# IdeaBook
### [Live Site](https://react-ai-generate-text-image.netlify.app/)
![Online Food Order Application](https://raw.githubusercontent.com/paul963/react-ai-generate-text-image/master/preview.webp)

### Overview
React application that generates a title with 10 subtitles and a cover image after a given prompt. The promo is generated dynamically based on the fields filled by the user.\
The user must have an account to use the application. He can create an account or login with his google, facebook or twitter account.\
After generating the text and image the user can preview and save to database. He can see all the files generated that have been saved in the dashboard.\
User data and generators are saved in a Firebase database.

### Features
- Create account or login with social accounts
- Generate title with 10 subtitles and cover image based on a prompt given by the user
- Save title, subtitles and cover image to database
- View all items generated and saved in the dashboard

### Technologies Used
- React
- Firebase (Firestore/Firestore Database)
- HTML/CSS/Bootstrap
- JavaScript
- OpenAI API

### Getting Started
1. Clone repository
2. Install dependencies `npm i`
3. Firebase database is public. No additional configuration required
4. Run the application `npm start`.
5. Account test: user: generate.test@gmail.com | password: test.1234
