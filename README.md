# Gmail-to-Chat-Webhook

### A Google App Script project which searches a Gmail inbox for unread emails that have a given label, then forwards a summary to a Google Chat space via a webhook. This is designed to be used for Google Workspace admin/audit/security alerts.

The code can be easily adapted to forward to any webhook, simply remove the Chat-specific card formatting for the data.

### Why?
Workspace should provide a really easy way to send notifications to webhooks - who wants alerts going to a noisy inbox anyway? This script takes advantage of Google's tools for a low effort solution.

#### Prereqs:
 *Note an admin user with appropriate permissions will need to configure notifications. See https://support.google.com/a/answer/33325?hl=en*
 - [Set up email notifications for Workspace alerts.](https://support.google.com/a/answer/9288157)
 - [Create a Gmail label and a filter rule to apply it automatically to the configured notifications.](See https://support.google.com/a/users/answer/9308833?hl=en)
 - [Configure an incoming webhook in Google Chat.](See https://developers.google.com/chat/how-tos/webhooks)

#### Steps:
 - [Create a new App Script project](https://script.new)
 - Copy code
 - Replace placeholders with Gmail label (line 3) and webhook URL (line 71).
 - Test the script.
 - Once working, define a [time-based trigger](https://developers.google.com/apps-script/guides/triggers/installable#time-driven_triggers) to schedule how often the script runs.

#### Notes
 - App Script quotas do apply. This script is designed to be run by a Workspace account, so the quotas are higher than a consumer Gmail account gets. See https://developers.google.com/apps-script/guides/services/quotas. 
 - Unless you have an insane amount of alerts causing the script to take forever to execute, it's extremely unlikely you'll ever hit the quota - you can run this every minute if you want.
 - App Script has no SLA, so if the script doesn't execute for *reasons* that aren't quota related or human error in the code, tough.

