#!/bin/bash

# Run Certbot to obtain SSL certificates
certbot certonly --standalone --non-interactive -d realmdungeons.ofroncie.pl --email webzaleski@gmail.com --agree-tos 

# Start your Node.js app with HTTPS support
if [ -f "/etc/letsencrypt/live/realmdungeons.ofroncie.pl/privkey.pem" ]; then
  npm start
else
  echo "SSL certificate files not found. Exiting..."
fi


(crontab -l 2>/dev/null; echo "0 2 * * * certbot renew --quiet") | crontab -