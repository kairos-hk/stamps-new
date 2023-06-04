create user stamps@localhost;
create schema stamps;

create table stamps.users (
  user_id int not null auto_increment primary key,
  user_name varchar(30) not null,
  user_group varchar(30) not null,
  user_phone varchar(30) not null,
  booth_id int
);

create table stamps.stamps (
  stamp_id int not null auto_increment primary key,
  user_id int not null,
  booth_id int not null
);

create table stamps.booths (
  booth_id int not null auto_increment primary key,
  booth_name varchar(30) not null
);
