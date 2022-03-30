DROP TABLE Positions;

CREATE TABLE Positions (
   pID SERIAL PRIMARY KEY,
   title VARCHAR(100),
   url VARCHAR(1000),
   expiry DATE,
   description TEXT
--    comID INTEGER NOT NULL,
--    pType VARCHAR(50) NOT NULL
--    FOREIGN KEY (comID) REFERENCES Companies,
--    FOREIGN KEY (pType) REFERENCES Position_Types
);

INSERT INTO Positions (title, url, expiry, description)
VALUES ('sample title', 'sample url', '2022-04-10', 'sample description');

INSERT INTO Positions (title, url, expiry, description)
VALUES ('sample title 2', 'sample url 2', '2022-04-11', 'sample description 2');
