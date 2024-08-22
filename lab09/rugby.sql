DROP TABLE IF EXISTS play_in ;
DROP TABLE IF EXISTS matches ;
DROP TABLE IF EXISTS play_for ;
DROP TABLE IF EXISTS previous_positions ;
DROP TABLE IF EXISTS coach ;
DROP TABLE IF EXISTS venue ;
DROP TABLE IF EXISTS player CASCADE;
DROP TABLE IF EXISTS team CASCADE;

SET foreign_key_checks = 0;

CREATE TABLE player
    (playerID       INT         NOT NULL,
    name            VARCHAR(30)    NOT NULL,
    dob             DATE,
    gender          CHAR,
    PRIMARY KEY(playerID)
    );

INSERT INTO player VALUES
    ('123568', 'James Leung', '1988-05-22', 'M');
INSERT INTO player VALUES
    ('123589', 'David Zhang', '1995-01-01', 'F');
INSERT INTO player VALUES
    ('123601', 'Stephen Zhao', '1981-06-19', 'F');
INSERT INTO player VALUES
    ('123612', 'Ryan Ling', '2004-12-31', 'M');

CREATE TABLE team
    (name       VARCHAR(30)    NOT NULL,
    emblem      VARCHAR(30)    NOT NULL,
    PRIMARY KEY(name)
    );

INSERT INTO team VALUES
    ('Super', 'Eagle');
INSERT INTO team VALUES
    ('Enemy losing!', 'Pig');
INSERT INTO team VALUES
    ('Duck Team', 'Duck');
INSERT INTO team VALUES
    ('Oxford', 'Oak');

CREATE TABLE venue
    (name      VARCHAR(30)    NOT NULL,
    address     VARCHAR(150)   NOT NULL,
    PRIMARY KEY(name)
    );

INSERT INTO venue VALUES
    ('Glass', '15 Super Street, Wu Too, North West Town, New Zealand');
INSERT INTO venue VALUES
    ('Sand', '21 Oxford Street, Wu Too, North West Town, New Zealand');
INSERT INTO venue VALUES
    ('Soil', '2 See Street, Wu Too, North West Town, New Zealand');

CREATE TABLE matches
    (matchID    INT         NOT NULL,
    home_team   VARCHAR(30)    NOT NULL,
    away_team   VARCHAR(30)    NOT NULL,
    vname       VARCHAR(30)    NOT NULL,
    home_score  INT         NOT NULL,
    away_score  INT         NOT NULL,
    date_time   DATE,
    PRIMARY KEY(matchID),
    CONSTRAINT fk_home_team FOREIGN KEY (home_team) REFERENCES team(name),
    CONSTRAINT fk_away_team FOREIGN KEY (away_team) REFERENCES team(name),
    CONSTRAINT fk_vname FOREIGN KEY (vname) REFERENCES venue(name)
    );

INSERT INTO matches VALUES
    ('0001', 'Duck Team', 'Super', 'Soil', '3', '1', '2019-07-26');
INSERT INTO matches VALUES
    ('0002', 'Duck Team', 'Oxford', 'Glass', '1','2', '2019-07-29');
INSERT INTO matches VALUES
    ('0003', 'Super', 'Oxford', 'Soil', '7','1', '2019-08-06');
INSERT INTO matches VALUES
    ('0005', 'Enemy losing!', 'Duck Team', 'Sand', '0','2', '2019-08-12');

CREATE TABLE coach
    (fname      VARCHAR(15)    NOT NULL,
    lname       VARCHAR(15)    NOT NULL,
    team_name   VARCHAR(30),
    position    VARCHAR(20) NOT NULL,
    start_date  DATE,
    PRIMARY KEY(fname, lname, team_name),
    CONSTRAINT fk_team_name1 FOREIGN KEY (team_name) REFERENCES team(name)
    );

INSERT INTO coach VALUES
    ('David', 'Wong', 'Super', 'Forward', '2018-12-21');
INSERT INTO coach VALUES
    ('James', 'Chen', 'Oxford', 'After', '2018-11-19');
INSERT INTO coach VALUES
    ('Tim', 'Popper', 'Duck Team', 'NULL', '2018-11-30');
INSERT INTO coach VALUES
    ('Fiora', 'Leung', 'Enemy losing!', 'NULL', '2018-12-01');

CREATE TABLE play_in
    (playerID   INT     NOT NULL,   
    matchID     INT     NOT NULL,
    CONSTRAINT fk_playerID1 FOREIGN KEY (playerID) REFERENCES player(playerID),
    CONSTRAINT fk_matchID FOREIGN KEY (matchID) REFERENCES matches(matchID)
    );

INSERT INTO play_in VALUES
    ('123589', '0002');
INSERT INTO play_in VALUES
    ('123612', '0005');

CREATE TABLE play_for
    (playerID     INT     NOT NULL,   
    team_name   VARCHAR(30)    NOT NULL,
    position    VARCHAR(20) NOT NULL,
    CONSTRAINT fk_playerID2 FOREIGN KEY (playerID) REFERENCES player(playerID),
    CONSTRAINT fk_team_name FOREIGN KEY (team_name) REFERENCES team(name)
    );

INSERT INTO play_for VALUES
    ('123589', 'Super', 'NULL');
INSERT INTO play_for VALUES
    ('123612', 'Enemy losing!', 'NULL');

CREATE TABLE previous_positions
    (fname      VARCHAR(15)    NOT NULL,
    lname       VARCHAR(15)    NOT NULL,
    team_name   VARCHAR(30)    NOT NULL,
    position    VARCHAR(20) NOT NULL,
    PRIMARY KEY(fname, lname, team_name, position),
    FOREIGN KEY (fname, lname) REFERENCES coach(fname, lname),
    CONSTRAINT fk_team_name2 FOREIGN KEY (team_name) REFERENCES team(name)
    );

INSERT INTO previous_positions VALUES
    ('Tim', 'Popper', 'Duck Team', 'NULL');
INSERT INTO previous_positions VALUES
    ('Fiora', 'Leung', 'Enemy losing!', 'NULL');

SET foreign_key_checks = 1;
COMMIT;