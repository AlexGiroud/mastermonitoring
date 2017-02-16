### Master Monitoring
An app written in nodeJS connecting to an AZURE IoT-Hub and serving apiKey to devices.
It can also list in json the devices registred on this IoT-Hub and send messages.

#Installation

You need to clone this repo :
```
git clone https://github.com/AlexGiroud/mastermonitoring.git
```
Then you need to install the dependecies :
```
npm install
```
Go to azure and get an IoT-Hub key (you may need to create one) and add it to config.ini.
```
nano config.ini
```
Deploy the application on a Web App on azure or on your server, remember the url and port, you will need to specify it in your devices configuration.

#Install devices

Go to https://github.com/AlexGiroud/monitoringsys
