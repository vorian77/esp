CREATE MIGRATION m1uxsdh22hvbjnab22wnoofomu5lodw2wa2hrb2l7fvblc7oheowoa
    ONTO m16hbqwlkywr2ywuxr5lty6ndnvzlziobsqcejivkzquh3nutajx5a
{
  ALTER TYPE sys_core::SysDataObjActionField {
      DROP CONSTRAINT std::exclusive ON (.name);
      DROP LINK actionFieldConfirms;
      DROP LINK actionFieldShows;
      DROP LINK codeAction;
      DROP LINK codeActionFieldTriggerEnable;
      DROP LINK codeColor;
      DROP PROPERTY isListRowAction;
  };
  ALTER TYPE sys_core::SysDataObjActionFieldGroupItem {
      DROP LINK action;
      DROP PROPERTY orderDefine;
  };
  DROP TYPE sys_core::SysDataObjActionField;
  DROP TYPE sys_core::SysDataObjActionFieldConfirm;
  DROP TYPE sys_core::SysDataObjActionFieldGroup;
  DROP TYPE sys_core::SysDataObjActionFieldGroupItem;
  DROP TYPE sys_core::SysDataObjActionFieldShow;
};
