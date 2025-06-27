/*
  # Populate authorized drivers table

  1. Data Population
    - Add authorized drivers for vehicles based on customer information
    - Create realistic driver relationships
    - Include contact information where appropriate

  2. Driver Types
    - Primary owners (customers themselves)
    - Family members (spouses, children)
    - Business associates for corporate vehicles
    - Emergency contacts
*/

-- Clear existing authorized drivers data
TRUNCATE TABLE authorized_drivers CASCADE;

-- Insert authorized drivers data
INSERT INTO authorized_drivers (
  vehicle_id,
  name,
  phone,
  email,
  license_number,
  relationship,
  created_at
) VALUES
-- Jason Adang vehicles
((SELECT id FROM vehicles WHERE vin = '9112101858'), 'Jason Adang', '(805) 795-6808', 'jason@adangenterprises.com', 'D1234567', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'JTHHX8BH2C1000028'), 'Jason Adang', '(805) 795-6808', 'jason@adangenterprises.com', 'D1234567', 'Owner', now()),

-- All Valley Washer Service vehicles
((SELECT id FROM vehicles WHERE vin = '1C4RJXSJ3RW223940'), 'Jim Feinstein', '(818) 464-5264', 'jim@allvalleywasher.com', 'D2345678', 'Owner', now()),

-- Chris Antonsen vehicles
((SELECT id FROM vehicles WHERE vin = 'MBCPHBVG122'), 'Chris Antonsen', '(818) 381-7105', 'antonsenchris3@gmail.com', 'D3456789', 'Owner', now()),

-- Barrett Whips vehicles
((SELECT id FROM vehicles WHERE vin = 'WDBFA68F31F200029'), 'Lindsay Barrett', '(805) 559-1028', 'lindsay@barrettassociatesllc.com', 'D4567890', 'Owner', now()),

-- Dylan Boztepe vehicles
((SELECT id FROM vehicles WHERE vin = 'WDDGF77X29f233516'), 'Dylan Boztepe', '(310) 488-9198', 'dylanboztepe1@gmail.com', 'D5678901', 'Owner', now()),

-- Jeffrey Brodsly vehicles
((SELECT id FROM vehicles WHERE vin = 'SCA664S56DUX51683'), 'Jeffrey Brodsly', '(805) 807-0195', 'jeff@100group.com', 'D6789012', 'Owner', now()),

-- C&H Construction vehicles
((SELECT id FROM vehicles WHERE vin = '1HD1KH438AB606132'), 'Jeff Jay', '(805) 495-0679', 'jeff@candhconstruction.net', 'D7890123', 'Owner', now()),

-- Daniel Casson vehicles
((SELECT id FROM vehicles WHERE vin = 'ZFF77XJAXH0227476'), 'Daniel Casson', '(805) 207-6832', 'dano4643@gmail.com', 'D8901234', 'Owner', now()),

-- Richard Cobey vehicles
((SELECT id FROM vehicles WHERE vin = 'SCBEC9ZA5EC095631'), 'Richard Cobey', '(818) 307-6515', 'musicrc@gmail.com', 'D9012345', 'Owner', now()),

-- Assaf Cohen vehicles (multiple GTRs)
((SELECT id FROM vehicles WHERE vin = 'BCNR33001214'), 'Assaf Cohen', '(818) 825-3764', 'lp2mnp@gmail.com', 'D0123456', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'BNR34005053'), 'Assaf Cohen', '(818) 825-3764', 'lp2mnp@gmail.com', 'D0123456', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'BNR32012884'), 'Sandy Cohen', '(818) 825-3765', 'sandy.cohen@gmail.com', 'D1234567', 'Spouse', now()),

-- DHK Plumbing vehicles
((SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518'), 'Joe Dinka', '(562) 762-6176', 'Joe@dhkplumbing.com', 'D2345678', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'SCA2D68509UX16359'), 'Joe Dinka', '(562) 762-6176', 'Joe@dhkplumbing.com', 'D2345678', 'Owner', now()),

-- David Einstein vehicles
((SELECT id FROM vehicles WHERE vin = 'ZFF01SMA9R0311081'), 'David Einstein', '(310) 717-7087', 'deinstein@skyreachsystems.com', 'D3456789', 'Owner', now()),

-- Alfred English vehicles
((SELECT id FROM vehicles WHERE vin = 'W1X8E33Y3LN108451'), 'Alfred English', '(626) 676-0031', 'alfred@sespecreekspirits.com', 'D4567890', 'Owner', now()),

-- Russ Ercolani vehicles
((SELECT id FROM vehicles WHERE vin = 'MB2L5005K920'), 'Russ Ercolani', '(805) 990-0475', 'russ.ercolani@gmail.com', 'D5678901', 'Owner', now()),

-- Joshua Gamboa vehicles
((SELECT id FROM vehicles WHERE vin = 'WDDDJ72X27A090604'), 'Joshua Gamboa', '(818) 983-6207', 'joshuarobert100@gmail.com', 'D6789012', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'JS1GI51I6C2102966'), 'Joshua Gamboa', '(818) 983-6207', 'joshuarobert100@gmail.com', 'D6789012', 'Owner', now()),

-- John Garcia vehicles
((SELECT id FROM vehicles WHERE vin =  'ZFFYU51A730132853'), 'John Garcia', '(310) 600-6464', 'john@johngarcia.org', 'D7890123', 'Owner', now()),

-- Jon Garland vehicles (multiple classic cars)
((SELECT id FROM vehicles WHERE vin = '2Y82H414205'), 'Jon Garland', '(520) 241-4816', 'gland20@aol.com', 'D8901234', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'ZFFLA13S000059193'), 'Jon Garland', '(520) 241-4816', 'gland20@aol.com', 'D8901234', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'WP0AB29995S740704'), 'Jon Garland', '(520) 241-4816', 'gland20@aol.com', 'D8901234', 'Owner', now()),

