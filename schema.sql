CREATE TABLE Posts(
    id INTEGER auto_increment PRIMARY KEY,
    title VARCHAR(75) not null,
    category VARCHAR(12) not null,
    content TEXT,
    created DATE default (CURRENT_DATE) not null,
    createdtime DATETIME default NOW() not null,
    user VARCHAR(20) NOT NULL DEFAULT 'unknown'
);

CREATE TABLE Comments(
    comment_id INTEGER auto_increment PRIMARY KEY,
    post_id INTEGER not null,
    commenter_name VARCHAR(30) not null,
    comment TEXT,
    FOREIGN KEY (post_id) REFERENCES Posts(id) ON DELETE CASCADE
);

CREATE TABLE Users(
    user_id INTEGER auto_increment PRIMARY KEY,
    username VARCHAR(20) unique not null,
    password VARCHAR(60) not null,
    admin BOOLEAN default FALSE not null
);