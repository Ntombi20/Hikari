

DROP TABLE IF EXISTS `img`;

CREATE TABLE IF NOT EXISTS `img` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `profile_url` text NOT NULL,
  `background_url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;



CREATE TABLE IF NOT EXISTS `geo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `latitude` float(10,10) NOT NULL,
  `longitude` float(10,10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` text NOT NULL,
  `tel` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

DROP TABLE IF EXISTS `places`;

CREATE TABLE IF NOT EXISTS `places` (

    id int NOT NULL AUTO_INCREMENT,
    name char (100) not null,
    description char (250) not null,
    category_id int,
    img_id int,
    geo_id int,
    contact_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (img_id) REFERENCES img(id),
    FOREIGN KEY (geo_id) REFERENCES geo(id),
    FOREIGN KEY (contact_id) REFERENCES contact(id)
);
