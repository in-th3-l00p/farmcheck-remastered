INSERT INTO authorities (authority) VALUES ('user');
INSERT INTO authorities (authority) VALUES ('admin');

INSERT INTO users
    (username, first_name, last_name, email, password, enabled, account_non_expired, account_non_locked, credentials_non_expired)
    VALUES
    ('user', 'user', 'user', 'user@email.com', '', true, true, true, true);
INSERT INTO users_authorities(user_id, authorities_id) VALUES (
    (SELECT id FROM users WHERE username='user'),
    (SELECT id FROM authorities WHERE authority='user')
);

INSERT INTO users
    (username, first_name, last_name, email, password, enabled, account_non_expired, account_non_locked, credentials_non_expired)
    VALUES
    ('admin', 'admin', 'admin', 'admin@email.com', '', true, true, true, true);
INSERT INTO users_authorities(user_id, authorities_id) VALUES (
    (SELECT id FROM users WHERE username='admin'),
    (SELECT id FROM authorities WHERE authority='admin')
);

