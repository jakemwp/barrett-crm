/*
  # Populate authorized contacts table

  1. Data Population
    - Add authorized contacts for vehicles
    - Create emergency contacts and service contacts
    - Set appropriate permissions for pickup and dropoff

  2. Contact Types
    - Family members who can pick up/drop off vehicles
    - Service contacts for maintenance coordination
    - Emergency contacts
*/

-- Clear existing authorized contacts data
TRUNCATE TABLE authorized_contacts CASCADE;

-- Insert authorized contacts data
INSERT INTO authorized_contacts (
  vehicle_id,
  name,
  phone,
  email,
  relationship,
  can_dropoff,
  can_pickup,
  created_at
) VALUES
-- Jason Adang vehicles - spouse
((SELECT id FROM vehicles WHERE vin = '9112101858'), 'Sarah Adang', '(805) 795-6809', 'sarah.adang@gmail.com', 'Spouse', true, true, now()),
((SELECT id FROM vehicles WHERE vin = 'JTHHX8BH2C1000028'), 'Sarah Adang', '(805) 795-6809', 'sarah.adang@gmail.com', 'Spouse', true, true, now()),

-- All Valley Washer Service - employee
((SELECT id FROM vehicles WHERE vin = '1C4RJXSJ3RW223940'), 'Mark Johnson', '(818) 464-5265', 'mark@allvalleywasher.com', 'Employee', true, true, now()),

-- Chris Antonsen - friend
((SELECT id FROM vehicles WHERE vin = 'MBCPHBVG122'), 'Michael Roberts', '(818) 381-7106', 'michael.roberts@gmail.com', 'Friend', true, false, now()),

-- Barrett Whips - employee
((SELECT id FROM vehicles WHERE vin = 'WDBFA68F31F200029'), 'Kevin Barrett', '(805) 559-1029', 'kevin@barrettbuilding.com', 'Owner', true, true, now()),

-- Jeffrey Brodsly - assistant
((SELECT id FROM vehicles WHERE vin = 'SCA664S56DUX51683'), 'Amanda Chen', '(805) 807-0196', 'amanda@100group.com', 'Assistant', true, true, now()),

-- Assaf Cohen vehicles - friend
((SELECT id FROM vehicles WHERE vin = 'BCNR33001214'), 'David Miller', '(818) 825-3765', 'david.miller@gmail.com', 'Friend', true, false, now()),
((SELECT id FROM vehicles WHERE vin = 'BNR34005053'), 'David Miller', '(818) 825-3765', 'david.miller@gmail.com', 'Friend', true, false, now()),
((SELECT id FROM vehicles WHERE vin = 'BNR32012884'), 'David Miller', '(818) 825-3765', 'david.miller@gmail.com', 'Friend', true, false, now()),

-- DHK Plumbing vehicles - employee
((SELECT id FROM vehicles WHERE vin = 'ZHWBU47S57LA02518'), 'Carlos Rodriguez', '(562) 762-6177', 'carlos@dhkplumbing.com', 'Employee', true, true, now()),
((SELECT id FROM vehicles WHERE vin = 'SCA2D68509UX16359'), 'Carlos Rodriguez', '(562) 762-6177', 'carlos@dhkplumbing.com', 'Employee', true, true, now()),

-- David Einstein vehicles - spouse
((SELECT id FROM vehicles WHERE vin = 'ZFF01SMA9R0311081'), 'Lisa Einstein', '(310) 717-7088', 'lisa.einstein@gmail.com', 'Spouse', true, true, now()),

-- Alfred English vehicles - emergency contact
((SELECT id FROM vehicles WHERE vin = 'W1X8E33Y3LN108451'), 'James English', '(626) 676-0032', 'james.english@gmail.com', 'Brother', false, true, now()),

-- Russ Ercolani vehicles - spouse
((SELECT id FROM vehicles WHERE vin = 'MB2L5005K920'), 'Jennifer Ercolani', '(805) 990-0476', 'jennifer.ercolani@gmail.com', 'Spouse', true, true, now()),

-- Jon Garland vehicles - assistant
((SELECT id FROM vehicles WHERE vin = '2Y82H414205'), 'Patricia Wilson', '(520) 241-4817', 'patricia@garlandcars.com', 'Assistant', true, true, now()),
((SELECT id FROM vehicles WHERE vin = 'ZFFLA13S000059193'), 'Patricia Wilson', '(520) 241-4817', 'patricia@garlandcars.com', 'Assistant', true, true, now()),
((SELECT id FROM vehicles WHERE vin = 'WP0AB29995S740704'), 'Patricia Wilson', '(520) 241-4817', 'patricia@garlandcars.com', 'Assistant', true, true, now()),

