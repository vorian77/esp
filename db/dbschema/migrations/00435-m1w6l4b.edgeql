CREATE MIGRATION m1w6l4bczphqjymokm4rdr4kbppozhthbfspbmbfe3ajrh3i5k3y5a
    ONTO m1aqbjkatsltkipuws5je7hi2rz7yj2sldt3r2fq4kuypf7hgb63hq
{
  ALTER TYPE sys_core::SysDataObjActionFieldGroupItem {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnItem {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnLink {
      ALTER PROPERTY orderDesign {
          RENAME TO orderDefine;
      };
  };
};
