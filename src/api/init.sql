-- TODO: find a way to remove this file used in integrationtests
CREATE TABLE "configuration" (
    "name" character varying(256) NOT NULL,
    "value" character varying(1000) NOT NULL,
    CONSTRAINT "PK_28ac27674364374c342e83cba9d" PRIMARY KEY ("name")
);

INSERT INTO
    "configuration" ("name", value)
VALUES
    ('MyConfig', 'myValue');