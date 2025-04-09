CREATE MIGRATION m164inbbkpstzcuxwfmvnht7cdvxruperoz6cov2klbnwq3omzsdnq
    ONTO m1mg77c4z7h6q63jnliaqygkpmaqdissaucvuarf3dzraqtvlo3mla
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      ALTER LINK valueTargetAttribute {
          SET TYPE sys_core::SysAttrObj USING (.valueTargetAttribute[IS sys_core::SysAttrObj]);
      };
      ALTER LINK valueTriggerAttributes {
          SET TYPE sys_core::SysAttrObj USING (.valueTriggerAttributes[IS sys_core::SysAttrObj]);
      };
  };
};
