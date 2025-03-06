# AI Template
An AI template for school built with Groq.

**Make sure to ⭐️ the repository if you find this useful.**

## Using Data URLs

> [!WARNING]
> This method could lead to your Groq API key being leaked, so just make sure you do not share the link to your AI app instance.

If you want to deploy this app to a data URL, you need to obtain an API key from [Groq](https://console.groq.com/login) first.

Once you have one, fork this repository, and replace line 413 of the `index.html` file with your Groq API key.

```javascript
const token = 'YOUR_GROQ_API_KEY';
```

With your actual API key (this is not a real one):

```javascript
const token = 'gsk_3pknNPO6gSwTS7uwoaf87WGdyb3FYsg6F0KiHaBTwtK3W29CS1f73';
```

Once you have your index.html file ready, navigate to it and select `Raw`

Then copy the URL and replace `GITHUB_RAW_URL` in this code with your URL:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Classroom</title>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const main = "GITHUB_RAW_URL";
      const fallback = "https://cdn.jsdelivr.net/gh/GITHUB_USERNAME/REPO_NAME";

      fetch(main)
        .then(response => {
          if (!response.ok) throw new Error("Primary URL failed");
          return response.text();
        })
        .catch(() => {
          return fetch(fallback).then(response => {
            if (!response.ok) throw new Error("Fallback URL failed");
            return response.text();
          });
        })
        .then(html => {
          document.open();
          document.write(html);
          document.close();
        });
    });
  </script>
</head>
</html>
```

Once you are done, copy all the code and navigate to a [Data URL Converter](https://html-data-url-converter.vercel.app/) and paste the code

Now copy the Data URL, and you can use this URL to use the AI app!

## Deployment

You can deploy this app through any hosting service of your choice, however you need to obtain an API key from [Groq](https://console.groq.com/login) first.

Once you have one, fork this repository, and replace line 413 of the `index.html` file with your Groq API key.

```javascript
const token = 'YOUR_GROQ_API_KEY';
```

With your actual API key (this is not a real one):

```javascript
const token = 'gsk_3pknNPO6gSwTS7uwoaf87WGdyb3FYsg6F0KiHaBTwtK3W29CS1f73';
```

Once you have that, you can use any hosting service to deploy your app!

