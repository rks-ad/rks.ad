# LawUp™ Setup Guide

## Environment Variables

### Required Environment Variables

The following environment variables must be set in your Vercel project for the application to function properly:

#### Email Service (Resend)
- **RESEND_API_KEY**: Your Resend API key for sending emails
  - Get one at: https://resend.com

#### Oracle Database Configuration
These variables configure the connection to your Oracle Database:

- **ORACLE_USER**: Your Oracle database username
- **ORACLE_PASSWORD**: Your Oracle database password  
- **ORACLE_CONNECT_STRING**: Your Oracle connection string

### Fixing "NJS-125: connectString cannot be empty" Error

This error occurs when the `ORACLE_CONNECT_STRING` environment variable is not set or is empty.

**Solution:**

1. Go to your Vercel Project Settings
2. Navigate to "Environment Variables" (or "Vars")
3. Add the following variables:
   - `ORACLE_USER`: Your Oracle username
   - `ORACLE_PASSWORD`: Your Oracle password
   - `ORACLE_CONNECT_STRING`: Your Oracle connection string

### Oracle Connect String Examples

**Option 1: Oracle Cloud (Always Free Tier)**
```
ORACLE_CONNECT_STRING=atp_high  # Replace with your ADB name
```

**Option 2: Oracle Autonomous Database**
```
ORACLE_CONNECT_STRING=your_adb_domain_name_high
```

**Option 3: Self-Managed Oracle (Thin Mode)**
```
ORACLE_CONNECT_STRING=hostname:1521/service_name
```

**Option 4: Local Development**
```
ORACLE_CONNECT_STRING=localhost:1521/ORCL
```

### How to Find Your Oracle Connection String

1. **Oracle Cloud Console:**
   - Log into your Oracle Cloud account
   - Go to Autonomous Database
   - Click your database instance
   - Go to "Database Connection" tab
   - Copy the connection string from the appropriate wallet

2. **Self-Managed Oracle:**
   - Ask your database administrator
   - Format: `hostname:port/service_name`
   - Default port: 1521

3. **Local Oracle:**
   - Hostname: `localhost` or `127.0.0.1`
   - Port: `1521` (default)
   - Service Name: `ORCL` (default) or your configured service name

## Setting Up Vercel Environment Variables

1. **Via Vercel Dashboard:**
   - Go to your project Settings
   - Click "Environment Variables"
   - Add each variable with its value
   - Redeploy for changes to take effect

2. **Via Vercel CLI:**
   ```bash
   vercel env add ORACLE_USER
   vercel env add ORACLE_PASSWORD
   vercel env add ORACLE_CONNECT_STRING
   vercel env add RESEND_API_KEY
   ```

## Troubleshooting

### Error: "NJS-125: connectString cannot be empty or undefined"
- Check that `ORACLE_CONNECT_STRING` is set in environment variables
- Verify the connection string format is correct
- Ensure there are no leading/trailing spaces

### Error: "ORA-12170: TNS:Connect timeout occurred"
- Verify your connection string is correct
- Check network connectivity to the Oracle server
- Ensure firewall rules allow the connection

### Email Not Sending
- Verify `RESEND_API_KEY` is set correctly
- Check your email address is verified in Resend dashboard
- Review Resend logs for delivery status

## Contact Form & OTP Verification

The application uses:
- **Resend** for sending OTP verification emails and contact form notifications
- **Oracle Database** for storing form submissions and booking data

Both services must be properly configured for the booking and contact forms to work.
