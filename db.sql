CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usertag` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(320) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` binary(60) NOT NULL,
  `date` bigint(20) NOT NULL,
  `follower_count` bigint(20) NOT NULL,
  `following_count` bigint(20) NOT NULL,
  `bio` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `usertag` (`usertag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `post` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `comment_id` bigint(20) NOT NULL,
  `reply_id` bigint(20) NOT NULL,
  `date` bigint(20) NOT NULL,
  `content` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `like_count` bigint(20) NOT NULL,
  `comment_count` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `post_bookmark` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `post_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_bookmark_index` (`user_id`,`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `follow` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `follower_id` bigint(20) NOT NULL,
  `following_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `follow_index` (`follower_id`,`following_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE `auth` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `selector` binary(16) NOT NULL,
  `validator` binary(32) NOT NULL,
  `expires` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `selector` (`selector`),
  UNIQUE KEY `validator` (`validator`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
