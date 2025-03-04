CREATE MIGRATION m12f37ecofcw3i52k4zejywgp27gqjybc6gshcsxr25ivtyie7vnfa
    ONTO m1as5uezjcfuyi3krk3epupu7brrearlxpd3kgxuh7kapgu4rmgskq
{
          ALTER TYPE sys_rep::SysRepParm {
      CREATE LINK fieldListItems: sys_core::SysDataObjFieldListItems;
      CREATE PROPERTY exprFilter: std::str;
      CREATE PROPERTY fieldListItemsParmName: std::str;
      CREATE REQUIRED PROPERTY isRequired: std::bool {
          SET REQUIRED USING (<std::bool>{});
      };
  };
};