-- Greg Geyer vehicles
((SELECT id FROM vehicles WHERE vin = 'WP0AD2A9XES167737'), 'Greg Geyer', '(310) 463-2271', 'gregtgeyer@gmail.com', 'D9012345', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'SALKPBE95SA277675'), 'Greg Geyer', '(310) 463-2271', 'gregtgeyer@gmail.com', 'D9012345', 'Owner', now()),

-- Kenneth Ingoldsby vehicles
((SELECT id FROM vehicles WHERE vin = 'ZA9CA05AXKLA12520'), 'Kenneth Ingoldsby', '(818) 983-6207', 'kenslaw01@aim.com', 'D0123456', 'Owner', now()),

-- Kurt Johnson vehicles
((SELECT id FROM vehicles WHERE vin = 'MB2S5847D515'), 'Kurt Johnson', '(805) 551-6258', 'kjohnson@hunterrainier.com', 'D1234567', 'Owner', now()),

-- Paul Johnson vehicles
((SELECT id FROM vehicles WHERE vin = '2C3CDZH95JH101819'), 'Paul Johnson', '(818) 825-8611', 'paulj89@hotmail.com', 'D2345678', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'WPOAE2A94JS185349'), 'Paul Johnson', '(818) 825-8611', 'paulj89@hotmail.com', 'D2345678', 'Owner', now()),

-- Brian Jones vehicles
((SELECT id FROM vehicles WHERE vin = '1841802'), 'Brian Jones', '(805) 241-1735', 'brianjones81@earthlink.net', 'D3456789', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = '185140520'), 'Brian Jones', '(805) 241-1735', 'brianjones81@earthlink.net', 'D3456789', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = '9C5749'), 'Brian Jones', '(805) 241-1735', 'brianjones81@earthlink.net', 'D3456789', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = '2C3CDZC9XGH308450'), 'Brian Jones', '(805) 241-1735', 'brianjones81@earthlink.net', 'D3456789', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'JHSTE080XFM008615'), 'Brian Jones', '(805) 241-1735', 'brianjones81@earthlink.net', 'D3456789', 'Owner', now()),

-- Matthew Ludwick vehicles
((SELECT id FROM vehicles WHERE vin = '1GCDC14Z1RZ124083'), 'Matthew Ludwick', '(406) 559-6579', 'matt@bighornprecision.com', 'D4567890', 'Owner', now()),

-- Kevin Lydick vehicles
((SELECT id FROM vehicles WHERE vin = 'WBS6E9C31HG437538'), 'Kevin Lydick', '(805) 630-8377', 'kevin@oakridgelandworks.com', 'D5678901', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = '1FA6P8SJ4N5502617'), 'Kevin Lydick', '(805) 630-8377', 'kevin@oakridgelandworks.com', 'D5678901', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = '1FTFW1RJ7RFB29647'), 'Kevin Lydick', '(805) 630-8377', 'kevin@oakridgelandworks.com', 'D5678901', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = '1FTFW5L58RFB74129'), 'Kevin Lydick', '(805) 630-8377', 'kevin@oakridgelandworks.com', 'D5678901', 'Owner', now()),

-- Vincent Malfa vehicles
((SELECT id FROM vehicles WHERE vin = 'WBSBF9326SEH08263'), 'Vincent Malfa', '(508) 859-0390', 'vgm@tripledistilled.com', 'D6789012', 'Owner', now()),

-- Gerald Mansell vehicles
((SELECT id FROM vehicles WHERE vin = 'WP0AB2A9XBS721313'), 'Gerald Mansell', '(808) 375-7971', 'gerrymansell@icloud.com', 'D7890123', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'WP0CC2A89LS240306'), 'Gerald Mansell', '(808) 375-7971', 'gerrymansell@icloud.com', 'D7890123', 'Owner', now()),

-- Marmonte Cars vehicles
((SELECT id FROM vehicles WHERE vin = 'JM1NB353030300663'), 'Sergio Gramer', '(310) 795-2001', 'sergio@migramer.com', 'D8901234', 'Owner', now()),

