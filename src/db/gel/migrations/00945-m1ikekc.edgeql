CREATE MIGRATION m1ikekcteyjqi25zagjkhpbruca74of53hqgi44xj32fm6f23igukq
    ONTO m1jiqo7roozqxvmkxhtaeup4mnds3syu7w4rodmezuqirdpid7jj6a
{
  ALTER TYPE sys_core::SysMsg {
      ALTER PROPERTY createdAt {
          SET OWNED;
      };
      DROP PROPERTY date;
      DROP PROPERTY msg;
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::ObjRoot LAST;
      ALTER PROPERTY createdAt {
          SET default := (std::datetime_of_transaction());
          SET readonly := true;
          RESET CARDINALITY;
          SET REQUIRED;
          SET TYPE std::datetime;
      };
  };
};
