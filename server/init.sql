DROP TABLE Positions CASCADE;
CREATE TABLE Positions (
        pID SERIAL,
        url VARCHAR(1000),
        description TEXT,
        title VARCHAR(50),
        expiry DATE,
        comID INTEGER NOT NULL,
        pType VARCHAR(50) NOT NULL,
        PRIMARY KEY(pID),
        FOREIGN KEY (comID) REFERENCES Companies,
        FOREIGN KEY (pType) REFERENCES Position_Types
    );

DROP TABLE Position_Types CASCADE;
CREATE TABLE Position_Types (
	pType VARCHAR(50),
    fixedLength BOOL,
    aimedAtStudents BOOL,
    PRIMARY KEY(pType)
    );

DROP TABLE Companies CASCADE;
CREATE TABLE Companies (
	comID SERIAL,
        comName VARCHAR(100),
        nEmpl INTEGER,
        PRIMARY KEY (comID)
    );

DROP TABLE Associated_Ind CASCADE;
CREATE TABLE Associated_Ind  (
    	comID SERIAL,
    	indName VARCHAR(50),
    	PRIMARY KEY (comID, indName),
    	FOREIGN KEY (comID) REFERENCES Companies,
    	FOREIGN KEY (indName) REFERENCES Industries
    );

DROP TABLE Industries CASCADE;
CREATE TABLE Industries (
	    indName VARCHAR(50),
	    PRIMARY KEY (indName)
    );

DROP TABLE Located_In CASCADE;
CREATE TABLE Located_In (
	pID SERIAL,
	cityName VARCHAR(100),
	counName VARCHAR(100) NOT NULL,
	PRIMARY KEY (pID, cityName, counName),
	FOREIGN KEY (pID) REFERENCES Positions,
	FOREIGN KEY (cityName, counName) REFERENCES Cities
);

DROP TABLE Cities CASCADE;
CREATE TABLE Cities (
        cityName VARCHAR(100),
        stateName VARCHAR(100),
        counName VARCHAR(100) NOT NULL,
        PRIMARY KEY (cityName, counName),
        FOREIGN KEY (counName) REFERENCES Countries
	ON DELETE CASCADE
    );

DROP TABLE Countries CASCADE;
CREATE TABLE Countries (
        counName VARCHAR(100),
        PRIMARY KEY (counName)
    );

DROP TABLE Citizenship_Req CASCADE;
CREATE TABLE Citizenship_Req (
        reqID INTEGER,
        statusReq VARCHAR(100),
        counName VARCHAR(100) NOT NULL,
        PRIMARY KEY (reqID),
        FOREIGN KEY (counName) REFERENCES Countries
    );

DROP TABLE Requirements CASCADE;
CREATE TABLE Requirements (  -- delete cascade
        reqID INTEGER,
        strict BOOLEAN,
        citizenReqFlag BOOLEAN,
        expReqFlag BOOLEAN,
        PRIMARY KEY (reqID)
    );

DROP TABLE Experience_Req CASCADE;
CREATE TABLE Experience_Req (
	    reqID INTEGER,
	    sName VARCHAR(100),
	    licenceReq VARCHAR(100),
        years INTEGER,
        PRIMARY KEY (reqID),
        FOREIGN KEY (sName) REFERENCES Skills
    );

DROP TABLE Skills CASCADE;
CREATE TABLE Skills (
        sName VARCHAR(100),
        sDesc TEXT,
        PRIMARY KEY (sName)
    );

DROP TABLE Requires CASCADE;
CREATE TABLE Requires (
	    pID SERIAL,
	    reqID INTEGER,
	    PRIMARY KEY (pID, reqID),
	    FOREIGN KEY (pID) REFERENCES Positions,
	    FOREIGN KEY (reqID) REFERENCES Requirements
    );