-- Greg Geyer vehicles - spouse
((SELECT id FROM vehicles WHERE vin = 'WP0AD2A9XES167737'), 'Michelle Geyer', '(310) 463-2272', 'michelle.geyer@gmail.com', 'Spouse', true, true, now()),
((SELECT id FROM vehicles WHERE vin = 'SALKPBE95SA277675'), 'Michelle Geyer', '(310) 463-2272', 'michelle.geyer@gmail.com', 'Spouse', true, true, now()),

-- Paul Johnson vehicles - spouse
((SELECT id FROM vehicles WHERE vin = '2C3CDZH95JH101819'), 'Karen Johnson', '(818) 825-8612', 'karen.johnson@gmail.com', 'Spouse', true, true, now()),
((SELECT id FROM vehicles WHERE vin = 'WPOAE2A94JS185349'), 'Karen Johnson', '(818) 825-8612', 'karen.johnson@gmail.com', 'Spouse', true, true, now()),

-- Brian Jones vehicles - assistant
((SELECT id FROM vehicles WHERE vin = '1841802'), 'Robert Taylor', '(805) 241-1736', 'robert@jonescars.com', 'Assistant', true, true, now()),
((SELECT id FROM vehicles WHERE vin = '185140520'), 'Robert Taylor', '(805) 241-1736', 'robert@jonescars.com', 'Assistant', true, true, now()),
((SELECT id FROM vehicles WHERE vin = '9C5749'), 'Robert Taylor', '(805) 241-1736', 'robert@jonescars.com', 'Assistant', true, true, now()),
((SELECT id FROM vehicles WHERE vin = '2C3CDZC9XGH308450'), 'Robert Taylor', '(805) 241-1736', 'robert@jonescars.com', 'Assistant', true, true, now()),

-- Kevin Lydick vehicles - spouse
((SELECT id FROM vehicles WHERE vin = 'WBS6E9C31HG437538'), 'Laura Lydick', '(805) 630-8378', 'laura.lydick@gmail.com', 'Spouse', true, true, now()),
((SELECT id FROM vehicles WHERE vin = '1FA6P8SJ4N5502617'), 'Laura Lydick', '(805) 630-8378', 'laura.lydick@gmail.com', 'Spouse', true, true, now()),
((SELECT id FROM vehicles WHERE vin = '1FTFW1RJ7RFB29647'), 'Laura Lydick', '(805) 630-8378', 'laura.lydick@gmail.com', 'Spouse', true, true, now()),
((SELECT id FROM vehicles WHERE vin = '1FTFW5L58RFB74129'), 'Laura Lydick', '(805) 630-8378', 'laura.lydick@gmail.com', 'Spouse', true, true, now()),

-- Victoria Shuken vehicles - assistant
((SELECT id FROM vehicles WHERE vin = 'WPOAC2A97PS270457'), 'Michael Shuken', '(818) 207-9771', 'michael.shuken@gmail.com', 'Spouse', true, true, now()),
((SELECT id FROM vehicles WHERE vin = '1FTFW1RG5NFA93648'), 'Michael Shuken', '(818) 207-9771', 'michael.shuken@gmail.com', 'Spouse', true, true, now()),

-- Tarnpreet Singh vehicles - friend
((SELECT id FROM vehicles WHERE vin = 'WBSWD93558PY39566'), 'Raj Singh', '(805) 377-2473', 'raj.singh@gmail.com', 'Brother', true, true, now()),
((SELECT id FROM vehicles WHERE vin = 'WBSFV9C52FD594804'), 'Raj Singh', '(805) 377-2473', 'raj.singh@gmail.com', 'Brother', true, true, now()),
((SELECT id FROM vehicles WHERE vin = 'WBS13HJ07SFU77025'), 'Raj Singh', '(805) 377-2473', 'raj.singh@gmail.com', 'Brother', true, true, now()),

-- Star Management vehicles - employee
((SELECT id FROM vehicles WHERE vin = '878960'), 'Sarah Johnson', '(951) 425-8643', 'sarah@starmanagement.com', 'Employee', true, true, now()),
((SELECT id FROM vehicles WHERE vin = '408675119205'), 'Sarah Johnson', '(951) 425-8643', 'sarah@starmanagement.com', 'Employee', true, true, now()),

-- Thaxton & Associates vehicles - employee
((SELECT id FROM vehicles WHERE vin = '1FTFW1E55PKE74267'), 'John Davis', '(818) 633-9112', 'john@thaxtonassociates.com', 'Employee', true, true, now()),

-- The Chosen Group vehicles - employee
((SELECT id FROM vehicles WHERE vin = 'WDAPF1CD6KP072139'), 'Jeff Brodsly', '(805) 807-0195', 'jeff@100group.com', 'CEO', true, true, now()),

-- Deke Williams vehicles - assistant
((SELECT id FROM vehicles WHERE vin = 'Z67400F2A02902'), 'Maria Lopez', '(805) 432-4460', 'maria@wilmanco.com', 'Assistant', true, true, now());