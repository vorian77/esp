CREATE MIGRATION m1txkzyydvniz4m6b4n6oingyr326htqmkeq56re5fy6zocienn6tq
    ONTO m1pwd5pqz5rnfakc76lfswtvizyowpyupwmpcxdd54k5htrqkp3fra
{
  ALTER TYPE sys_core::SysAttrObj {
      ALTER LINK codeObjType {
          DROP OWNED;
      };
  };
  ALTER TYPE sys_core::ObjRootCore {
      DROP LINK codeObjType;
  };
  ALTER TYPE sys_core::SysObjEnt {
      ALTER LINK codeEntType {
          SET REQUIRED USING (<sys_core::SysCode>{});
      };
  };
};
