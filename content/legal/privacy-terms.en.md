---
title: Terms & Privacy Policy
version: 0.2-draft
lastUpdated: 2026-10-15
---

<!-- > **Draft — pending JOSA legal review.** This text is for the Marsad pilot and Meta App Review. -->

# Terms & Privacy Policy

Marsad (also known as CMT, the Content Moderation Tool) is built by the Jordan Open Source Association (JOSA). It helps authorized Facebook Page administrators and their moderators review comments that may be harmful, and decide what to do about them.

By connecting a Page to Marsad or using a Marsad account, you agree to the Terms of Use and the Privacy Policy below.

## Part 1: Terms of Use

### Who can use Marsad

You may connect a Facebook Page only if you are authorized to manage it. Moderators use their own Marsad account, and can only see and act on the Pages their organization has connected. You are responsible for the actions you and your moderators take through Marsad.

### How Marsad works

Marsad reads the posts and comments on the Pages you connect, and uses rules and an AI classifier to flag comments that may be harmful. **Marsad never moderates on its own.** A flag only highlights and prioritizes a comment. Every hide, unhide, delete or reply is chosen by a moderator, and Marsad waits 10 seconds before sending it to Facebook so it can be undone. Until that window ends, nothing is sent to Facebook.

### AI limitations

The classifier can be wrong. It may flag acceptable comments or miss harmful ones, including satire, political speech or creative expression. Review each flagged comment before acting on it.

### Acceptable use

Use Marsad only to moderate Pages you manage, in line with Meta's Terms and Community Standards. Don't use it to profile, track or target the people who comment on your Page.

### Pilot status

Marsad is currently in a pilot phase. Features may change, and the service may be unavailable at times. We will tell you before making significant changes to these terms.

## Part 2: Privacy Policy

### Who this policy covers

| Who | How they interact with Marsad | What we hold about them |
|---|---|---|
| Page administrators | Sign in with Facebook Login to connect the Pages they manage | Facebook user ID and name (public profile), the list of Pages they manage, the access credentials for the Pages they connect, and which Page they connected and when. We do not request their email address from Facebook. |
| Marsad users and moderators | Sign in with their own Marsad account (separate from Facebook) to review comments | Name, email, user ID, organization, role, assigned Pages, session data, and a record of the moderation actions they take |
| People who comment on a connected Page | Leave a public comment. They have no account or relationship with Marsad. | Only the comment text, its Facebook comment ID, and the moderation data Marsad creates about it. We do **not** store commenters' names, Facebook IDs or profiles. |

### Data we receive from Facebook

We request only these fields:

| Data | What it includes | Why we need it |
|---|---|---|
| Page details | Page ID, name, and the administrator's tasks on the Page | To let you choose which Page to connect, and to confirm you have moderation rights |
| Page access credential | A Page access token issued by Meta | To read comments and carry out the actions your moderators choose |
| Posts | Post ID, text, time posted, link | To show which posts have comments to review, with their context |
| Comments | Comment ID, text, time posted, the ID of the comment it replies to, and whether it is hidden | To classify comments and let moderators review them |

**We do not request:** commenter names, Facebook IDs or profile pictures, Page follower counts, category, bio or cover photo, like counts, post engagement metrics, private messages, friends lists, email addresses, phone numbers or location data. We do not collect or infer anything about commenters' accounts.

### Data Marsad creates

| Data | What it includes | Why |
|---|---|---|
| Moderation analysis | Category, severity, dialect, the rule that matched and the words or passage that triggered it, and similarity or volume signals where used | To prioritize comments and show moderators why a comment was flagged |
| Review status | Queue status, reviewing moderator, chosen action, and whether it was undone, sent and accepted by Facebook | To run the review workflow and show the outcome of each action |
| Action record | Marsad user ID, action, time, a reference to the comment, whether Facebook accepted it, and the rule/model version used | Accountability and resolving disputes |
| Moderator corrections | Label corrections a moderator submits, where enabled | To improve review quality inside Marsad |

