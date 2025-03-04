CREATE MIGRATION m1m6tkjwubb6mkq4yjfgxdpgqdrdfvf4rx3q3sddgat3wkvnzw4guq
    ONTO m1i4giehpwbbze5z45gulq3txjwgg2bbgcjmb5avgdjqqrnodaqzba
{
              ALTER TYPE sys_core::SysDataObj {
      DROP PROPERTY isAlwaysRetrieveData;
  };
  ALTER TYPE sys_core::SysNodeObj {
      CREATE REQUIRED PROPERTY isAlwaysRetrieveData: std::bool {
          SET REQUIRED USING (<std::bool>{false});
      };
  };
};
