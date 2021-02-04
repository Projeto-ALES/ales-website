# Recruitment

## Description

This document intends to explain the basic flow of creating a recruitment process and how to configure Google Calendar API.

## Why

For what we have experienced in past recruitment processes, the most stressful and tiresome part of organizing a recruitment process is the one that you have to allocate each candidate in a schedule good for him and for you. There are always conflicts and unforeseens, so the manual work ends up being very repetitive.
So we thought: "Why don't we automate at least that part? We have a website, we can do that." And that's what this document tries to detail.

### Creating a new recruitment process

What we want here is that a recruitment process can have basic information such as `name`, `description`, `start` and `end` dates. Also, it would be very convenient to integrate this recruitment process with Google Calendar, which is a tool very used by us. Thus, whenever you create a recruitment process, a new Google Calendar will be created with the same name and with the configured account.

### Editing a recruitment process

The only thing (for now) that you can edit in a Google Calendar's calendar (when editing a recruitment process) is its `name` and `timeZone`. Since we want to be able to create and edit events all the time, it is way more easier to do that in Google Calendar's UI itself and the website just consumes and displays that data.

## Google Calendar API

### Creating a project

To be able to interact with Google Calendar API (any Google API actually) you have to create a project in [Google Developer Console](https://console.developers.google.com/project). After that, search for the API that you need in the API Library and activate it. And finally, create the credentials for accessing the API. There are 2 types of credentials: `oAuth2` and `Account Service`. `oAuth2` is always attached to a Google account and is suitable when you need permissions from different users. `Account Service` can be used when you just want to access an API in an transparent way for the user.

We use the second one, as we will be using a unique account (ALES's account) to handle the events/interviews. So create credentials for a `Service Account`.

### Configuring credentials

Once you have the credentials, just download it as a `.json` file. Then you will need 2 environment variables:

- GOOGLE_APPLICATION_CREDENTIALS=/usr/src/app/{file-name} (recomendado nomear como `google-credentials.json`, caso contrário mudar no `.gitignore`)
- CALENDAR_EMAIL={your-email}

> Just add them to `dev/app.env` or `prod/app.env`

> CALENDAR_EMAIL will be the owner of all calendars created within the application

And that's it for now! Try to run the application with some sample project and with your Google account.
This document will be updated as soon as new features are implemented.
