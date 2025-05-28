CREATE MIGRATION m1q7ilgj2fqid2rvd5bnl7jtqndjlgknkgwe2xn7kfiab65awuy6sq
    ONTO m1abvhlrno77gbca6xe5g43x5sh43qkprfemkaroxfz2auzrpax2uq
{
  ALTER TYPE sys_core::SysObjDb {
      ALTER PROPERTY listEditPresetExpr {
          RENAME TO listPresetExpr;
      };
  };
};
