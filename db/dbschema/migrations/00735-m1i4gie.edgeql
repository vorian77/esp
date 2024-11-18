CREATE MIGRATION m1i4giehpwbbze5z45gulq3txjwgg2bbgcjmb5avgdjqqrnodaqzba
    ONTO m1bf4wcr2dq4fbvmonmckk6oxparqy4lgrnjui4m3kyvctiehe3kfq
{
  ALTER TYPE sys_core::SysDataObj {
      CREATE REQUIRED PROPERTY isAlwaysRetrieveData: std::bool {
          SET REQUIRED USING (<std::bool>{false});
      };
  };
};
