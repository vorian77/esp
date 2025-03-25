CREATE MIGRATION m1hqbsj2iwxii537txebvzsb2c3mfus6z4p37wmgqg3lkgrk5rm4za
    ONTO m1uckm25vejbvw7iptmk5cpjttyflmegobsjxwmwxjyuane7ovptpq
{
  ALTER TYPE app_cm::CmClientServiceFlow {
      CREATE LINK objAttrSfSite: sys_core::SysAttr;
  };
  ALTER TYPE sys_core::SysAttrAccess {
      CREATE REQUIRED LINK obj: sys_core::SysAttr {
          ON TARGET DELETE DELETE SOURCE;
          SET REQUIRED USING (<sys_core::SysAttr>{});
      };
  };
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE LINK valueTargetAttribute: sys_core::SysAttr;
      CREATE MULTI LINK valueTriggerAttributes: sys_core::SysAttr;
  };
};
