CREATE MIGRATION m1gvw3wzvjvc2jxefw5y35u7dkabry7kc4c5szoqualrg6ijogmr3q
    ONTO m1lfhthi5txoqebn2ozwsjoux75md6nslmxzgjk4vdu7ez7mc2soaa
{
  ALTER TYPE app_cm::CmPartner {
      CREATE LINK owner: sys_core::ObjRoot {
          SET REQUIRED USING (<sys_core::ObjRoot>{});
      };
  };
  ALTER TYPE app_cm::CmPartner {
      DROP EXTENDING sys_core::SysOrg;
      EXTENDING sys_core::SysObj LAST;
      ALTER LINK owner {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
};
