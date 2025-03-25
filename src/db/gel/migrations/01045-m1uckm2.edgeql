CREATE MIGRATION m1uckm25vejbvw7iptmk5cpjttyflmegobsjxwmwxjyuane7ovptpq
    ONTO m1gl42urxz2wze374jwqhos5dnbug5s2jhvmeufwbbs7qkjdkpgpha
{
  DROP FUNCTION sys_core::getObjEntAttr(ownerName: std::str, name: std::str);
  CREATE TYPE sys_core::SysAttr EXTENDING sys_core::SysObjEnt;
  CREATE FUNCTION sys_core::getObjEntAttr(ownerName: std::str, name: std::str) -> OPTIONAL sys_core::SysAttr USING (SELECT
      std::assert_single((SELECT
          sys_core::SysAttr
      FILTER
          ((.owner.name = ownerName) AND (.name = name))
      ))
  );
  ALTER TYPE app_cm::CmClientServiceFlow {
      DROP LINK objAttrSfSite;
  };
  ALTER TYPE sys_core::SysAttrAccess {
      DROP LINK obj;
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      DROP LINK valueTargetAttribute;
      DROP LINK valueTriggerAttributes;
  };
  DROP TYPE sys_core::SysObjEntAttr;
};
