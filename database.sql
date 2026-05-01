CREATE DATABASE grav;

USE grav;

CREATE TABLE users (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_online TIMESTAMP NULL,
    UNIQUE (username)
);

CREATE TABLE friendships (
    user_id INTEGER NOT NULL,
    friend_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id),
    PRIMARY KEY (user_id, friend_id)
);

CREATE TABLE friend_requests (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    status ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    UNIQUE (sender_id, receiver_id)
);

CREATE TABLE game (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    owner INTEGER NOT NULL,
    size INTEGER NOT NULL,
    sequence_max INTEGER NOT NULL,
    area_size INTEGER NOT NULL,
    area_max INTEGER NOT NULL,
    distance_min INTEGER NOT NULL,
    distance_max INTEGER NOT NULL,
    state ENUM('waiting', 'playing', 'finished', 'closed') NOT NULL DEFAULT 'waiting',
    current_turn_index INTEGER NULL,
    consecutive_passes INTEGER NOT NULL DEFAULT 0,
    password VARCHAR(255) NULL,
    max_players INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (owner) REFERENCES users(id)
);

CREATE TABLE player (
    game_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (game_id, user_id)
);

CREATE TABLE game_gravs (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    game_id INTEGER NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    is_removed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES game(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
