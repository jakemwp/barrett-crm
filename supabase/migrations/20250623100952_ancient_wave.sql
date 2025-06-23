/*
  # Populate customers table with current data

  1. Data Population
    - Insert all customers from the Client List CSV
    - Map customer types and membership levels appropriately
    - Set default values for required fields
    - Handle different customer categories (Client, Admin, Employee, Auction)

  2. Data Mapping
    - Type mapping: Individual/Business based on company field
    - Membership levels: Standard -> Basic for consistency
    - Storage locations: Moorpark/Westlake Village
    - Generate passwords and other required fields
*/

-- Clear existing customer data first
TRUNCATE TABLE customers CASCADE;

-- Insert customer data from CSV
INSERT INTO customers (
  first_name,
  last_name,
  type,
  membership_level,
  storage_location,
  email,
  phone,
  street_address,
  city,
  state,
  zip_code,
  storage_spots,
  show_panda_doc_form,
  date_created,
  password,
  num_rows,
  manual_price,
  created_at,
  updated_at
) VALUES
-- Individual Clients
('Jason', 'Adang', 'Individual', 'Basic', 'Moorpark', 'jason@adangenterprises.com', '(805) 795-6808', '821 Calle Pecos', 'Thousand Oaks', 'CA', '91360', 2, false, '2024-01-15', 'jasonadang123', 1, 150.00, now(), now()),
('Chris', 'Antonsen', 'Individual', 'Basic', 'Moorpark', 'antonsenchris3@gmail.com', '(818) 381-7105', '4565 Wolsey Court', 'Westlake Village', 'CA', '91361', 1, false, '2024-02-01', 'chrisantonsen123', 1, 150.00, now(), now()),
('Kam', 'Assil', 'Individual', 'Basic', 'Westlake Village', 'kamassil@gmail.com', '(805) 405-2054', '5124 Oxley Place', 'Westlake Village', 'CA', '91362', 1, false, '2024-03-10', 'kamassil123', 1, 150.00, now(), now()),
('Dylan', 'Boztepe', 'Individual', 'Basic', 'Moorpark', 'dylanboztepe1@gmail.com', '(310) 488-9198', '621 Rushing Creek Pl', 'Thousand Oaks', 'CA', '91360', 1, false, '2024-04-15', 'dylanboztepe123', 1, 150.00, now(), now()),
('Jeffrey', 'Brodsly', 'Individual', 'Basic', 'Moorpark', 'jeff@100group.com', '(805) 807-0195', '4263 Tierra Rejada Rd #213', 'Moorpark', 'CA', '93021', 1, false, '2024-05-20', 'jeffreybrodsly123', 1, 150.00, now(), now()),
('Jenson', 'Button', 'Individual', 'Premium', 'Westlake Village', 'jenson@radford.co', '(310) 854-9699', '2969 Calbourne Lane', 'Thousand Oaks', 'CA', '91361', 1, true, '2024-06-01', 'jensonbutton123', 1, 200.00, now(), now()),
('Daniel', 'Casson', 'Individual', 'Basic', 'Moorpark', 'dano4643@gmail.com', '(805) 207-6832', '11546 Willowood Ct', 'Moorpark', 'CA', '93021', 1, false, '2024-06-13', 'danielcasson123', 1, 150.00, now(), now()),
('Richard', 'Cobey', 'Individual', 'Basic', 'Moorpark', 'musicrc@gmail.com', '(818) 307-6515', '5739 Indian Point Drive', 'Simi Valley', 'CA', '93063', 1, false, '2024-08-26', 'richardcobey123', 1, 150.00, now(), now()),
('Assaf', 'Cohen', 'Individual', 'Premium', 'Moorpark', 'lp2mnp@gmail.com', '(818) 825-3764', '5724 Tenneyson Drive', 'Agoura Hills', 'CA', '91301', 3, true, '2024-08-01', 'assafcohen123', 2, 450.00, now(), now()),
('Rory', 'Cypers', 'Individual', 'Basic', 'Westlake Village', 'rorycypers@yahoo.com', '(310) 463-5620', '3816 Bowsprit Circle', 'Westlake Village', 'CA', '91361', 1, false, '2024-09-10', 'rorycypers123', 1, 150.00, now(), now()),
('David', 'Einstein', 'Individual', 'Premium', 'Moorpark', 'deinstein@skyreachsystems.com', '(310) 717-7087', '3925 Hitch Blvd.', 'Moorpark', 'CA', '93021', 1, true, '2024-12-01', 'davideinstein123', 1, 200.00, now(), now()),
('Alfred', 'English', 'Individual', 'Basic', 'Moorpark', 'alfred@sespecreekspirits.com', '(626) 676-0031', '701 Chapala Drive', 'Pacific Palisades', 'CA', '90272', 1, false, '2024-08-26', 'alfredenglish123', 1, 150.00, now(), now()),
('Demetrius', 'Forte', 'Individual', 'Basic', 'Westlake Village', 'gooman68.df@gmail.com', '(216) 235-6345', '123 Main Street', 'Cleveland', 'OH', '44101', 1, false, '2024-10-01', 'demetriusforte123', 1, 150.00, now(), now()),
('Donald', 'Friese', 'Individual', 'Premium', 'Moorpark', 'dj.friese@gmail.com', '(818) 554-2223', '22555 La Quilla Drive', 'Chatsworth', 'CA', '91311', 2, true, '2024-06-21', 'donaldfriese123', 1, 300.00, now(), now()),
('Joshua', 'Gamboa', 'Individual', 'Basic', 'Moorpark', 'joshuarobert100@gmail.com', '(818) 983-6207', '11323 Blythe St.', 'Sun Valley', 'CA', '91352', 1, false, '2024-06-21', 'joshuagamboa123', 1, 150.00, now(), now()),
('John', 'Garcia', 'Individual', 'Premium', 'Moorpark', 'john@johngarcia.org', '(310) 600-6464', '12009 Haven Crest St.', 'Moorpark', 'CA', '93021', 1, true, '2024-08-14', 'johngarcia123', 1, 200.00, now(), now()),
('Jon', 'Garland', 'Individual', 'Premium', 'Moorpark', 'gland20@aol.com', '(520) 241-4816', '1234 Heritage Pl', 'Westlake Village', 'CA', '91362', 3, true, '2024-12-01', 'jongarland123', 2, 450.00, now(), now()),
('Greg', 'Geyer', 'Individual', 'Premium', 'Moorpark', 'gregtgeyer@gmail.com', '(310) 463-2271', '1339 Falling Star Avenue', 'Westlake Village', 'CA', '91362', 2, true, '2024-08-26', 'greggeyer123', 1, 300.00, now(), now()),
('Richard', 'Herbert', 'Individual', 'VIP', 'Westlake Village', 'richard@helixrecruiting.com', '(801) 916-2930', '11950 Beach Club Way', 'Malibu', 'CA', '90265', 3, true, '2024-11-01', 'richardherbert123', 2, 600.00, now(), now()),
('Kenneth', 'Ingoldsby', 'Individual', 'Premium', 'Moorpark', 'kenslaw01@aim.com', '(818) 983-6207', '13636 Ventura Blvd #457', 'Sherman Oaks', 'CA', '91423', 1, true, '2024-04-04', 'kennethinglodsby123', 1, 200.00, now(), now()),
('Kurt', 'Johnson', 'Individual', 'Premium', 'Moorpark', 'kjohnson@hunterrainier.com', '(805) 551-6258', '2284 Stacy Ln.', 'Camarillo', 'CA', '93012', 1, true, '2024-01-01', 'kurtjohnson123', 1, 200.00, now(), now()),
('Paul', 'Johnson', 'Individual', 'Premium', 'Moorpark', 'paulj89@hotmail.com', '(818) 825-8611', '13536 Pacific Breeze Dr.', 'Santa Rosa Valley', 'CA', '93012', 2, true, '2024-06-01', 'pauljohnson123', 1, 300.00, now(), now()),
('Brian', 'Jones', 'Individual', 'VIP', 'Moorpark', 'brianjones81@earthlink.net', '(805) 241-1735', '13723 Nightsky Drive', 'Santa Rosa Valley', 'CA', '93012', 5, true, '2022-12-10', 'brianjones123', 3, 750.00, now(), now()),
('Denise', 'Kirtley', 'Individual', 'Basic', 'Westlake Village', 'denisepkirtley@gmail.com', '(310) 962-1827', '420 Upper Lake Road', 'Thousand Oaks', 'CA', '91361', 1, false, '2024-12-01', 'denisekirtley123', 1, 150.00, now(), now()),
('Matthew', 'Ludwick', 'Individual', 'Premium', 'Moorpark', 'matt@bighornprecision.com', '(406) 559-6579', '16 N Montana St', 'Butte', 'MT', '59701', 1, true, '2024-07-03', 'matthewludwick123', 1, 200.00, now(), now()),
('Kevin', 'Lydick', 'Individual', 'Premium', 'Moorpark', 'kevin@oakridgelandworks.com', '(805) 630-8377', '3106 Tanglewood Ct.', 'Thousand Oaks', 'CA', '91360', 3, true, '2024-09-01', 'kevinlydick123', 2, 450.00, now(), now()),
('Vincent', 'Malfa', 'Individual', 'Basic', 'Moorpark', 'vgm@tripledistilled.com', '(508) 859-0390', '710 Calle Cardo', 'Thousand Oaks', 'CA', '91360', 1, false, '2023-09-06', 'vincentmalfa123', 1, 150.00, now(), now()),
('Gerald', 'Mansell', 'Individual', 'Premium', 'Moorpark', 'gerrymansell@icloud.com', '(808) 375-7971', '604 N Kalaheo Ave', 'Kailua', 'HI', '96734', 1, true, '2024-12-17', 'geraldmansell123', 1, 200.00, now(), now()),
('Joseph', 'Matta', 'Individual', 'Premium', 'Moorpark', 'joe@hansonlab.com', '(805) 795-1300', '747 Calle Plano', 'Camarillo', 'CA', '93012', 1, true, '2023-12-27', 'josephmatta123', 1, 200.00, now(), now()),
('Greg', 'McNeal', 'Individual', 'Premium', 'Moorpark', 'gregory.mcneal.list@gmail.com', '(512) 413-3869', '29615 Kimberly Drive', 'Agoura Hills', 'CA', '91301', 1, true, '2024-06-01', 'gregmcneal123', 1, 200.00, now(), now()),
('Garrett', 'Pegler', 'Individual', 'Premium', 'Moorpark', 'garret@ghostshieldfilm.com', '(805) 427-5863', '1168 Tourmaline Dr.', 'Newbury Park', 'CA', '91320', 2, true, '2022-12-14', 'garrettpegler123', 1, 300.00, now(), now()),
('Steve', 'Pena', 'Individual', 'Premium', 'Moorpark', 'steve@penaemail.com', '(310) 601-8771', '2928 Shadow Brook Ln', 'Westlake Village', 'CA', '91361', 1, true, '2024-07-23', 'stevepena123', 1, 200.00, now(), now()),
('Tyrone', 'Pham', 'Individual', 'Basic', 'Moorpark', 'ecoliex@yahoo.com', '(626) 600-7023', '701 S Howard Ave. ste 106217', 'Tampa', 'FL', '33606', 1, false, '2022-06-19', 'tyronepham123', 1, 150.00, now(), now()),
('Thomas', 'Powers', 'Individual', 'Basic', 'Moorpark', 'tomepowers@gmail.com', '(805) 915-8120', '365 Jeremiah Drive Unit A', 'Simi Valley', 'CA', '93065', 1, false, '2024-06-01', 'thomaspowers123', 1, 150.00, now(), now()),
('Jeremy', 'Renstrom', 'Individual', 'Basic', 'Moorpark', 'jeremyrenstrom@yahoo.com', '(310) 422-5742', '21736 Roscoe Blvd #34', 'Canoga Park', 'CA', '91304', 1, false, '2024-09-09', 'jeremyrenstrom123', 1, 150.00, now(), now()),
('Josiah', 'Richards', 'Individual', 'Premium', 'Moorpark', 'josiah@illusory.io', '(647) 270-5442', '4500 Park Granada', 'Calabasas', 'CA', '91302', 1, true, '2024-03-08', 'josiahrichards123', 1, 200.00, now(), now()),
('Joey', 'Shap', 'Individual', 'Basic', 'Moorpark', 'joeyshap@gmail.com', '(805) 825-8462', '501 S. Reino Rd. #226', 'Newbury Park', 'CA', '91320', 1, false, '2024-06-01', 'joeyshap123', 1, 150.00, now(), now()),
('Andrew', 'Shore', 'Individual', 'Basic', 'Westlake Village', 'an.shore@yahoo.com', '(310) 890-3799', '1584 Fairmount Rd', 'Westlake Village', 'CA', '91362', 1, false, '2024-11-15', 'andrewshore123', 1, 150.00, now(), now()),
('Victoria', 'Shuken', 'Individual', 'VIP', 'Moorpark', 'tori_shuken@vistaauto.com', '(818) 207-9770', '12626 Andalusia Drive', 'Santa Rosa Valley', 'CA', '93012', 2, true, '2023-07-06', 'victoriashuken123', 1, 400.00, now(), now()),
('Tarnpreet', 'Singh', 'Individual', 'Premium', 'Moorpark', 'asingh2033@gmail.com', '(805) 377-2472', '5170 Edgar St', 'Oxnard', 'CA', '93033', 3, true, '2024-04-11', 'tarnpreetsingh123', 2, 450.00, now(), now()),
('Nico', 'Solomon', 'Individual', 'Premium', 'Moorpark', 'solonico@sbcglobal.net', '(805) 558-8678', '1634 River Wood Court', 'Simi Valley', 'CA', '93063', 1, true, '2024-08-21', 'nicosolomon123', 1, 200.00, now(), now()),
('Donovan', 'Tatum', 'Individual', 'Premium', 'Moorpark', 'donovan.tatum@caa.com', '(818) 648-3062', '637 S. Lucerne Blvd', 'Los Angeles', 'CA', '90005', 1, true, '2024-05-01', 'donovantatum123', 1, 200.00, now(), now()),
('Ryan', 'Telford', 'Individual', 'Premium', 'Moorpark', 'ryan.telford@amwins.com', '(818) 216-1792', '1408 Kingsboro Court', 'Westlake Village', 'CA', '91362', 1, true, '2023-02-01', 'ryantelford123', 1, 200.00, now(), now()),
('Deke', 'Williams', 'Individual', 'VIP', 'Moorpark', 'deke@wilmanco.com', '(805) 432-4459', '32069 Lobo Canyon Rd', 'Agoura Hills', 'CA', '91301', 6, true, '2024-07-26', 'dekewilliams123', 3, 900.00, now(), now()),
('Anthony', 'Virella', 'Individual', 'Enterprise', 'Westlake Village', 'avirella@yahoo.com', '(310) 622-5205', '5959 Murphy Way', 'Malibu', 'CA', '90265', 10, true, '2024-12-01', 'anthonyvirella123', 5, 1500.00, now(), now()),

