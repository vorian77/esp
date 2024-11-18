CREATE MIGRATION m1qmv6n4cgmuwgzlzfk57vyjifj644etjhdjgrzhktzdcrhlbi2b7a
    ONTO m1lam5ogkxv5vaald2a337lkhq35k5ifjp64jwfpvu5oellvzi3gka
{
  ALTER TYPE sys_user::SysUserPref {
      ALTER PROPERTY data {
          SET TYPE std::str USING (<std::str>.data);
      };
  };
};
