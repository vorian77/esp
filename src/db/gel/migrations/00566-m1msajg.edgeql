CREATE MIGRATION m1msajgyshrqwxe4uq7l4225c3sdfcqxzllmorc2avzietvsnbukga
    ONTO m1pyj7jwty3g2cjhbvfnxcbj7lvt7y2tvhj26k7qsmth5amblqqcta
{
              ALTER TYPE sys_user::SysUserPref {
      ALTER PROPERTY data {
          SET TYPE std::json USING (<std::json>.data);
      };
  };
};
