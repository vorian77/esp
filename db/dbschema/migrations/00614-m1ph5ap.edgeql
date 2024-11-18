CREATE MIGRATION m1ph5apkci5cpo3ik3mspayd6jq4ljq3vkveqjlffgosbw6rrjdt7a
    ONTO m1pz4djqgnswp6ikaxe62xgp2iguh4gmmt5rsoeaugp5qszm66xbza
{
  ALTER TYPE sys_core::SysCode {
      DROP EXTENDING sys_core::SysObj;
      EXTENDING sys_core::ObjRoot LAST;
  };
};
