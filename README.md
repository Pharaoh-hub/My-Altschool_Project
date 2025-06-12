# 🚀 The Future of AI-Powered Logistics

	A dynamic prototype built to showcase cloud deployment, reverse proxy setup, and a Node.js-powered landing page hosted on AWS.

---

## Project Overview

	This project demonstrates how to build and deploy a dynamic prototype using modern cloud infrastructure and professional deployment practices.

## Author

	 Oladoye Toyeeb Olaoluwa–
 	Lead Cloud Engineer--AWS Certified--Full-stack Developer--DevOps Specialist

---
 Tech Stack
 
	* A Kali Linus 
	* AWS EC2 (Ubuntu 22.04)
	* Node.js + Express
	* Nginx (Reverse Proxy)
	* PM2 (Process Manager)
	* Let’s Encrypt (SSL via Certbot)
	* Tailwind CSS (Styling)

---

## Detailed Setup Instructions

					"Everything was done on my Kali Linus"
     						
                                	MY SERVER SETUP

        

I opened a free tier account with AWS:	


#1. Provision EC2 Instance

	* Launched a "t2.micro" instance using "Ubuntu 22.04". (To configured my EC2 Instance,I Launched the EC2 Instance by Logging into my AWS Management Console, I browsed to the EC2 Dashboard and clicked on the Launch Instance, chose the Amazon Machine Image (AMI), then proceeded to select Ubuntu 22.04 LTS as my preferred version
	* I chose an Instance Type: selected t2.micro (eligible for AWS Free Tier).
	* Configured my Instance details, by keeping the default settings unless I need a more specific configurations
	* Added the storage by:Setting storage size to 20gb
	* Configured security group by allowing the following ports:

	--SSH which is a secure shell (Port 22) to enables me remotely access my server securely and performed other operations
  
	--HTTP which is a HyperText Transfer Protocol, basically enables web browsers allow access to websites (Port 80) and allows web traffic.

	--HTTPS This is a secure version of HTTP using SSL(Secure Sockets Layer) certificate, is an encryption security protocal(Port 443) → Enables secure web traffic.

	--Port 3000 for nodejs, allow access to the backend using a reverse proxy(nginx), I detailed this later in the project.

I set my source type to anywhere (0.0.0.0/0) for public access, launched and downloaded the key pair for my opened ports "22, 80, 443, 3000" in the security group.

#2. SSH Into My Server

	I used the "pharaoh_key.pem" Private key file I downloaded from AWS:


Commands I ran on my server via my Kali::


	"chmod 400 Pharaoh_key.pem"	
	this was to sets the file permissions so that only the myself can read the file, while preventing anyone else from modifying or executing it.

Breaking it down:

	chmod-- This changes the file permissions or mode, chmod simply means "change mode"

	400-- 4 is the special privileges to Read, Write, Execute and Delete, 00 permissions for others. 
  

                                              MY WEB SERVER
                  

I wrote an HTML landing page code and saved it under a directory called index.html on my kali so I can easily access it whenever I ssh into my server. 

Attached screenshot of my HTML landing page code--(https://drive.google.com/file/d/1xrhtSh1hyLxUJ4MM1AcaU-t7QzwU2oAH/view?usp=sharing)
	
I was able to copy the HTML landing page code written and saved in my index.html directory on my kali via the Secure Copy Protocol SCP

	"scp /media/sf_index.htm/index.html ubuntu@13.61.2.68:/var/www/html/ since the default directory for html file on the server is /var/www/html. 

I ran

	"ssh -i Pharaoh_key.pem ubuntu@13.61.2.68" to securely access my server using my private key which is in the 	same directory I ssh from with my public IP Address. 

After ssh into my server,I ran

 	"sudo nano /var/www/html/index.html" to view my html file in my server
Attached screenshot to confirm my HTML landing page code is in my server under the /var/www/html/index.html directory
---https://drive.google.com/file/d/1JTu76Dz6sAV28yX8sqvfs1sH6pdOOP3p/view?usp=sharing
					 

					HOW I DEPLOYED EVERYTHING ON MY SERVER

					
#3. Enable Required Ports (Using UFW)

I downloaded ufw(Uncomplicated Firewall) on the server using 

	"sudo apt update" to update the package lists as a root or superuser on my system, check for new version of 	the package I'm about to install
then I ran

	"sudo apt install ufw -y" to install the latest available version of ufw
	"sudo ufw status" to checked if it's installed
I allowed SSH to avoid locking myself out of my server

	"sudo ufw allow OpenSSH"
	"sudo ufw status" to checked the status if it was active or not. if it wasn't active, then I ran
	"sudo ufw enable" to get it enabled, so it can be active and running, then I ran
	"sudo ufw status" again to confirm the activeness. 
I ran the following commands;

	"sudo ufw allow 22"
	"sudo ufw allow 80"
	"sudo ufw allow 443"
	"sudo ufw allow 3000" 
to allow my server access SSH which is port 22; HTTP=port 80,HTTPS=port 443 and Port 3000 is commonly used 				by Node.js applications. 



I then enabled all ports using "sudo ufw enable" and "sudo ufw status numbered" to confirmed the number of ports I just allowed and "sudo ufw status" to check if they are all running. 


Attached screenshot of all the ports allowed over over IPv4 and Ipv6---https://drive.google.com/file/d/1rIF1tJDwtKihXdE3Z128TxxWhsZ2i0oi/view?usp=sharing

4. I Installed all the required Server Software (nginx, nodejs and express. 
Commands I ran
	
 "sudo apt update" to update my package lists and "sudo apt install nginx -y" to install nginx which acts as 	a reverse proxy(middleman between users and backends servers) and serves static HTML, CSS and images that's 	required to host our HTML code on our server

	"sudo apt update" and "sudo apt install nginx -y" ---to update and install nginx as superuser(root)
	"curl -fsSL https://deb.nodesource.com/setup_18.x" | "sudo -E bash -" ---Access the nodesource repository and executes as superuser
	"sudo apt install -y nodejs" ---To install nodejs as superuser

After installing both nginx and nodejs...I created a project directory 

	"mkdir myproject" mkdir=make directory
	"cd myproject" CD is change directory, I changed directory, because that directory is where I'll be executing node.js
   I initialized a Node.js project using the commands 
   
	"npm init -y" npm means Node Package Manager and init means initiaze -y is an automated response of yes, apt asks if you want to continue yes(y) or no(n) but -y means automatic y. 
	"npm install express" This helped to install the Express.js framework for Node.js
I 

"sudo nano myproject" inside the directory "myproject", wrote a code to let the server listens to port 3000 from anywhere and interacts with the backend to display, below is the Attached screenshot of the code---https://drive.google.com/file/d/1o3i372dzkynRqSP9OFC2PysDOxR-NmbI/view?usp=sharing
and this is the visible code 

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
and saved using "control O to write out save as pharaoh.js and press enter then control X to exit

you can find the screenshot of what the display is like

I started the Node.js package or app using

	"node index.js" then access the backend using 13.61.2.68:3000(my public IP Address:the listening port I allowed)
And my feedback was/is

	---ubuntu@ip-172-31-34-251:~/myproject$ node pharaoh.js
	Server running on http://0.0.0.0:3000


	gogogaga.site being my DNS name and port 443 being HTTPS, a secured version of HTTP with SSL certificate. 
	And I enabled the configuration with this code "sudo ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/"
	and test the configuration to confirm it's running and active with "sudo nginx -t" where -t means to test the configuration for any syntax error. 
	To access the domain name or IP Address, you need to start the nginx to apply changes made using "sudo systemctl restart nginx"
And we finally were able to access the server using either https://gogogaga.site and it displays my HTML landing page.  



Public IP
	Server IP: http://13.61.2.68
	Domain: https://gogogaga.site


## Live and Active Details To Check And Access The Landing Page And Backend Using The Server's Public IP Address:3000, The Domain Name And Also Reverse Proxy Like Nginx. 

	##SCREENSHOTS				

## Visit the hosted page: (http://13.61.2.68) IP Address That Accesses The Landing Page Using Just HTTP(not secured) 
	Attached screenshot shows what URL of the landing page looks like with an unsecured HTTP--https://drive.google.com/file/d/1t16YaW43NNxGKSqBKMswqIGwALUqe_en/view?usp=sharing

##(Also accessible via: (https://gogogaga.site)) but with configuring SSL Certificate, making it a Secure Server by getting a domain name for it. 
	Attached screenshot shows what URL of landing page looks like after getting a domain name and making it secure ---https://drive.google.com/file/d/1-lvAmO9H9FUVfQazpjD0OWLN0NxWNQVZ/view?usp=sharing

##(http://13.61.2.68:3000 or http://gogogaga:3000) – Direct access to the Node.js app, A reverse proxy like Nginx is commonly used in backend setups to improve performance, security, and scalability. 
Attached screenshot shows what backend URL and page looks like after implementing node.js and nginx as reverse proxy ---https://drive.google.com/file/d/1C0xQGq7FNWmUyH_hd0fYCxpD2MeN90hD/view?usp=sharing
	https://drive.google.com/file/d/1h0lcboQCcca-AKsBWvvv97TicdeRtUnm/view?usp=sharing

