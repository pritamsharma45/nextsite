---
title: Stage Flow: Lead Management with Google Sheets & App Script (Free Template!)
description:  Learn how to build a powerful lead management app using Google Sheets and App Script!  Streamline your sales process with Stage Flow.
date: 2024-05-29
category: Productivity
tag: [Google Sheets, App Script, Lead Management, CRM, Automation, Sales]
---

## Stage Flow: Supercharge Your Lead Management with Google Sheets & App Script (Free Template!)

Tired of clunky, expensive CRM systems? Want a flexible and customizable lead management solution that fits your exact needs? In this post, I'll walk you through Stage Flow, a lead management web application I built using Google Sheets and App Script. It's an extension of my previous "CRUD App with Authentication" project (link below!), and I've added tons of improvements to make managing your leads a breeze.

**Watch the Demo:**

[![Stage Flow Demo](http://img.youtube.com/vi/YOUR_YOUTUBE_VIDEO_ID/0.jpg)](http://www.youtube.com/watch?v=YOUR_YOUTUBE_VIDEO_ID)
_(Replace YOUR_YOUTUBE_VIDEO_ID with the actual ID of your YouTube video)_

This app puts all your important lead information right at your fingertips. Here's a quick rundown of what Stage Flow offers:

- **Clear Lead Overview:** See a list of all your leads with key details like name, stage, assigned user, contact info, customer type, lead source, creation date, closing date, and notes.
- **Visual Lead Progression:** Track your leads through the sales pipeline with color-coded, arrow-shaped buttons representing each stage:
  - Lead
  - Contacted
  - Pitched
  - Sent Demo
  - Negotiating
  - Closed Won
  - Closed Lost
- **Stage-Based Filtering:** Quickly filter leads by their current stage. For example, click "Closed Won" to see all your successful conversions!
- **Inline Editing:** Update lead stages directly within the table for maximum efficiency. No more navigating through multiple screens.
- **Comprehensive Edit History:** Every change made to a lead is tracked and logged, including who made the change, what field was changed, and when. This provides a complete audit trail.
- **Role-Based Access Control:** Manage user permissions with three roles: owner, admin, and standard user. Control what each user can see and do.

### A Quick Demo: See Stage Flow in Action

Let's walk through some key features:

1.  **Creating a New Lead:** Easily add new leads by entering basic information.
2.  **Updating a Lead's Stage:** Change the lead's stage with just a click and save.
3.  **Closing a Lead:** Update a lead's stage to "Closed Won" or "Closed Lost," including the closing date and any final notes.
4.  **Deleting a Lead:** Remove leads when no longer needed.
5.  **Visual Pipeline Overview:** Utilize the arrow-shaped buttons to easily filter leads by stage.

I drew inspiration for the visual flow from Streak CRM, a great tool you might want to check out. I'll provide a link in the description.

### Setting Up Stage Flow for Yourself

Ready to get started? Here's how to set up Stage Flow in your own Google Sheets account:

1.  **Make a Copy:** Create a copy of the Google Sheet (link below!).
2.  **Deploy the App Script:**
    - Go to "Extensions" > "App Script."
    - Click "Deploy" and select "New Deployment."
    - Choose "Web App" as the deployment type.
    - Give it a name.
    - Set permissions to "Execute as me" and "Who has access: Anyone."
    - Authorize the script.
    - Copy the provided URL.
3.  **User Setup:**
    - Clear the "Invitations" and "Users" tabs.
    - Go to the custom menu ("Stage Flow" after renaming, originally mislabeled).
    - Click "Setup Add Test Users." This will create a super admin and three test users, each with the default password "1234."
    - Refresh the app.
4.  **Schema Configuration:**
    - Go to the "App Settings" tab and click "Save Settings."
    - The "Schema" tab defines how forms and tables are rendered. Customize field types, select options, and more.

### Customizing Stage Flow to Fit Your Needs

Want to tailor Stage Flow to your specific workflow? Here's how:

- **Rename Stages and Change Colors:**
  - Open the Script Editor.
  - Find the "lead_management_mixins" file.
  - Modify the colors for different stages. This method block also handles filtering data by lead status.
- **Adjust User Role Permissions:**
  - Go to the "approval_mixins" file.
  - Modify properties like "showEditButton," "showDeleteButton," and "showAddNewButton."
  - Customize which fields are editable for different user roles within the `filterDataOnRoleBasis` method.

**Important Note:** For a deeper understanding of the code, check out my previous videos on the CRUD App and CRUD App with Authentication. (Links below!) These videos break down the code structure and explain how the schema works.

[Link to CRUD App Video]
[Link to CRUD App with Authentication Video]
[Link to Streak CRM]

### Conclusion

Stage Flow offers a powerful and flexible way to manage your leads directly within Google Sheets. With its visual interface, comprehensive tracking, and role-based access control, you can streamline your sales process and stay on top of your pipeline. If you have any questions or need a more customized version, feel free to reach out!

**Download the Stage Flow Template:** [Link to Google Sheet Template]

## **Don't forget to subscribe for more helpful tutorials!**

```json
{
  "title": "Stage Flow: Lead Management with Google Sheets & App Script (Free Template!)",
  "link": "/posts/stage-flow-lead-management-google-sheets/",
  "date": "2024-05-29",
  "summary": "Build a powerful lead management app using Google Sheets and App Script! Streamline your sales with Stage Flow. Download free template and tutorial."
}
```

**Important Considerations:**

- **YouTube Video ID:** Replace `YOUR_YOUTUBE_VIDEO_ID` with your actual YouTube video ID.
- **Google Sheet Template Link:** Replace `[Link to Google Sheet Template]` with the actual shareable link to your Google Sheet template.
- **CRUD App Video Links:** Add your actual video links.
- **Streak CRM Link:** Add your actual link.
- **SEO Keywords:** Make sure the keywords I've used are relevant to your audience. Do some keyword research to identify the best terms.
- **Call to Action:** I've included a clear call to action to subscribe. Make sure your YouTube video and your blog post both include this.
- **Schema Knowledge:** If you are new to schemas you might be overwelmed on the first few reads, take your time to understand it and you'll be a pro in no time.
- **Slug:** The "slug" in the JSON object (e.g., `stage-flow-lead-management-google-sheets`) should be a URL-friendly version of your title.
- **Category and Tags:** I suggested general categories and tags. Tailor these to match your blog's organization.
- **Character Counts:** While the summary target was 170, SEO best practice suggest you should stay between 150-160 characters.
- **Final Check:** Proofread everything carefully before publishing!
