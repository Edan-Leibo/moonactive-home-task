# moonactive-home-task
A parking lot system that processes license plates and prohibits entrance of unauthorized vehicles


## *Overview* :traffic_light::blue_car::taxi::bus::police_car::no_entry:
The system analyzes images of license plates using a third-party OCR API and permits or prohibits entrance according to pre-defined rules applied to the license plate number.
The system uses a simple GUI for image file upload, and displays the extracted license plate number, the decision to permit or prohibit entrance, and the vehicle type.
This data is also stored in a relational database, along with the timestamp and the image file path.

## *What’s needed* :computer:
1. Make sure you have PostgreSQL installed on your machine as well as pgAdmin — PostgreSQL Management Tool (use "12345" as a password).
2. Import into PostgreSQL the database provided in the DB folder under the filename "Parking Lot Backup.tar".
3. Make sure you have Node.js and NPM installed.
4. Download all the dependencies using "npm install".

Following is a link to a Google Drive folder with the images that I used to seed the database:
[https://drive.google.com/drive/folders/1ueUOzJSmxOA-I3P5kCDsArPBzqvWNpkG?usp=sharing](https://drive.google.com/drive/folders/1ueUOzJSmxOA-I3P5kCDsArPBzqvWNpkG?usp=sharing) :open_file_folder:

## *Running the service* :arrow_forward:
1. Type "npm start" in the terminal.
2. Open the browser and type the following URL: "localhost:8000/".
3. Choose a file with the plate image and click on the "Upload" button.
4. The extracted license plate number, the decision to permit or prohibit entrance, and the vehicle type will be displayed.
5. If you wish to kill the process, hit "Ctrl+c".

If you wish to see all the plates records in the database simply send a GET request to "localhost:8000/plates" (you can just go to this URL in the browser).
If you wish to turn off the logger you can comment out line 12 in index.js file

**_Developed by Edan Leibovitz_** :bowtie:

**_edan.leibo@gmail.com_** :email:
