CREATE MIGRATION m14ns4gfvqkswnbh5qt4beb6j5b4g5mg3h6hvnnyzlzqiunlvsrvja
    ONTO m1drplcx34fiwk23pjylwqvm4it7lydcsckgiwidziw5bslpc5x63q
{
  ALTER TYPE sys_core::SysDataObjColumnItemChange {
      CREATE PROPERTY valueTarget: std::str;
      CREATE PROPERTY valueTrigger: std::str;
  };
};