INSERT INTO Positions (url, description, title, expiry, comID, pType)
VALUES ('www.ITconsultant123.com', 'IT consulting description goes here. ', 'IT Consultant', '2025-05-01', 1, 'Permanent Full-time'),
      ('www.ubcprofjobs.com', 'Positin at University of British Columbia. Teach Database management.','CS304 Professor', '2022-05-01', 2, 'Permanent Full-time'),
      ('www.redrobinsjobs.com', 'Floor staff, wanted for 15:00~19:00','Floor Staff', '2020-12-31', 3, 'Permanent Part-time'),
      ('www.ubcprofjobs.com', 'Positin at University of British Columbia. Teach introduction of computer science.','CS110 Professor', '2023-01-01', 2, 'Contract Full-time'),
      ('www.lululemonjobs.com', 'Become the designer of lululemon for upcoming apparel project','Apparel Designer', '2022-07-04', 5, 'Contract Full-time'),
      ('www.ubcprofjobs.com', 'TA for cs304', 'CS304 TA', '2021-11-11', 2, 'Contract Part-time'),
      ('www.ubcprofjobs.com', 'Cleaner of CS Xwing', 'Cleaner', '2023-12-12', 2, 'Permanent Part-time'),
      ('www.ubcprofjobs.com', 'Internship opportunity for graduate student', 'Internship Opportunity at UBC', '2022-12-31', 2, 'Internship');

INSERT INTO Companies (comName, nEmpl)
VALUES ('Accenture', 699000),
      ('University of British Columbia', 6000),
      ('Red Robins', 10000),
      ('Thirsty', 5000),
      ('Lululemon', 25000);


INSERT INTO Position_Types (pType, fixedLength, aimedAtStudents)
VALUES ('Contract Full-time', true, false),
      ('Permanent Full-time', false, false),
      ('Contract Part-time', true, false),
      ('Permanent Part-time', false, false),
      ('Internship', true, true);
      
INSERT INTO Industries (indName)
VALUES ('Education'),
      ('Food'),
      ('Apparel'),
      ('Consulting'),
      ('Automobile');

INSERT INTO Countries (counName)
VALUES ('United States'),
      ('Canada'),
      ('United Kingdom'),
      ('France'),
      ('China');

INSERT INTO Cities (cityName, counName, stateName)
VALUES ('Los Angeles', 'United States', 'California'),
      ('Vancouver', 'Canada', 'British Columbia'),
      ('New York', 'United States', 'New York'),
      ('Toronto', 'Canada', 'Ontario'),
      ('London', 'United Kingdom', 'London');

INSERT INTO Requirements (reqID, strict, citizenReqFlag, expReqFlag)
VALUES (1,true, true, false),
      (2, true, true, false),
      (3, false, true, false),
      (4, true, true, false),
      (5, false, true, false),
      (6, true, false, true),
      (7, false, false, true),
      (8, true, false, true),
      (9, true, false, true),
      (10, false, false, true);

INSERT INTO Citizenship_Req (reqID, statusReq, counName)
VALUES (1, 'Citizen', 'United States'),
      (2, 'Permanent Residence', 'United Kingdom'),
      (3, 'Citizen', 'Canada'),
      (4, 'Citizen', 'China'),
      (5, 'Permanent Residence', 'China');

INSERT INTO Experience_Req (reqID, licenceReq, years, sName)
VALUES (6, 'Class 5 Driving', 10, 'Driving'),
      (7, 'CPA', 5, 'Accounting'),
      (8, NULL, 3, 'C++'),
      (9, NULL, 4, 'Java'),
      (10, NULL, 2, 'Python');

INSERT INTO Skills (sName, sDesc)
VALUES ('Driving', 'Driving license, eligibility to drive a car'),
      ('Accounting', 'Accounting skills'),
      ('Java', 'Java, the programming language'),
      ('C++', 'C++, the programming language'),
      ('Python', 'Python, the programming language');

INSERT INTO Requires (pID, reqID)
VALUES (1, 2),
      (2, 6),
      (2, 1),
      (1, 8),
      (3, 2);

INSERT INTO Located_In (pID, counName, cityName) 
VALUES (1, 'United Kingdom', 'London'),
      (2, 'United States', 'New York'),
      (3, 'Canada', 'Vancouver'),
      (4, 'Canada', 'Toronto'),
      (5, 'Canada', 'Vancouver');

INSERT INTO Associated_Ind (comID, indName)
VALUES (1, 'Consulting'),
      (2, 'Education'),
      (3, 'Food'),
      (4, 'Food'),
      (5, 'Apparel');