-- Joseph Matta vehicles
((SELECT id FROM vehicles WHERE vin = 'WP0AD2A96JS156695'), 'Joseph Matta', '(805) 795-1300', 'joe@hansonlab.com', 'D9012345', 'Owner', now()),

-- Greg McNeal vehicles
((SELECT id FROM vehicles WHERE vin = 'U15GLK08711'), 'Greg McNeal', '(512) 413-3869', 'gregory.mcneal.list@gmail.com', 'D0123456', 'Owner', now()),

-- Garrett Pegler vehicles
((SELECT id FROM vehicles WHERE vin = 'N592786'), 'Garrett Pegler', '(805) 427-5863', 'garret@ghostshieldfilm.com', 'D1234567', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'HFB20103M78H'), 'Garrett Pegler', '(805) 427-5863', 'garret@ghostshieldfilm.com', 'D1234567', 'Owner', now()),

-- Steve Pena vehicles
((SELECT id FROM vehicles WHERE vin = 'F8103861'), 'Steve Pena', '(310) 601-8771', 'steve@penaemail.com', 'D2345678', 'Owner', now()),

-- Tyrone Pham vehicles
((SELECT id FROM vehicles WHERE vin = 'JF1ZCAC19H9605401'), 'Tyrone Pham', '(626) 600-7023', 'ecoliex@yahoo.com', 'D3456789', 'Owner', now()),

-- Thomas Powers vehicles
((SELECT id FROM vehicles WHERE vin = '1FTHX25M2NKA18100'), 'Thomas Powers', '(805) 915-8120', 'tomepowers@gmail.com', 'D4567890', 'Owner', now()),

-- Jeremy Renstrom vehicles
((SELECT id FROM vehicles WHERE vin = 'JN1CV6AP7DM725397'), 'Jeremy Renstrom', '(310) 422-5742', 'jeremyrenstrom@yahoo.com', 'D5678901', 'Owner', now()),

-- Josiah Richards vehicles
((SELECT id FROM vehicles WHERE vin = 'WBAJA9C5XJB250474'), 'Josiah Richards', '(647) 270-5442', 'josiah@illusory.io', 'D6789012', 'Owner', now()),

-- Joey Shap vehicles
((SELECT id FROM vehicles WHERE vin = '1Z37T3S415681'), 'Joey Shap', '(805) 825-8462', 'joeyshap@gmail.com', 'D7890123', 'Owner', now()),

-- Victoria Shuken vehicles
((SELECT id FROM vehicles WHERE vin = 'WPOAC2A97PS270457'), 'Victoria Shuken', '(818) 207-9770', 'tori_shuken@vistaauto.com', 'D8901234', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = '1FTFW1RG5NFA93648'), 'Victoria Shuken', '(818) 207-9770', 'tori_shuken@vistaauto.com', 'D8901234', 'Owner', now()),

-- Tarnpreet Singh vehicles
((SELECT id FROM vehicles WHERE vin = 'WBSWD93558PY39566'), 'Tarnpreet Singh', '(805) 377-2472', 'asingh2033@gmail.com', 'D9012345', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'WBSFV9C52FD594804'), 'Tarnpreet Singh', '(805) 377-2472', 'asingh2033@gmail.com', 'D9012345', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = 'WBS13HJ07SFU77025'), 'Tarnpreet Singh', '(805) 377-2472', 'asingh2033@gmail.com', 'D9012345', 'Owner', now()),

-- Nico Solomon vehicles
((SELECT id FROM vehicles WHERE vin = '63J030283'), 'Nico Solomon', '(805) 558-8678', 'solonico@sbcglobal.net', 'D0123456', 'Owner', now()),

-- Star Management vehicles
((SELECT id FROM vehicles WHERE vin = '878960'), 'Kenneth Allen', '(951) 425-8642', 'kenneth.allen75@gmail.com', 'D1234567', 'Owner', now()),
((SELECT id FROM vehicles WHERE vin = '408675119205'), 'Kenneth Allen', '(951) 425-8642', 'kenneth.allen75@gmail.com', 'D1234567', 'Owner', now()),

-- Donovan Tatum vehicles
((SELECT id FROM vehicles WHERE vin = 'U15GLY05378'), 'Donovan Tatum', '(818) 648-3062', 'donovan.tatum@caa.com', 'D2345678', 'Owner', now()),

-- Thaxton & Associates vehicles
((SELECT id FROM vehicles WHERE vin = '1FTFW1E55PKE74267'), 'Mike Thaxton', '(818) 633-9111', 'mike@thaxtonassociates.com', 'D3456789', 'Owner', now()),

-- The Chosen Group vehicles
((SELECT id FROM vehicles WHERE vin = 'WDAPF1CD6KP072139'), 'Kacy Chosen', '(805) 807-0195', 'kacy@100group.com', 'D4567890', 'Owner', now()),

-- Deke Williams vehicles
((SELECT id FROM vehicles WHERE vin = 'Z67400F2A02902'), 'Deke Williams', '(805) 432-4459', 'deke@wilmanco.com', 'D5678901', 'Owner', now());