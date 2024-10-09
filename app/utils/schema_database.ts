export const createSchema = `
CREATE TABLE IF NOT EXISTS storage (
    id INTEGER PRIMARY KEY NOT NULL,
    key TEXT UNIQUE NOT NULL,
    value TEXT,
    last_modified INTEGER DEFAULT (strftime('%s', 'now')),
);
`;
