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

DROP TABLE CitizenshipReq CASCADE;
CREATE TABLE CitizenshipReq (
        reqID SERIAL,
        statusReq VARCHAR(100),
        counName VARCHAR(100) NOT NULL,
        PRIMARY KEY (reqID),
        FOREIGN KEY (counName) REFERENCES Countries
    );

DROP TABLE Requirements CASCADE;
CREATE TABLE Requirements (  -- delete cascade
        reqID SERIAL,
        strict BOOLEAN,
        citizenReqFlag BOOLEAN,
        expReqFlag BOOLEAN,
        PRIMARY KEY (reqID)
    );

DROP TABLE Experience_Req CASCADE;
CREATE TABLE Experience_Req (
	reqID SERIAL,
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