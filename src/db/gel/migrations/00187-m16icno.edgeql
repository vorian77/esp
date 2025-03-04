CREATE MIGRATION m16icnop6tpg6ten3d46ayfz4wae53mvy3im7hkjuvvynqcmiwwxpa
    ONTO m1uoex44vl2zkqybmqtmierclfuyblblegwsochanriyxznifophnq
{
                              ALTER TYPE sys_core::SysDataObjAction {
      DROP LINK codeRenderShowSaveMode;
      DROP PROPERTY isRenderDisableOnInvalidToSave;
      DROP PROPERTY isRenderShowRequiresObjHasChanged;
  };
};