### How the AI is used

The classifier receives only the comment text, never who wrote it or Page or post details. **Comments from your Pages and moderator corrections are not used to train or evaluate AI models.** If that ever changes, we will update this policy before it happens.

### Facebook permissions we request

| Permission | What Marsad uses it for |
|---|---|
| `pages_show_list` | List the Pages you manage so you can choose one to connect |
| `pages_read_engagement` | Read the posts on the connected Page |
| `pages_read_user_content` | Read the comments on those posts |
| `pages_manage_engagement` | Hide, unhide, delete or reply to a comment, only when a moderator chooses to |

Facebook Login also provides your public profile (user ID and name). **We do not request** access to your Page inbox or messages, ads, real-time Page subscriptions, or the ability to create or edit posts (`pages_messaging`, `pages_manage_metadata`, `pages_manage_posts` or ads permissions), or anything about friends or activity outside the Page. **Marsad never publishes posts on your Page.**

### How we use your data

Only to connect your Pages, detect comments that may be harmful, show them to your moderators, carry out the actions they choose, and keep a record of those actions. We don't use it for advertising.

### Sharing and service providers

Data moves directly between Meta's Graph API and Marsad, with no other social media API provider in between. To run the service, our infrastructure providers process data on our behalf: Supabase hosts our database and sign-in, and our hosting, backup and monitoring providers handle data only to operate and secure Marsad.

**We do not sell, rent or share** Page or comment data with advertisers, data brokers or anyone outside this moderation workflow.

### How long we keep data

| Data | How long |
|---|---|
| Page and Facebook access credentials | Until you disconnect the Page or Meta revokes access, then removed or made unusable |
| Copies of posts and comments | Up to 90 days from when we receive them. Earlier if the comment is deleted on Facebook, you ask us to purge a Page's data, or a deletion request is fulfilled. |
| Moderation analysis and corrections | Deleted together with the comment they belong to |
| Action records | 12 months, then deleted. They contain no comment text and no commenter identity. |
| Marsad account and session data | While the account is active; removed when the account is deleted |
| Backups and logs | Removed as backups rotate out on our provider's schedule |

Each time comments are refreshed, Marsad re-checks them with Facebook. A comment that has been deleted on Facebook is deleted from Marsad too. If the Page's access has already been revoked, Marsad can no longer check, so the copy is removed at the end of the 90 days. Demos use made-up or anonymized data, never real Facebook data.

### Security

- Data is encrypted in transit (TLS) and at rest. Marsad is not end-to-end encrypted, because our server must read comment text to classify it.
- Page access credentials are encrypted, stored on our servers only, and never sent to your browser.
- Each user belongs to one organization and can only see and act on that organization's Pages. This is enforced on our servers.
- Every moderation action is recorded, confirmed by a person, and can be undone within 10 seconds.
- Development and testing use a dedicated Facebook test Page, not a public Page.

### Your choices and rights

- **Disconnect anytime.** Disconnecting a Page stops Marsad from collecting anything more from it and invalidates its access credential. It does not delete data already stored: that follows the periods above, unless you ask us to delete it sooner.
- **Ask what we hold, or ask us to delete it**, as described below.

### How to delete your data

- **Page administrators and Marsad users:** send a deletion request to the contact address below, from the email address you sign in to Marsad with. We will reply to that address to confirm, then delete your account and Page connection data from Marsad.
- **People who commented on a connected Page:** send us the link to your comment. We will find it by its comment ID and delete the stored comment along with its moderation analysis and any corrections.

Once deletion is complete, we send a confirmation with a reference number. Action records contain no commenter identity; they keep only the moderator, action, time, outcome and version information until they expire after 12 months.

### Changes to this policy

Before we change what data Marsad collects, why, which Facebook permissions it uses, which providers process it, how long it is kept, or whether any action becomes automatic, we will update this policy first and tell connected Page administrators about significant changes.

### Contact

info at josa dot ngo
