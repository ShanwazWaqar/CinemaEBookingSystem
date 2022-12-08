# Online Cinema Booking
<h3> Clone the repository using <i> git clone https://github.com/naveen-kurra/OnlineCinemaBooking/ </i> or download directly from github as zip file and extract.</h3>
<h1>Implement the website the in the following steps</h1>
<ul><li><a href="https://www.oracle.com/java/technologies/downloads/">Install Java JDK from oracle</a></li>
<li>Install <a href="https://spring.io/tools">Spring Tool Suite, </a><a href="https://www.eclipse.org/downloads/">Eclipse</a> or any other springboot compatable IDE's </li>
<li><a href="https://code.visualstudio.com/">Download Visual Studio Code (Recomended)</a></li>
<li>Follow the link to install Angular CLI <a href="https://angular.io/cli">Angualar(Recomended)</a> and Install <a href="https://nodejs.org/en/download/">NodeJs(Recomended)</a></li>
<li>Install <a href="https://dev.mysql.com/downloads/workbench/">MySql(Recomended)</a> and if you encounter any issues try using<a href="https://www.apachefriends.org/download.html"> Xampp(Recomended)</a></li>
</ul>
<h1>Frontend</h1>
<ul><li>open project in VS Code and go to terminal and run command <i>npm install</i>,if any exceptions or errors try command <i>npm install -force</i></li>
<li>Now run command <i>ng serve</i> and your frontend should be up and running.</li></ul>
<h1>Database</h1>
<ul><li> start Xampp control pannel and run a<i> apache</i> and <i>mysql</i></li>
<li>Now open MySql workbench and create a MySql connection(localhost).</li>
<li>Now create a database named cinemabooking</ul>
<h1>Backend</h1>
<ul><li>Open Springtool suite or any compatable IDE you are using and go to file => import => existing gradle project and select the directory where is backend folder is loacated</li>
<li>Once the project is build, go to src => resources => application.properties file and change database username and password as required and port number as well if your localhost runs in different port.</li>
  <li>right click on project and go to run as => springboot app.</li>
  <b>Springboot will create all the tables in your database once you run the app.