-- Business Clients
('All Valley Washer Service', 'Inc.', 'Business', 'Basic', 'Moorpark', 'jim@allvalleywasher.com', '(818) 464-5264', '15008 Delano St.', 'Van Nuys', 'CA', '91411', 1, false, '2024-07-01', 'allvalleywasher123', 1, 150.00, now(), now()),
('Barrett', 'Whips', 'Business', 'Enterprise', 'Westlake Village', 'lindsay@barrettassociatesllc.com', '(805) 559-1028', '868 Patriot Drive Unit A', 'Moorpark', 'CA', '93021', 10, true, '2024-01-01', 'barrettwhips123', 5, 1500.00, now(), now()),
('C&H', 'Construction', 'Business', 'Premium', 'Moorpark', 'jeff@candhconstruction.net', '(805) 495-0679', '3315 Grande Vista Drive', 'Newbury Park', 'CA', '91320', 2, true, '2024-05-01', 'candhconstruction123', 1, 300.00, now(), now()),
('DHK', 'Plumbing', 'Business', 'Premium', 'Moorpark', 'Joe@dhkplumbing.com', '(562) 762-6176', '2105 West San Bernardino Road', 'West Covina', 'CA', '91790', 2, true, '2024-12-05', 'dhkplumbing123', 1, 300.00, now(), now()),
('Lotus', 'USA', 'Business', 'Basic', 'Moorpark', 'jane.lonsdale@lotuscars.com', '(805) 233-4987', '11988 Challenger Ct', 'Moorpark', 'CA', '93021', 1, false, '2024-06-18', 'lotususa123', 1, 150.00, now(), now()),
('Marmonte Cars', 'LLC', 'Business', 'Premium', 'Moorpark', 'sergio@migramer.com', '(310) 795-2001', '30130 Mullholland Hwy', 'Agoura', 'CA', '91301', 2, true, '2024-05-07', 'marmontecars123', 1, 300.00, now(), now()),
('Star Management', 'LLC', 'Business', 'Premium', 'Moorpark', 'kenneth.allen75@gmail.com', '(951) 425-8642', '730 E Durant Ave Suite 200', 'Aspen', 'CO', '81611', 3, true, '2024-02-01', 'starmanagement123', 2, 450.00, now(), now()),
('Thaxton & Associates', 'Inc', 'Business', 'Premium', 'Westlake Village', 'mike@thaxtonassociates.com', '(818) 633-9111', '11338 Moorpark St.', 'Studio City', 'CA', '91423', 4, true, '2024-05-21', 'thaxtonassociates123', 2, 600.00, now(), now()),
('The Chosen Group', 'Inc', 'Business', 'Basic', 'Moorpark', 'kacy@100group.com', '(805) 807-0195', '4263 Tierra Rejada Rd #213', 'Moorpark', 'CA', '93021', 1, false, '2024-06-01', 'thechosengroup123', 1, 150.00, now(), now()),
('Velocity Restorations', 'LLC', 'Business', 'Premium', 'Moorpark', 'chris@velocityrestorations.com', '(850) 776-8729', '15 E Quintette Rd', 'Cantonment', 'FL', '32533', 2, true, '2024-04-24', 'velocityrestorations123', 1, 300.00, now(), now());