CREATE MIGRATION m1kngvbfs7ijc4bfh6h6czde5engcke225gr4ocvz23zhbxejdylha
    ONTO m1kwnyqzayedxtga4otl6xa6hllvgjzti7peellduhtkigg5xydfra
{
  ALTER TYPE sys_core::SysDataObjColumn {
      ALTER LINK fieldListConfig {
          RESET ON SOURCE DELETE;
      };
      ALTER LINK fieldListSelect {
          RESET ON SOURCE DELETE;
      };
  };
};
