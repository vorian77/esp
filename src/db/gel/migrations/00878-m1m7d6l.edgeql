CREATE MIGRATION m1m7d6lu7f5tc5nqzw7vbhqccvr4v4aa5glnuepeh5tig5xpvfgepa
    ONTO m1dwaxae7tssntnoqh2cyg2uiojhcelzatcr53xr2vsoznwl5bay3q
{
  CREATE TYPE default::SysEmailList {
      CREATE REQUIRED PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_of_transaction());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY email: std::str;
  };
};
