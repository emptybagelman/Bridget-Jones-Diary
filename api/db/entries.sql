DROP TABLE IF EXISTS diary;

CREATE TABLE diary (
    entry_id INT GENERATED ALWAYS AS IDENTITY,
    date VARCHAR(50) NOT NULL UNIQUE,
    time VARCHAR(10) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    PRIMARY KEY (entry_id)
);

INSERT INTO diary (date, time, content) VALUES 
('17/08/23','12:20','Hackathon time, baby!'),
('16/08/23','09:00','I hate debugging it''s terrible');