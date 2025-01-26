-- Drop tables if they exist
DROP TABLE IF EXISTS observations;
DROP TABLE IF EXISTS activities;
DROP TABLE IF EXISTS participants;

-- Create tables
CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    access_code VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    points INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE observations (
    id SERIAL PRIMARY KEY,
    observer_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
    target_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
    activity_id INTEGER REFERENCES activities(id) ON DELETE CASCADE,
    timestamp TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT different_participants CHECK (observer_id != target_id)
);

-- Create indexes
CREATE INDEX idx_observations_observer ON observations(observer_id);
CREATE INDEX idx_observations_target ON observations(target_id);
CREATE INDEX idx_observations_activity ON observations(activity_id);
CREATE INDEX idx_observations_timestamp ON observations(timestamp);