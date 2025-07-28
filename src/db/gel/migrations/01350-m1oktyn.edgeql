CREATE MIGRATION m1oktynadrjhxqoosy3tjqzw42qldd65tl2iubpcp5ag72orjavvta
    ONTO m1em3a676443y3zpt2fejaywssw6drtnc7ghzjlgnixccclq6bcr2a
{
  CREATE FUNCTION sys_core::getObjAttr(ownerName: std::str, name: std::str) -> OPTIONAL sys_core::SysObjAttr USING (SELECT
      std::assert_single((SELECT
          sys_core::SysObjAttr
      FILTER
          ((.ownerSys.name = ownerName) AND (.name = name))
      ))
  );
  ALTER TYPE app_cm::CmClientServiceFlow {
      ALTER LINK objAttrCmProgram {
          SET REQUIRED USING (<sys_core::SysObjAttr>{});
      };
      DROP LINK programCm;
  };
};
