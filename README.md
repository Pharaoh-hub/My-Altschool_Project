🚀 The Future of AI-Powered Logistics

> A dynamic prototype showcasing cloud deployment, reverse proxy setup, and a Node.js-powered landing page hosted on AWS.

---

Live Project Access

* **Public IP**: [http://13.61.2.68](http://13.61.2.68)
* **Secure Domain**: [https://gogogaga.site](https://gogogaga.site)
* **Backend Access**:

  * [http://13.61.2.68:3000](http://13.61.2.68:3000)
  * [http://gogogaga.site:3000](http://gogogaga.site:3000)


 ===Author

OLADOYE TOYEEB OLAOLUWA
Lead Cloud Engineer 
AWS Certified
Full-stack Developer 
DevOps Specialist


===Tech Stack

                      ALL CODES WRITTEN AND WORKED ON IN KALI LINUS OS
                    
* OS: Kali Linux (Client) & Ubuntu 22.04 (Server)
* Cloud: AWS EC2 (t2.micro)
* Web Server: Nginx (Reverse Proxy)
* Backend: Node.js + Express
* Process Manager: PM2
* SSL: Let’s Encrypt via Certbot
* Styling: Tailwind CSS

---

#🚧 Server & Deployment Setup

## 1. 🖥️ EC2 Instance Provisioning

* Launched a t2.micro instance with Ubuntu 22.04.
* Configured the security group to allow ports: "22", "80", "443", 3000".

## 2. 🔐 SSH Access

---bash
chmod 400 Pharaoh_key.pem
ssh -i Pharaoh_key.pem ubuntu@13.61.2.68


## 3. 📄 Upload HTML Landing Page

bash
scp /media/sf_index.htm/index.html ubuntu@13.61.2.68:/var/www/html/
sudo nano /var/www/html/index.html
```

 [View HTML file in server](https://drive.google.com/file/d/1JTu76Dz6sAV28yX8sqvfs1sH6pdOOP3p/view?usp=sharing)

---

#  Firewall Configuration (UFW)

bash
sudo apt update
sudo apt install ufw -y
sudo ufw allow OpenSSH
sudo ufw allow 22 80 443 3000
sudo ufw enable
sudo ufw status


📸 [View allowed ports](https://drive.google.com/file/d/1rIF1tJDwtKihXdE3Z128TxxWhsZ2i0oi/view?usp=sharing)

---

##  Installing Required Software

# Install Nginx & Node.js

bash
sudo apt install nginx -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y


### Create Node.js App

bash
mkdir myproject && cd myproject
npm init -y
npm install express
nano pharaoh.js


🔧 Sample Node.js code (`pharaoh.js`):

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <body style="background-color: #f0f8ff; font-family: Arial, sans-serif; text-align: center; padding: 50px;">
      <h1 style="color: #2c3e50;">🚀 THE DYNAMIC PROTOTYPE!</h1>
      <p style="color: #34495e; font-size: 1.2em;">
        Discover, connect, and create — all in one place.
      </p>
    </body>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
```

📸 [View Node.js app screenshot](https://drive.google.com/file/d/1o3i372dzkynRqSP9OFC2PysDOxR-NmbI/view?usp=sharing)

---

## 🔄 Run Node.js with PM2

```bash
sudo npm install -g pm2
pm2 start pharaoh.js
pm2 save
pm2 startup
```

---

## 🛡️ SSL & Nginx Configuration

### Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d gogogaga.site -d www.gogogaga.site
```

### Nginx Reverse Proxy Configuration

```bash
sudo nano /etc/nginx/sites-available/default
```

📸 [Nginx config screenshot](https://drive.google.com/file/d/19-M_X1SaDJ7-z3-m8L-CGDDzCwGK-MQV/view?usp=sharing)

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name gogogaga.site www.gogogaga.site;

    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name gogogaga.site www.gogogaga.site;

    root /var/www/html;
    index index.html index.htm;

    ssl_certificate /etc/letsencrypt/live/gogogaga.site/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gogogaga.site/privkey.pem;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

## ✅ Screenshots & Verification

* **HTTP (Unsecured)**
  📸 [Landing Page via HTTP](https://drive.google.com/file/d/1t16YaW43NNxGKSqBKMswqIGwALUqe_en/view?usp=sharing)

* **HTTPS (Secured)**
  📸 [Landing Page via HTTPS](https://drive.google.com/file/d/1-lvAmO9H9FUVfQazpjD0OWLN0NxWNQVZ/view?usp=sharing)

* **Backend via Node.js & Nginx**
  📸 [Backend Page](https://drive.google.com/file/d/1C0xQGq7FNWmUyH_hd0fYCxpD2MeN90hD/view?usp=sharing)
  📸 [Reverse Proxy Setup](https://drive.google.com/file/d/1h0lcboQCcca-AKsBWvvv97TicdeRtUnm/view?usp=sharing)

---

## 🏁 Final Result

Access the live project:

* 🔗 [http://13.61.2.68](http://13.61.2.68)
* 🔐 [https://gogogaga.site](https://gogogaga.site)
* ⚙️ [http://13.61.2.68:3000](http://13.61.2.68:3000)
