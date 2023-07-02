INSERT INTO authorities (authority) VALUES ('user');
INSERT INTO authorities (authority) VALUES ('admin');

INSERT INTO users
    (username, first_name, last_name, email, password, enabled, account_non_expired, account_non_locked, credentials_non_expired)
    VALUES
    ('user', 'user', 'user', 'user@email.com', '$2a$10$COl0Wr4q2LJ0WZNo.SOqGuWdOWRCvw7srmdjwhvBW0BuiNjjP7pEm', true, true, true, true);
INSERT INTO users_authorities(user_id, authorities_id) VALUES (
    (SELECT id FROM users WHERE username='user'),
    (SELECT id FROM authorities WHERE authority='user')
);

INSERT INTO users
    (username, first_name, last_name, email, password, enabled, account_non_expired, account_non_locked, credentials_non_expired)
    VALUES
    ('admin', 'admin', 'admin', 'admin@email.com', '$2a$10$tN4.kfda/ezxPuue/4StsuG0KnpyE5nqYkxNW7vcMh3buMr1lp4Vu', true, true, true, true);
INSERT INTO users_authorities(user_id, authorities_id) VALUES (
    (SELECT id FROM users WHERE username='admin'),
    (SELECT id FROM authorities WHERE authority='admin')
);

