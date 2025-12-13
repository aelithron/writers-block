# Writer's Block
A simple writing webapp for books, fanfiction, and short stories.

<div align="center">
  <a href="https://shipwrecked.hackclub.com/?t=ghrm" target="_blank">
    <img src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/739361f1d440b17fc9e2f74e49fc185d86cbec14_badge.png" 
         alt="This project is part of Shipwrecked, the world's first hackathon on an island!" 
         style="width: 35%;">
  </a>
</div>

## Features
- Settings for chaptered vs short stories
- Simple writing UI
- Protection from losing work (autosaving + others)
- Plaintext exporting
### Planned Features
- Rich text editor
- EPub/PDF/Docx exporting
- Book planning tool (with templates)
## Using
Using Writer's Block is simple! Just go to [wb.novatea.dev](https://wb.novatea.dev) and sign in with Google (or if you're in Hack Club, you can use Slack).
### Selfhosting
Selfhosting the app is a bit more complex, but can be done! I suggest using Docker, though I am sadly unable to provide a prebuilt image for now.
1. Environment Variables
Set up the following environment variables:
- `MONGODB_URI`: A MongoDB connection string to your database server.
- `MONGODB_DB`: The name of your database. Make sure it contains a collection called `stories`!
- `AUTH_SECRET`: A random string to secure user sessions. You can generate this with the command `openssl rand -base64 33` on Linux.
- `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`: A Google Cloud OAuth ID and Secret. This will enable Google login. You can configure this [on Google Cloud Console](https://console.cloud.google.com/auth/overview), make sure to create a project and follow their setup. Your redirect URI is `https://[domain].[tld]/api/auth/callback/google`.
- `AUTH_SLACK_ID` and `AUTH_SLACK_SECRET`: Optional, a Slack OAuth ID and Secret. Just like above, this enables Slack login. You can create a Slack app and add it's ID and secret here. No links are provided, as it's a complicated process to set up. Your redirect URL is `https://[domain].[tld]/api/auth/callback/slack`.
2. Build a Docker image for the app. To make sure the build goes smoothly, add a file in the source code directory called `.env.local` with the text `MONGODB_URI=[your connection string]`. Then, I suggest running `docker build -t writers-block:v1.0.1 .` from the same directory.
3. Run the image with either a `docker run` command or Docker Compose. If you're so inclined, you can use Kubernetes also. Make sure to include the environment variables!
## Screenshot
![IMG](https://hc-cdn.hel1.your-objectstorage.com/s/v3/2a989c0ab0f52b07fda955b895e9c64869677e5f_image.png)
## Extra Notes
The name "Writer's Block" is both based on the idea this app could help you get over actual writer's block, as well as that it's got most/all the tools a writer needs (as in, kinda like the equivalent to a corner store on an irl city block).
