# OpenGift

An open-source and lightweight gift registry application where friends and family can browse and claim gifts.

## Features

- 🎁 Interactive gift wishlist with image magnification
- 💳 Revolut payment integration with pre-filled amounts
- 📧 Email notifications via Resend
- 🔒 Private gift information (no public display of gift giver details)
- 📱 Responsive design with beige/cream color scheme
- ☁️ Google Sheets backend for easy management

## Quick Setup

1. **Clone and install dependencies:**
   ```bash
   git clone https://github.com/jertol/opengift.git
   cd opengift
   npm install
   ```

2. **Configure your settings:**
   ```bash
   cp config.template.js config.js
   cp .env.local.example .env.local
   ```

3. **Set up Google Sheets integration:**
   - **Create your Google Sheet:**
     1. Create a new Google Sheets document
     2. In the first row (row 1), paste these column headers:
        ```
        Name	Description	Price	Link	Image	IsReserved	ReservedBy	ReservedDate	ReservedEmail	ReservedMessage	IsCustomPrice	ContributionCount	IsGifted	GiftedBy	GiftedMessage	GiftedDate
        ```
     3. **Find your Google Sheets ID:** The spreadsheet ID is in the URL. For example, if your URL is:
        ```
        https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
        ```
        The ID is the part between `/d/` and `/edit`: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`
   
   - **Set up Google Sheets API:**
     1. Go to [Google Cloud Console](https://console.cloud.google.com/)
     2. Create a new project (or select existing)
     3. Enable "Google Sheets API"
     4. Create credentials → Service Account
     5. Download the service account JSON key
     6. Share your Google Sheet with the service account email (found in the JSON file, look for `client_email`)
   
   - **Save the service account JSON:**
     - For local development: Save the downloaded JSON file as `service_account.json` in the project root
     - For production: You'll add this as an environment variable (see Deployment section)

4. **Edit `config.js` with your information:**
   - Change `pageTitle` to your desired title
   - Add your email addresses
   - Add your Google Sheets ID (the ID you found in step 3)
   - Add your Revolut payment link

5. **Set up Resend for email notifications:**
   - Sign up at [resend.com](https://resend.com)
   - Generate an API key in the dashboard
   - Add to `.env.local`:
     ```env
     RESEND_API_KEY=re_your_api_key_here
     ```
   - **Optional - Custom Domain**: By default, emails are sent from `onboarding@resend.dev`. To use your own domain:
     1. Add your domain in Resend dashboard
     2. Add the DNS records they provide to your domain registrar
     3. Wait for verification (usually a few minutes)
     4. Add to `.env.local`:
        ```env
        RESEND_FROM_EMAIL=noreply@yourdomain.com
        ```

6. **Run the development server:**
   ```bash
   npm run dev
   ```

## Configuration Files

- **`config.js`** - Contains your personal information (gitignored)
- **`.env.local`** - Contains API keys and secrets (gitignored)
- **`service_account.json`** - Google service account credentials (gitignored)

These files contain private information and are automatically ignored by git.

## How It Works

1. **Browse** - Visitors can view your wishlist and click on images to magnify them
2. **Claim** - Users click "I want to gift this" and enter their name/message
3. **Pay** - They're redirected to Revolut with the amount pre-filled
4. **Confirm** - After payment, they return and confirm completion
5. **Success** - The item is marked as gifted and you receive an email notification

## Google Sheets Format

Your Google Sheets should have these column headers in the first row (A1:P1):

| Name | Description | Price | Link | Image | IsReserved | ReservedBy | ReservedDate | ReservedEmail | ReservedMessage | IsCustomPrice | ContributionCount | IsGifted | GiftedBy | GiftedMessage | GiftedDate |

**Column Descriptions:**
- **Name**: Item name (required)
- **Description**: Item description (required)
- **Price**: Price (e.g., "299€" or "$299")
- **Link**: Product URL (optional)
- **Image**: Image URL (optional, placeholder used if empty)
- **IsReserved**: `true` when someone reserves the item (auto-filled by app)
- **ReservedBy**: Name of person who reserved (auto-filled by app)
- **ReservedDate**: Reservation date (auto-filled by app)
- **ReservedEmail**: Email of person who reserved (auto-filled by app)
- **ReservedMessage**: Message from reserver (auto-filled by app)
- **IsCustomPrice**: Set to `true` to enable "Contribute" mode for this item
- **ContributionCount**: Number of contributions made (auto-incremented by app)
- **IsGifted**: `true` when payment is confirmed (auto-filled by app)
- **GiftedBy**: Final gift giver name (auto-filled by app)
- **GiftedMessage**: Final gift message (auto-filled by app)
- **GiftedDate**: Date gift was confirmed (auto-filled by app)

**Example row (starting from row 2):**

| Wireless Headphones | High-quality noise-canceling headphones | 299€ | https://... | https://... | false | | | | | false | 0 | false | | | |

## Environment Variables

### Required:
- `RESEND_API_KEY` - Your Resend API key for email notifications

### Optional:
- `RESEND_FROM_EMAIL` - Custom sender email (requires domain verification in Resend)
- `NEXT_PUBLIC_SITE_URL` - Your site URL for metadata (defaults to `http://localhost:3000`)
- `GOOGLE_SERVICE_ACCOUNT_JSON` - Service account JSON as a string (for production deployment)

## Language Configuration

OpenGift supports English and French. To switch languages:

1. Open `config.js`
2. Change the `language` setting:
   ```js
   language: 'en', // or 'fr' for French
   ```

All UI text, emails, and notifications will automatically use the selected language.

## Deployment

The app is ready for deployment to platforms like Vercel, Netlify, or similar. Make sure to:

1. Set all required environment variables in your deployment platform
2. Add your Google service account JSON as an environment variable:
   - Copy the entire contents of your `service_account.json` file
   - In your deployment platform, create a new environment variable named `GOOGLE_SERVICE_ACCOUNT_JSON`
   - Paste the JSON content as the value (keep it as a single line or properly escaped JSON string)

## Troubleshooting

**Emails not sending?**
- Check that `RESEND_API_KEY` is set correctly in `.env.local`
- Verify your API key is valid in the Resend dashboard
- Check spam folder for test emails
- Look for error messages in the console

**Google Sheets not working?**
- Ensure `service_account.json` is in the project root (local dev)
- Verify the service account email has access to your Google Sheet (Editor permission)
- Check that the spreadsheet ID in `config.js` is correct
- Confirm "Google Sheets API" is enabled in Google Cloud Console

**Items not updating?**
- The app revalidates data on every page load
- Check that column names in your sheet match exactly (case-sensitive)
- Ensure boolean columns use lowercase `true`/`false` values

## Development

- Built with Next.js 14 and TypeScript
- Styled with Tailwind CSS
- Uses Google Sheets API for data storage
- Email notifications via Resend
- Payment processing via Revolut
- Supports English and French languages

## Support

For issues or questions, check the existing issues or create a new one in the repository.